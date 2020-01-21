import { Dispatch } from 'redux';

export enum SyllabusModalActions {
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL"
}

interface openModal {
  type: SyllabusModalActions.OPEN_MODAL,
  payload:{}
  isNew: boolean
}

interface closeModal {
  type: SyllabusModalActions.CLOSE_MODAL
}

export const openModal = (isNew= false, currentSyllabus?: any) =>{
  return (dispatch: Dispatch) => {
    if(!isNew){
      return dispatch({type: SyllabusModalActions.OPEN_MODAL, payload: currentSyllabus, isNew:isNew})
    }else{
      return dispatch({type: SyllabusModalActions.OPEN_MODAL, payload: currentSyllabus, isNew:isNew})
    }
  }
}

export const closeModal = () =>{
  return (dispatch: Dispatch) => {
    return dispatch({type: SyllabusModalActions.CLOSE_MODAL})
  }
}