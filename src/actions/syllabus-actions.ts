import { Syllabus } from './../models/syllabus';
import axios from 'axios';
import { Dispatch } from 'redux';
import {SyllabusModalActions} from './syllabus-modal-actions';

export enum SyllabusActionTypes {
  FETCH_SYLLABUS = "FETCH_SYLLABUS",
  FETCH_SYLLABUS_SUCCESS = "FETCH_SYLLABUS_SUCCESS",
  FETCH_SYLLABUS_ERROR = "FETCH_SYLLABUS_ERROR",
  FETCH_CURRENT_SYLLABUS = "FETCH_CURRENT_SYLLABUS",
  FETCH_CURRENT_SYLLABUS_SUCCESS = "FETCH_CURRENT_SYLLABUS_SUCCESS",
  FETCH_CURRENT_SYLLABUS_ERROR = "FETCH_CURRENT_SYLLABUS_ERROR",
  UPDATE_SYLLABUS = "UPDATE_SYLLABUS",
  UPDATE_SYLLABUS_SUCCESS = "UPDATE_SYLLABUS_SUCCESS",
  UPDATE_SYLLABUS_ERROR = "UPDATE_SYLLABUS_ERROR",
  DELETE_SYLLABUS = "DELETE_SYLLABUS",
  DELETE_SYLLABUS_SUCCESS = "DELETE_SYLLABUS_SUCCESS",
  DELETE_SYLLABUS_ERROR = "DELETE_SYLLABUS_ERROR",
  SAVE_SYLLABUS = "SAVE_SYLLABUS",
  SAVE_SYLLABUS_SUCCESS = "SAVE_SYLLABUS_SUCCESS",
  SAVE_SYLLABUS_ERROR = "SAVE_SYLLABUS_ERROR"
}

interface FetchSyllabus {
  type: SyllabusActionTypes.FETCH_SYLLABUS
}

interface FetchSyllabusSuccess {
  type: SyllabusActionTypes.FETCH_SYLLABUS_SUCCESS
  payload: Syllabus[]
}

interface FetchSyllabusError {
  type: SyllabusActionTypes.FETCH_SYLLABUS_ERROR
}

interface SaveSyllabus {
  type: SyllabusActionTypes.SAVE_SYLLABUS
  payload: Syllabus
}

interface SaveSyllabusSuccess {
  type: SyllabusActionTypes.SAVE_SYLLABUS_SUCCESS
}

interface SaveSyllabusError {
  type: SyllabusActionTypes.SAVE_SYLLABUS_ERROR
}

export const fetchSyllabus = (mode:String, subject:String, grade:String, state?:String) => {
  return  async (dispatch: Dispatch) =>{
    handlefetchSyllabus(dispatch);
    try {
      let url = '';
      if(state){
        url = `http://localhost:8080/syllabus/${mode}/${subject}/${grade}/${state}`
      }else{
        url = `http://localhost:8080/syllabus/${mode}/${subject}/${grade}`
      }
      const response = await axios.get(url);
      const SyllabusList:Syllabus[] = response.data
      handleFectSyllabusSuccess(dispatch, SyllabusList);

    }catch(error) {
      handleFectSyllabusError(dispatch);
    }
  }
}

export const handlefetchSyllabus = (dispatch: Dispatch<FetchSyllabus>) => {
  dispatch({type: SyllabusActionTypes.FETCH_SYLLABUS})
}

export const handleFectSyllabusSuccess = (dispatch: Dispatch<FetchSyllabusSuccess>, syllabusList:Syllabus[]) => {
  dispatch({type: SyllabusActionTypes.FETCH_SYLLABUS_SUCCESS, payload: syllabusList})
}

export const handleFectSyllabusError = (dispatch:Dispatch<FetchSyllabusError>) => {
  dispatch({type: SyllabusActionTypes.FETCH_SYLLABUS_ERROR})
}

export const saveSyllabus = (Syllabus: any) =>{
  return async (dispatch: Dispatch) =>{
    const topics =  Syllabus.topics;
    delete Syllabus["topics"];
    try{
      const response = await axios.post(`http://localhost:8080/syllabus/subject`, Syllabus);
      const createdId = response.data.id;
      const topicPayload:any = []
      topics.forEach((topic:any)=>{
        topicPayload.push({
          "topic": topic
        });
      });
      const topicResponse = await axios.post(`http://localhost:8080/syllabus/subject/${createdId}/topic`,topicPayload);
      response.data["topics"] = topicResponse.data;
      dispatch({type: SyllabusActionTypes.SAVE_SYLLABUS_SUCCESS, payload: response.data});
      dispatch({type: SyllabusModalActions.CLOSE_MODAL});
    }catch(error){
      console.log(error);
    }
  }
}

export const updateSyllabus = (Syllabus: any) =>{
  return async (dispatch: Dispatch) =>{
    delete Syllabus["topics"];
    try{
      const response = await axios.put(`http://localhost:8080/syllabus/subject/${Syllabus.id}`, Syllabus);
      dispatch({type: SyllabusActionTypes.UPDATE_SYLLABUS_SUCCESS, payload: response.data});
      dispatch({type: SyllabusModalActions.CLOSE_MODAL});
    }catch(error){
      console.log(error);
    }
  }
}


export const deleteSyllabus = (subjectId:any) =>{
  return async (dispatch: Dispatch) =>{
    try {
      const response = await axios.delete(`http://localhost:8080/syllabus/subject/${subjectId}`);
    }catch(error) {
      console.log(error);
    }
  }
}