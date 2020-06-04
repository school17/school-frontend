import { Dispatch } from 'redux';
import axios from 'axios';
import {SEARCH_STUDENTS_URL, CREATE_STUDENT_URL, UPDATE_STUDENT_URL} from './url';
import { trackPromise } from 'react-promise-tracker';

export enum studentActions  {
  SEARCH_STUDENTS = 'SEACH_STUDENTS',
  CREATE_STUDENT = 'CREATE_STUDENT',
  UPDATE_STUDENT = "UPDATE_STUDENT"
}

const token: any  = localStorage.getItem("token");

export const searchStudents = (institutionId: any, searchQuery:any, filterValues?:any) => {
  
  return async (dispatch:Dispatch) => {
  
    try {
      const url = `${SEARCH_STUDENTS_URL.replace("institutionId", institutionId)}?pageNumber=${searchQuery.pageNumber}&?pageSize=${searchQuery.pageSize}`;
      let student = filterValues ? filterValues : {};
      const TOKEN: any  = localStorage.getItem("token");
      const response = await trackPromise(axios.post(url, student, {
        'headers': {
          'Authorization': TOKEN,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      }));
      return dispatch({type: studentActions.SEARCH_STUDENTS, payload: response.data})
    }catch(e){

    }
  }
}

export const saveStudent = (institutionId: any,  student: any, id?: any, imageFile?: any) => {

  return async (dispatch: Dispatch) => {
    try {
      if(id) {
        const url = `${UPDATE_STUDENT_URL.replace("institutionId", institutionId).replace("studentId", student.id)}`;
        const TOKEN: any  = localStorage.getItem("token");
        const postData = transformStudentData(student,institutionId, id);
        const response = await trackPromise(axios.put(url, postData, {
          'headers': {
            'Authorization': TOKEN,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
          }
        }));
        return dispatch({type: studentActions.UPDATE_STUDENT, payload: response.data})

      }else {
      const url = `${CREATE_STUDENT_URL.replace("institutionId", institutionId)}`;
      const TOKEN: any  = localStorage.getItem("token");
      const postData = transformStudentData(student,institutionId, id);
      const response = await axios.post(url, postData, {
        'headers': {
          'Authorization': TOKEN,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      });
      return dispatch({type: studentActions.CREATE_STUDENT, payload: response.data})
      }
    }catch(e) {

    }
  }

}


const transformStudentData = (student:any, institutionId:any, id? :any) => {
  student.institutionId = institutionId;
    if(id){
      student.id  = id;
      student.gender = "male"
      delete student.new
    }
   
    student.address = {
      'address1': student.address1,
      'address2': student.address2,
      'street': student.street,
      'state': student.state,
      'area': student.area,
      'city': student.city,
      'pincode': student.pincode,
    }

    return student;
} 