import { Dispatch } from 'redux';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

import {GET_ATTENDANCE_NAMES_URL, GET_MONTH_ATTENDANCE_URL} from './url';

export enum attendaceAction {
  GET_STUDENT_ATTENDANCE_NAMES = "GET_STUDENT_ATTENDANCE_NAMES",
  GET_ATTENDANCE = "GET_ATTENDANCE",
  LOADING = "LOADING"
}


export const getAttendanceStudentsName = (institutionId: any, grade: any, section: any) => {
  
  return async (dispatch:Dispatch) => {
    dispatch({type: attendaceAction.LOADING})
    try {
      const url = `${GET_ATTENDANCE_NAMES_URL.replace("institutionId", institutionId).replace("grade", grade).replace("section", section)}`;
      const TOKEN: any  = localStorage.getItem("token");
      const response = await trackPromise(axios.get(url, {
        'headers': {
          'Authorization': TOKEN,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      }))
      return dispatch({type: attendaceAction.GET_STUDENT_ATTENDANCE_NAMES, payload: response.data})
    }catch(e){

    }
  }

}


export const getAttendance = (institutionId: any, grade: any, section: any, month:any, year:any) => {

  return async (dispatch:Dispatch) => {
    dispatch({type: attendaceAction.LOADING})
    try {
      const TOKEN: any  = localStorage.getItem("token");
      let url = `${GET_ATTENDANCE_NAMES_URL.replace("institutionId", institutionId).replace("grade", grade).replace("section", section)}`;
      let response = await trackPromise(axios.get(url, {
        'headers': {
          'Authorization': TOKEN,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      }));
      dispatch({type: attendaceAction.GET_STUDENT_ATTENDANCE_NAMES, payload: response.data})
      url = `${GET_MONTH_ATTENDANCE_URL.replace("institutionId", institutionId).
      replace("grade", grade).replace("section", section).replace("month", month).replace("year", year)}`;
      
      response = await axios.get(url, {
        'headers': {
          'Authorization': TOKEN,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      });

      return dispatch({type: attendaceAction.GET_ATTENDANCE, payload: response.data})
     
    }catch(e){

    }
  }

}