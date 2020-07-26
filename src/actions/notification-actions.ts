import { Dispatch } from 'redux';
import axios from 'axios';
import {GET_NOTIFICATIONS_URL} from "./url";
import {SAVE_NOTIFICATIONS_URL} from "./url";
export enum notificationActions {
  GET_NOTIFICATIONS = "GET_NOTIFICATIONS"
}

export const getNotifications = (institutionId:any, email:any, scope:any, division?:any, grade?:any, section?:any) => {
  return async (dispatch:Dispatch)  => {
    try {
      //const url = `${SEARCH_STUDENTS_URL.replace("institutionId", institutionId)}?pageNumber=${searchQuery.pageNumber}&?pageSize=${searchQuery.pageSize}`;
      const url = `${GET_NOTIFICATIONS_URL.replace("institutionId", institutionId)}?grade=${grade}&?section=${section}&?division=${division}&?scope=${scope}&?email=${email}`;
      const TOKEN: any  = localStorage.getItem("token");
      const response = await axios.get(url,{
        'headers': {
          'Authorization': TOKEN,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      });
      return dispatch({type: notificationActions.GET_NOTIFICATIONS, payload: response.data})
    }catch(e){
      console.log(e);
    }
  }
}
export const saveNotifications =  (institutionId:any, notification:any) => {
  const TOKEN: any  = localStorage.getItem("token");

  return async (dispatch: Dispatch) => {
    try {
      const url = `${SAVE_NOTIFICATIONS_URL.replace("institutionId", institutionId)}`;
      const response = await axios.post(url,notification, {
        'headers': {
          'Authorization': TOKEN,
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