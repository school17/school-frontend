import { Dispatch } from 'redux';
import axios from 'axios';

import {GET_GRADE_TEST_LIST, SAVE_GRADE_TEST} from './url';


enum testActions {
  GET_GRADE_TEST = "GET_GRADE_TEST"
}

export const getGradeTestList = (institutionId: any, division:any, grade:any  ) => {
  const token: any  = localStorage.getItem("token");
  return async (dispatch: Dispatch) => {
    try {
    const url = `${GET_GRADE_TEST_LIST.replace("institutionId", institutionId).replace('grade', grade).replace('division', division)}`;
    const response = await axios.get(url, {
      'headers': {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    });
    return dispatch({type: testActions.GET_GRADE_TEST, payload: response.data})

    }catch(e){

    }
  }
}


export const saveGradeTest =  (institutionId:any, test:any) => {
  const token: any  = localStorage.getItem("token");

  return async (dispatch: Dispatch) => {
    try {
      const url = `${SAVE_GRADE_TEST.replace("institutionId", institutionId)}`;
      const response = await axios.post(url, test, {
        'headers': {
          'Authorization': token,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      });
      console.log("response",response);
    }catch(e) {
      console.log(e);
    }
  }
}