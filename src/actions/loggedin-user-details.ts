import { Dispatch } from 'redux';
import axios from 'axios';

import {GET_TEACHER_DETAILS_URL, GET_STUDENT_DETAILS_URL} from './url';

export enum userActions {
  SET_LOGGEDIN_USER_DETAILS = 'SET_LOGGEDIN_USER_DETAILS'
}

export const setUserDetails = (institutionId: any, email: any, role: any) => {
  return async (dispatch: Dispatch) => {
    try {
      let url ="";
      let user =  {email : email};
      if(role === "ADMIN") {
        //user =  {email : "qorudyvisu@mailinator.com"};
       // url = `${GET_STUDENT_DETAILS_URL.replace("institutionId", institutionId)}?pageNumber=0&?pageSize=1`;
      }else  {
      
        if(role === "STUDENT") {
          url = `${GET_STUDENT_DETAILS_URL.replace("institutionId", institutionId).replace("email", email)}`;  
        } else if(role === "TEACHER") {
          url = `${GET_TEACHER_DETAILS_URL.replace("institutionId", institutionId).replace("email", email)}`;
        }
      }
      

      const TOKEN: any  = localStorage.getItem("token");
      const response = await axios.get(url, {
        'headers': {
          'Authorization': TOKEN,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      });
      return dispatch({type: userActions.SET_LOGGEDIN_USER_DETAILS, payload: response.data})
    }catch(e) {
      
    }
  }
}