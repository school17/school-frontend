
import { GET_AVAILABLE_TEACHERS, SAVE_GRADE_URL, UPDATE_GRADE_URL, SEARCH_GRADES_URL, GET_TEACHER_BY_GRADE } from './url';
import { Dispatch } from 'redux';
import axios from 'axios';

export enum classActions  {
  GET_NON_CLASS_TEACHERS = 'GET_NON_CLASS_TEACHERS',
  SAVE_GRADE = 'SAVE_GRADE',
  GET_GRADES  = 'GET_GRADES',
  GET_TEACHER_INFO = "GET_TEACHER_INFO"
}


const token: any  = localStorage.getItem("token");
export const getNonClassTeachersList = (institutionId: any) => {

  return async (dispatch: Dispatch) => {
    const url: any = GET_AVAILABLE_TEACHERS.replace("institutionId", institutionId);
    const TOKEN: any  = localStorage.getItem("token");
    const response = await axios.get(url, {
      'headers': {
        'Authorization': TOKEN,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    });

    return dispatch({type: classActions.GET_NON_CLASS_TEACHERS, payload: response.data})
  }

}

export const fetchGrades = (institutionId: any, searchQuery:any, filterValues?:any) => {
  if(filterValues){
    if(filterValues.subjects && filterValues.subjects.length <1)
      delete filterValues.subjects
    if(filterValues.grades && filterValues.grades.length < 1)
      delete filterValues.grades
  }
  
  return async (dispatch:Dispatch) => {
  
    try {
      const url = `${SEARCH_GRADES_URL.replace("institutionId", institutionId)}?pageNumber=${searchQuery.pageNumber}&?pageSize=${searchQuery.pageSize}`;
      let grade = filterValues ? filterValues : {};
      const TOKEN: any  = localStorage.getItem("token");
      const response = await axios.post(url, grade, {
        'headers': {
          'Authorization': TOKEN,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      })
      return dispatch({type: classActions.GET_GRADES, payload: response.data})
    }catch(e){

    }
  }
}


export const saveClassAction = (institutionId: any, grade: any, id?: any, prevTeacherId?:any) => {
  return async (dispatch: Dispatch) => {
    try {
      if(id) {
        const url: any = UPDATE_GRADE_URL.replace('institutionId', institutionId).replace("gradeId",id);
        const TOKEN: any  = localStorage.getItem("token");
        grade['teacherId'] = grade.teacher.id;
        grade['teacher'] = grade.teacher.name;
        grade['institutionId'] = institutionId;
        grade['updateTeacher'] = true;
        grade['previousTeacherId'] = prevTeacherId;
        const response = await axios.put(url, grade, {
          'headers': {
            'Authorization': TOKEN,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
          }
        });
      }else {
        const url: any = SAVE_GRADE_URL.replace('institutionId', institutionId);
        const TOKEN: any  = localStorage.getItem("token");
        grade['teacherId'] = grade.teacher.id;
        grade['teacher'] = grade.teacher.name;
        grade['institutionId'] = institutionId;
      
        const response = await axios.post(url, grade, {
          'headers': {
            'Authorization': TOKEN,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
          }
      });
      return dispatch({type: classActions.SAVE_GRADE, payload: response.data})
      }
    }catch(e) {

    }
  }
}

export const getTeacherDetails = (institutionId:any, grade:any, name: any) => {
  return async (dispatch: Dispatch) => {
    const url: any = GET_TEACHER_BY_GRADE.replace("institutionId",institutionId).replace("name", name).
    replace("grade",grade);
    const TOKEN: any  = localStorage.getItem("token");
    const response = await axios.get(url, {
      'headers': {
        'Authorization': TOKEN,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    });

    return dispatch({type: classActions.GET_TEACHER_INFO, payload: response.data})
  }
  
}
