import React, { ReactElement } from 'react';
import OnboardingFrom from './onboardingForm';
import {useSelector} from "react-redux";
import { Redirect, useLocation, useParams } from "react-router-dom";
import UnAuthorized from './../unAuthorized/unAuthorized';
import {useDispatch} from "react-redux";
import {getSchoolDetails} from './../../actions/address-form-actions'
interface Props {
  
}

function OnbardingBaseComponent({}: Props): ReactElement {
  const dispatch = useDispatch();
  let { institutionId } = useParams();
  const {role, institution} = useSelector((store:any) => {
    return store.loginReducer
  })
  const authorizationHandler = () => {
    if(institutionId === institution) {
        //dispatch(getSchoolDetails(institutionId))
      return (
      <OnboardingFrom></OnboardingFrom>
      )
    }else {
      return (
        <UnAuthorized></UnAuthorized>
      )
    }
  }
  return (
    <div className="MuiPaper-root">
      {authorizationHandler()}
    </div>
  )
}

export default OnbardingBaseComponent
