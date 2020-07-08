import { Dispatch } from 'redux';
import axios from 'axios';

import {SEARCH_GRADES_URL, 
  GET_SUBJECT_TEACGET_ASSOCIATION_URL, 
  SAVE_TEACHER_SUBJECT_ASSOCIATION, 
  UPDATE_SUBJECT_TEACHER_ASSOCIATION,
  GET_STUDENTS_BY_GRADE}  from './url';

export enum gradeDashboardActions  {
  GET_GRADE_DETAILS = "GET_GRADE_DETAILS",
  GET_SUBJECT_TEACHER_ASSOCIATION = "GET_SUBJECT_TEACHER_ASSOCIATION",
  SAVE_SUBJECT_TEACHER_ASSOCIATION = "SAVE_SUBJECT_TEACHER_ASSOCIATION",
  GET_GRADE_STUDENTS = "GET_GRADE_STUDENTS"
}


const TOKEN: any  = localStorage.getItem("token");
export const getGradeDetails = (institutionId: any, filterValue:any ) => {

  return async (dispatch: Dispatch) => {
    try {
    const url = `${SEARCH_GRADES_URL.replace("institutionId", institutionId)}`;
    const response = await axios.post(url, filterValue, {
      'headers': {
        'Authorization': TOKEN,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    });
    return dispatch({type: gradeDashboardActions.GET_GRADE_DETAILS, payload: response.data})

    }catch(e){

    }
  }

}

export const saveSubjectTeacherAssociation = (institutionId: any, grade:any, section:any, association:any) => {
  const payload = {
    institutionId: institutionId,
    grade: grade,
    section: section,
    subjectTeachers: association,
    division: "HIGHER SECONDARY"
  }
  return async (dispatch: Dispatch) => {
    try {
    const url = `${SAVE_TEACHER_SUBJECT_ASSOCIATION.replace("institutionId", institutionId)}`;
    const response = await axios.post(url, payload, {
      'headers': {
        'Authorization': TOKEN,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    });
    return dispatch({type: gradeDashboardActions.SAVE_SUBJECT_TEACHER_ASSOCIATION, payload: response.data})

    }catch(e){

    }
  }
}

export const editSubjectTeacherAssociation = (institutionId: any, grade:any, section:any, subjectTeacherAssociation:any) => {

  return async (dispatch: Dispatch) => {
    try {
    const url = `${UPDATE_SUBJECT_TEACHER_ASSOCIATION.replace("institutionId", institutionId).replace("grade",grade).replace("section",section).replace("id",subjectTeacherAssociation.id)}`;
    delete subjectTeacherAssociation["id"];
    const response = await axios.put(url, subjectTeacherAssociation, {
      'headers': {
        'Authorization': TOKEN,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    });
    return dispatch({type: gradeDashboardActions.SAVE_SUBJECT_TEACHER_ASSOCIATION, payload: response.data})

    }catch(e){

    }
  }
  
}

export const getSubjectTeacherAssociation = (institutionId: any, grade: any, section:any) => {

  return async (dispatch: Dispatch) => {
    try {
      const url = `${GET_SUBJECT_TEACGET_ASSOCIATION_URL
        .replace("institutionId", institutionId)
        .replace("grade", grade)
        .replace("section", section)}`;
    
        const response = await axios.get(url, {
          'headers': {
            'Authorization': TOKEN,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
          }
        });
        return dispatch({type: gradeDashboardActions.GET_SUBJECT_TEACHER_ASSOCIATION, payload: response.data})

    }catch(e) {

    }
  }

}

export const getStudents = (institutionId: any, grade: any, section:any) => {
  return async (dispatch: Dispatch) => {
    try {
      const url = `${GET_STUDENTS_BY_GRADE
        .replace("institutionId", institutionId)
        .replace("grade", grade)
        .replace("section", section)}`;
    
        const response = await axios.get(url, {
          'headers': {
            'Authorization': TOKEN,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
          }
        });
        return dispatch({type: gradeDashboardActions.GET_GRADE_STUDENTS, payload: response.data})

    }catch(e) {

    }
  }
}