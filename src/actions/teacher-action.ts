import { Dispatch } from 'redux';
import axios from 'axios';

export enum teachersAction {
  GET_TEACHER  = 'GET_TEACHERS'
}

export const fetchTeacher = (institutionId: any) => {
  return async (dispatch:Dispatch) => {
    try {
      const token: any  = localStorage.getItem("token");
      const url: any = `http://localhost:8081/api/teachers/${institutionId}/teachers`;
      const response = await axios.get(url, {
        'headers': {
          'Authorization': token,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      });

      return dispatch({type: teachersAction.GET_TEACHER, payload: response.data})
    }catch(e) {

    }
  }
}