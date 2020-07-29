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
      switch(role) {
        case "ADMIN" : {
          url = `/institution/${institution}/school-onboarding`;
          break;
        }
        case "STUDENT" : {
          url = `/student/${user.grade}/${user.section}/${user.id}/dashboard`;
          break;
        }
        case "TEACHER": {
          url = `/teacher/dashboard`;
          break;
        }
        default : {
          url = "/syllabus";
          break;
        }
      }
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
