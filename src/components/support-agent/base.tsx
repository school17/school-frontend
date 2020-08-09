import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router';
import SyllabusBase from './syllabus-revamp/syllabusBase';
import OnbardingBaseComponent from '../school-onboarding/onbardingBaseComponent';
import LandingRedirect from '../base-component/landingRedirect';
import TeacherComponent from '../teacher-component/teacherComponent';
import ClassComponent from '../class-component/classComponent';
import StudentBaseComponent from '../students-component/studentBaseComponent';
import ViewLeaveComponent from "../attendance-component/view-leave-component/viewLeaveComponent";
import DashboardComponent from "../dashboard-component/dashboardComponent";
import GradeBaseComponent from "../grade-dashboard/gradeBaseComponent";
import AdminComponent from "../admin-component/adminComponent";
import RecordofworkBaseComponent from "../record-of-work/recordofworkBaseComponent";
function Base(): ReactElement {
  return (
    <div>
      <Switch>
        <Route path="/student/:division/:grade/:section/:id/dashboard" component={DashboardComponent}></Route>
        <Route path="/syllabus" component={SyllabusBase}></Route>
        <Route path="/teachers" component={TeacherComponent}></Route>
        <Route path="/students-management" component={StudentBaseComponent}></Route>
        <Route path="/view-leaves" component={ViewLeaveComponent}></Route>
        <Route path="/class" component={ClassComponent}></Route>
        <Route path="/admin" component={AdminComponent}></Route>
        <Route path="/institution/:institutionId/school-onboarding" component={OnbardingBaseComponent}></Route>
        <Route path="/grade/:grade/:section" component={GradeBaseComponent}></Route>
        <Route path="/record-of-work" component={RecordofworkBaseComponent}></Route>
        <Route path="/" component = {LandingRedirect}></Route>
      </Switch>
    </div>
  )
}

export default Base
