import { Dispatch } from 'redux';

export enum loginActions {
  SET_LOGIN_DETAILS = 'SET_LOGIN_DETAILS'
}

export const setLoginDetails = (role: any, institution: any, email: any) => {
  return(dispatch: Dispatch) => {
    const payload = {
      role: role,
      institution: institution,
      email: email
    }
    return dispatch({type: loginActions.SET_LOGIN_DETAILS, payload: payload})
  }
}