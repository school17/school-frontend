import { Dispatch } from 'redux';
import axios from 'axios';
import {GET_USER_DETAILS, HEADERS, UPDATE_PASSWORD} from './url';

export enum userDetailsActions {
  GET_USER_DETAILS = 'GET_USER_DETAILS',
  RESET_PASSWORD = 'RESET_PASSWORD'
}

export const fetchUserDetails = (institutionId: any, userName: any) => {  
  return async (dispatch: Dispatch) => {
    try {
      const url: any = `${GET_USER_DETAILS.replace("institutionId",institutionId).replace("userName",userName)}`
      const response = await axios.get(url, {
        'headers': HEADERS
      });
      return dispatch({type: userDetailsActions.GET_USER_DETAILS, payload: response.data})
    }catch(e) {
      console.log(e);
    }
  }
}

export const resetPassword = (user:any) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.put(UPDATE_PASSWORD, user, {
        'headers': HEADERS
      })
      return dispatch({type: userDetailsActions.GET_USER_DETAILS, payload: response.data})
    }catch(e) {
      console.log(e)
    }
  }
}