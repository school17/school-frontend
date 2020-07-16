import { Dispatch } from 'redux';
import axios from 'axios';
import {SAVE_HOME_WORK, GET_HOME_WORK} from './url';

enum homeworkActions {
  SAVE_HOME_WORK = "SAVE_HOME_WORK",
  GET_HOME_WORK = "GET_HOME_WORK"
}


export const saveHomeWork = (institutionId:any, grade:any, section:any, homework:any) => {
  const token: any  = localStorage.getItem("token");

  return async (dispatch: Dispatch) => {
    try {
    const url = `${SAVE_HOME_WORK.replace("institutionId", institutionId).replace('grade', grade).replace('section', section)}`;
    const response = await axios.post(url, homework,{
      'headers': {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    });
    return dispatch({type: homeworkActions.SAVE_HOME_WORK, payload: response.data})

    }catch(e){

    }
  }
}

export const getHomework = (institutionId:any, grade:any, section:any, date:any) => {
  const token: any  = localStorage.getItem("token");

  return async (dispatch: Dispatch) => {
    try {
    const url = `${GET_HOME_WORK.replace("institutionId", institutionId).replace('grade', grade).replace('section', section).replace('date', date)}`;
    const response = await axios.get(url,{
      'headers': {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    });
    return dispatch({type: homeworkActions.GET_HOME_WORK, payload: response.data})

    }catch(e){

    }
  }
}
