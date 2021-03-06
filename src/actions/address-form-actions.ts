import { Dispatch } from 'redux';
import axios from 'axios';
import {GET_INSTITUTION, UPDATE_INSTITUTION as UPDATE_INSTITUTION_URL} from './url';
export enum ValidAddressFormActions {
  VALID_ADDRESS_FORM = "VALID_ADDRESS_FORM",
  VALID_SCHOOL_INFO_FORM ='VALID_SCHOOL_INFO_FORM',
  IN_VALID_ADDRESS_FORM = "IN_VALID_ADDRESS_FORM",
  PREVIOUS_STEPPER = "PREVIOUS_STEPPER",
  RESET_STEPPER = "RESET_STEPPER",
  NEXT_STEPPER = "NEXT_STEPPER",
  SUBMIT_ADDRESS_FORM = "SUBMIT_ADDRESS_FORM",
  RESET_ADDRESS_FORM = "RESET_ADDRESS_FORM",
  SUBMIT_SCHOOL_INFO_FORM = "SUBMIT_SCHOOL_INFO_FORM",
  RESET_SCHOOL_INFO_FORM= "RESET_SCHOOL_INFO_FORM",
  SET_IMAGE = 'SET_IMAGE',
  SET_PREVIEW_IMAGE = 'SET_PREVIEW_IMAGE',
  RESET_IMAGE = "RESET_IMAGE",
  SET_IMAGE_URL = 'SET_IMAGE_URL',
  GET_SCHOOL_DETAILS = 'GET_SCHOOL_DETAILS',
  ADD_GRADES_AND_DIVISION = "ADD_GRADES_AND_DIVISION",
  UPDATE_INSTITUTION = "UPDATE_INSTITUTION"
}

interface ValidAddressForm {
  type: ValidAddressFormActions.VALID_ADDRESS_FORM
}

interface InvalidAddressForm {
  type: ValidAddressFormActions.IN_VALID_ADDRESS_FORM
}

interface PreviousStepper {
  type: ValidAddressFormActions.PREVIOUS_STEPPER
}

interface ResetStepper {
  type: ValidAddressFormActions.RESET_STEPPER
}

interface NextStepper {
  type: ValidAddressFormActions.NEXT_STEPPER
}


export const ValidAddressForm = (ValidAddressForm?:any) =>{
  return(dispatch: Dispatch) => {
    return dispatch({type: ValidAddressFormActions.VALID_ADDRESS_FORM, payload: ValidAddressForm})
  }
}

export const ValidSchoolInfoForm = (validSchoolInfo: any) =>{
  return(dispatch: Dispatch) => {
    return dispatch({type: ValidAddressFormActions.VALID_SCHOOL_INFO_FORM, payload: validSchoolInfo})
  }
}
export const PreviousStepper = (currentStepper:any) => {
  return(dispatch: Dispatch) => {
    return dispatch({type: ValidAddressFormActions.PREVIOUS_STEPPER, currentStepper: currentStepper})
  }
}

export const ResetStepper = () => {
  return(dispatch: Dispatch) => {
    return dispatch({type: ValidAddressFormActions.RESET_STEPPER})
  }
}

export const NextStepper = (currentStepper:any) => {
  return(dispatch: Dispatch) => {
    return dispatch({type: ValidAddressFormActions.NEXT_STEPPER, currentStepper: currentStepper})
  }
}

export const submitAddressForm = () => {
  return(dispatch: Dispatch) => {
    return dispatch({type: ValidAddressFormActions.SUBMIT_ADDRESS_FORM})
  }
}

export const resetAddressForm = () => {
  return(dispatch: Dispatch) => {
    return dispatch({type: ValidAddressFormActions.RESET_ADDRESS_FORM})
  }
}

export const resetSchoolInfoForm = () => {
  return(dispatch: Dispatch) => {
    return dispatch({type: ValidAddressFormActions.RESET_SCHOOL_INFO_FORM})
  }
}

export const submitSchoolInfoFrom = () => {
  return(dispatch: Dispatch) => {
    return dispatch({type: ValidAddressFormActions.SUBMIT_SCHOOL_INFO_FORM})
  }
}

export const setImage = () => {
  return(dispatch: Dispatch) => {
    return dispatch({type: ValidAddressFormActions.SET_IMAGE})
  }
}

export const setPreviewImage =  (image: any) => {
  return(dispatch: Dispatch) => {
    return dispatch({type: ValidAddressFormActions.SET_PREVIEW_IMAGE, payload: image})
  }
}

export const resetImage = () => {
  return(dispatch: Dispatch) => {
    return dispatch({type: ValidAddressFormActions.RESET_IMAGE})
  }
}

export const setImageUrl = (image: any) => {
  return(dispatch: Dispatch) => {
    return dispatch({type: ValidAddressFormActions.SET_IMAGE_URL, image: image })
  }
}

export const setDivsionAndGrades = (divsisionAndGrade:any) => {
  return (dispatch: Dispatch) => {
    return dispatch({type: ValidAddressFormActions.ADD_GRADES_AND_DIVISION, payload: divsisionAndGrade })
  }
}

export const updateInstitution = (institution:any, institutionId:any) => {
  //UPDATE_INSTITUTION
  return async (dispatch: Dispatch) => {
    const url = `${UPDATE_INSTITUTION_URL.replace('institutionId', institutionId)}`
    try {
      const TOKEN: any  = localStorage.getItem("token");
      const institutionDetails = await axios.put(url, institution, {
        'headers': {
          'Authorization': TOKEN,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      });
      dispatch({type: ValidAddressFormActions.UPDATE_INSTITUTION, payload: institutionDetails.data})
    }catch(e){
      console.log(e);
    }
  }
}

export const getSchoolDetails = (institutionId: any) => {
  return async (dispatch: Dispatch) => {
    const url = `${GET_INSTITUTION.replace('institutionId', institutionId)}`
    try {
      const TOKEN: any  = localStorage.getItem("token");
      const institutionDetails = await axios.get(url, {
        'headers': {
          'Authorization': TOKEN,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      });
      dispatch({type: ValidAddressFormActions.GET_SCHOOL_DETAILS, payload: institutionDetails.data})
    }catch(e){
      console.log(e);
    }
  }
}