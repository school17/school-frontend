import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router';
import SyllabusBase from './syllabus-revamp/syllabusBase';
import OnbardingBaseComponent from '../school-onboarding/onbardingBaseComponent';
import LandingRedirect from '../base-component/landingRedirect';
import ResetPasswordComponent from '../login-component/resetPasswordComponent';
import TeacherComponent from '../teacher-component/teacherComponent';
import ClassComponent from '../class-component/classComponent'
function Base(): ReactElement {
  return (
    <div>
      <Switch>
        <Route path="/syllabus" component={SyllabusBase}></Route>
        <Route path="/teachers" component={TeacherComponent}></Route>
        <Route path="/class" component={ClassComponent}></Route>
        <Route path="/institution/:institutionId/school-onboarding" component={OnbardingBaseComponent}></Route>
        <Route path="/" component = {LandingRedirect}></Route>
      </Switch>
    </div>
  )
}

export default Base
