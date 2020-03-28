import { Dispatch } from 'redux';

export enum loginActions {
  SET_LOGIN_DETAILS = 'SET_LOGIN_DETAILS'
}

export const setLoginDetails = (role: any, institution: any) => {
  return(dispatch: Dispatch) => {
    const payload = {
      role: role,
      institution: institution
    }
    console.log("PAYLOAD ", payload)
    return dispatch({type: loginActions.SET_LOGIN_DETAILS, payload: payload})
  }
}