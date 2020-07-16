import { Dispatch } from 'redux';
import axios from 'axios';

import {GET_LOG_WORK, SAVE_LOG_WORK} from './url';


enum logworkActions {
  GET_LOG_WORK = "GET_LOG_WORK",
  SAVE_LOG_WORK = "SAVE_LOG_WORK"
}

export const getLogwork = (institutionId: any,  grade:any, section:any, date:any  ) => {
  const token: any  = localStorage.getItem("token");
  return async (dispatch: Dispatch) => {
    try {
    const url = `${GET_LOG_WORK.replace("institutionId", institutionId).replace('grade', grade).replace('section', section).replace('date', date)}`;
    const response = await axios.get(url, {
      'headers': {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    });
    return dispatch({type: logworkActions.GET_LOG_WORK, payload: response.data})

    }catch(e){

    }
  }
}


export const saveLogwork = (institutionId: any,  grade:any, section:any, date:any, logworkArray:any) => {
  return async (dispatch: Dispatch) => {
    try {
      const token: any  = localStorage.getItem("token");
      const url = `${SAVE_LOG_WORK.replace("institutionId", institutionId).replace('grade', grade).replace('section', section)}`;
      const logwork = {
        institutionId: institutionId,
        grade: grade,
        section:section,
        date:date,
        logwork:logworkArray
  
      }

      const response = await axios.post(url, logwork,{
        'headers': {
          'Authorization': token,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      });
      return dispatch({type: logworkActions.SAVE_LOG_WORK, payload: response.data})
    }
    catch(e) {

    }
  }
}