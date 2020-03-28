import React, { ReactElement } from 'react'
import {useSelector} from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
interface Props {
  
}

function LandingRedirect({}: Props): ReactElement {
  let location = useLocation();
  const {role, institution} = useSelector((store:any) => {
    return store.loginReducer
  })
  const url = role === 'ADMIN' ? `/institution/${institution}/school-onboarding` :'/syllabus';
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
