import { Dispatch } from 'redux';
import axios from 'axios';
import {SAVE_TIME_TABLE, UPDATE_TEACHER_TIME_TABLE_ON_DELETE} from './url';

export enum timetableActions{ 
  SAVE_TIME_TABLE = "SAVE_TIME_TABLE",
  GET_TIME_TABLE_FOR_GRADE = "GET_TIME_TABLE_FOR_GRADE",
  UPDATE_TEACHER_TIME_TABLE_ON_DELETE = "UPDATE_TEACHER_TIME_TABLE_ON_DELETE"
}

export const saveTimeTable = (institutionId: any, grade:any , section:any , timetable:any) => {
  const token: any  = localStorage.getItem("token");
  const payload = { 
    institutionId: institutionId,
    grade: grade,
    section: section,
    timetable : timetable
  }
  return async (dispatch: Dispatch) => {
    try {
    const url = `${SAVE_TIME_TABLE.replace("institutionId", institutionId).replace('grade', grade).replace('section', section)}`;
    const response = await axios.post(url, payload, {
      'headers': {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    });
    return dispatch({type: timetableActions.SAVE_TIME_TABLE, payload: response.data})

    }catch(e){

    }
  }
}


export const getTimeTable = (institutionId: any, grade:any , section:any ) => {
  const token: any  = localStorage.getItem("token");

  return async (dispatch: Dispatch) => {
    try {
    const url = `${SAVE_TIME_TABLE.replace("institutionId", institutionId).replace('grade', grade).replace('section', section)}`;
    const response = await axios.get(url, {
      'headers': {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    });
    return dispatch({type: timetableActions.GET_TIME_TABLE_FOR_GRADE, payload: response.data})

    }catch(e){

    }
  }
}

export const updateTeacherTimeTableOnDelete = (institutionId: any, name: any, day:any, period:any ) => {
  const token: any  = localStorage.getItem("token");

  return async (dispatch: Dispatch) => {
    try {
    const url = `${UPDATE_TEACHER_TIME_TABLE_ON_DELETE.replace("institutionId", institutionId).replace('name', name).replace('day', day).replace('period', period)}`;
    const response = await axios.put(url, {}, {
      'headers': {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    });
    const payload = {
      name: name,
      day: day,
      period: period
    }
    return dispatch({type: timetableActions.UPDATE_TEACHER_TIME_TABLE_ON_DELETE, payload: payload})

    }catch(e){

    }
  }
}