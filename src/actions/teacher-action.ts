import { Dispatch } from 'redux';
import axios from 'axios';
import { SAVE_TEACHER_URL, HEADERS, 
  UPDATE_TEACHER_URL, SEARCH_TEACHER_URL, DELETE_TEACHER_URL } from './url';

import cogoToast from 'cogo-toast';


export enum teachersAction {
  GET_TEACHER  = 'GET_TEACHERS',
  SAVE_TEACHER = 'SAVE_TEACHER',
  GET_AVAILABLE_TEACHERS = 'GET_AVAILABLE_TEACHERS',
  DELETE_TEACHER = "DELETE_TEACHER",
  UPDATE_TEACHER = "UPDATE_TEACHER"
}


const token: any  = localStorage.getItem("token");

export const fetchTeacher = (institutionId: any, searchQuery:any, filterValues?:any) => {
  if(filterValues){
    if(filterValues.subjects && filterValues.subjects.length <1)
      delete filterValues.subjects
    if(filterValues.grades && filterValues.grades.length < 1)
      delete filterValues.grades
  }
  
  
  return async (dispatch:Dispatch) => {
  
    try {
      const url = `${SEARCH_TEACHER_URL.replace("institutionId", institutionId)}?pageNumber=${searchQuery.pageNumber}&?pageSize=${searchQuery.pageSize}`;
      let teacher = filterValues ? filterValues : {};
      const TOKEN: any  = localStorage.getItem("token");
      const response = await axios.post(url, teacher, {
        'headers': {
          'Authorization': TOKEN,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      })
      //cogoToast.success("Teachers fetched successfully", {position: 'top-right'})
      return dispatch({type: teachersAction.GET_TEACHER, payload: response.data})
    }catch(e){

    }
  }
}

export const saveTeacherAction = (institutionId: any, teacher: any, id?: any, imageFile?: any, savedTeacher?:any) => {
  return async (dispatch: Dispatch) => {
    /*if(imageFile) {
      teacher.imageFile = imageFile;
    }*/
    const postData = transformTeacherData(teacher,institutionId, id, savedTeacher);
    try {
      if(id) {
        const url: any = UPDATE_TEACHER_URL.replace('institutionId', institutionId).replace("teacherId",id);
        const TOKEN: any  = localStorage.getItem("token");
        const response = await axios.put(url, postData, {
          'headers': {
            'Authorization': TOKEN,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
          }
        });
        return dispatch({type: teachersAction.UPDATE_TEACHER, payload: response.data})
      }else {
        const url: any = SAVE_TEACHER_URL.replace('institutionId', institutionId);
        const TOKEN: any  = localStorage.getItem("token");
        const response = await axios.post(url, postData, {
          'headers': {
            'Authorization': TOKEN,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
          }
      });
      return dispatch({type: teachersAction.SAVE_TEACHER, payload: response.data})
      }
    }catch(e) {

    }
  }
}

export const deleteTeacher = (institutionId: any, id:any) => {
  return async(dispatch: Dispatch) => {
    try{
      const url: any = DELETE_TEACHER_URL.replace('institutionId', institutionId).replace("teacherId",id);
    const TOKEN: any  = localStorage.getItem("token");
    const response = await axios.delete(url, {
      'headers': {
        'Authorization': TOKEN,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    });
    return dispatch({type: teachersAction.DELETE_TEACHER, payload: id})
    }catch(e){

    }
  }
}


const transformTeacherData = (teacher:any, institutionId:any, id? :any, savedTeacher?:any) => {
  teacher.institutionId = institutionId;
    if(id){
      teacher.id  = id;
      teacher.grade = savedTeacher.grade;
      if(savedTeacher.createdAt) {
        teacher.createdAt = savedTeacher.createdAt ? savedTeacher.createdAt : "";
        teacher.timeTable = savedTeacher.timeTable ? savedTeacher.timeTable : "";
      }
    }
    if(typeof(teacher.division) !== "object"){
      teacher.division = [teacher.division];
    }
    teacher.address = {
      'address1': teacher.address1,
      'address2': teacher.address2,
      'street': teacher.street,
      'state': teacher.state,
      'area': teacher.area,
      'city': teacher.city,
      'pincode': teacher.pincode,
    }

    return teacher;
} 