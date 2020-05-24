import React, { ReactElement } from 'react'
import {useSelector} from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import {userDetails} from './../../utils/userDetails';

interface Props {
  
}

function LandingRedirect({}: Props): ReactElement {
  let location = useLocation();
  const {user} = useSelector((store: any) => {
    return store.userDetailsReducer;
  })
  const {role, institution, email} = userDetails();
  let url = '/';
    if(user.temporaryPassword){
      url = '/reset-password'
    }else {
      url = role === 'ADMIN' ? `/institution/${institution}/school-onboarding` :'/syllabus';
    }
  return (
    <Redirect
        to={{
          pathname: url,
          state: { from: location }
        }}
      />
  )
}

export default LandingRedirect
