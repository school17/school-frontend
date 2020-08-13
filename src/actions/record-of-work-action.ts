import { Dispatch } from 'redux';
import axios from 'axios';
import {SAVE_RECORD_OF_WORK_URL, GET_RECORD_OF_WORK_URL} from "./url";

export enum recordOfWork  {
  SAVE_RECORD_OF_WORK = "SAVE_RECORD_OF_WORK",
  GET_RECORD_OF_WORK = "GET_RECORD_OF_WORK"
}

export const saveRecordOfWork =  (recordofWork:any) => {
  const TOKEN: any  = localStorage.getItem("token");

  return async (dispatch: Dispatch) => {
    try {
      const url = `${SAVE_RECORD_OF_WORK_URL.replace("institutionId", recordofWork.institutionId)
      .replace("division", recordofWork.division).replace("grade", recordofWork.grade)}`;
      const response = await axios.post(url,recordofWork, {
        'headers': {
          'Authorization': TOKEN,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      });
      return dispatch({type: recordOfWork.SAVE_RECORD_OF_WORK, payload: response.data})
    }catch(e) {
      console.log(e);
    }
  }
}

export const getRecordOfWork = (institutionId:any, division:any, grade:any, subject:any) => {
  const TOKEN: any  = localStorage.getItem("token");

  return async (dispatch: Dispatch) => {
    try {
      const url = `${GET_RECORD_OF_WORK_URL.replace("institutionId", institutionId)
      .replace("division", division).replace("grade", grade).replace("subject", subject)}`;
      const response = await axios.get(url, {
        'headers': {
          'Authorization': TOKEN,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      });
      return dispatch({type: recordOfWork.GET_RECORD_OF_WORK, payload: response.data})
    }catch(e) {
      console.log(e);
    }
  }

}