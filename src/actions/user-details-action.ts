import { Dispatch } from 'redux';
import axios from 'axios';

export enum userDetailsActions {
  GET_USER_DETAILS = 'GET_USER_DETAILS',
  RESET_PASSWORD = 'RESET_PASSWORD'
}

export const fetchUserDetails = (institutionId: any, userName: any) => {  
  return async (dispatch: Dispatch) => {
    try {
      const token: any  = localStorage.getItem("token");
      const url: any = `http://localhost:8081/api/institution/${institutionId}/users/${userName}`
      const response = await axios.get(url, {
        'headers': {
          'Authorization': token,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
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
      const token: any  = localStorage.getItem("token");
      const url: any = `http://localhost:8081/api/users/updatePassword`;
      const response = await axios.put(url, user, {
        'headers': {
          'Authorization': token,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      })
      return dispatch({type: userDetailsActions.GET_USER_DETAILS, payload: response.data})
    }catch(e) {
      console.log(e)
    }
  }
}