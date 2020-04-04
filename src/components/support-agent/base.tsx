import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router';
import SyllabusBase from './syllabus-revamp/syllabusBase';
import OnbardingBaseComponent from '../school-onboarding/onbardingBaseComponent';
import LandingRedirect from '../base-component/landingRedirect';
import ResetPasswordComponent from '../login-component/resetPasswordComponent';

function Base(): ReactElement {
  return (
    <div>
      <Switch>
        <Route path="/syllabus" component={SyllabusBase}></Route>
        <Route path="/institution/:institutionId/school-onboarding" component={OnbardingBaseComponent}></Route>
        <Route path="/" component = {LandingRedirect}></Route>
      </Switch>
    </div>
  )
}

export default Base
