import React, { ReactElement, useEffect } from 'react'
import {Grid} from "@material-ui/core";
import NotificationComponent from './notificationComponent';
import ListSubjectTeacherAssociation from '../grade-dashboard/listSubjectTeacherAssociation';
import { useDispatch, useSelector } from "react-redux";
import {getSubjectTeacherAssociation} from "../../actions/grade-dashboard-actions";
import {
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
interface Props {
  
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)",
      borderRadius: 10,
      overflow: "auto",
      textAlign: "initial",
      padding: 5,
      fontWeight: 900,
    }, 
  })
);

function DashboardComponent({}: Props): ReactElement {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {subjectTeacherAssociation} = useSelector((store:any) => {
    return store.gradeDashboardReducer;
  });

  const {loggedInUser} = useSelector((store:any) => {
    return store.loggedinUserReducer;
  });

  useEffect(() => {
    if(Object.keys(subjectTeacherAssociation).length < 1 && Object.keys(loggedInUser).length > 1) {
      dispatch(getSubjectTeacherAssociation(loggedInUser.institutionId,  loggedInUser.grade, loggedInUser.section))
    }
  }, [subjectTeacherAssociation, loggedInUser])

  const showFacultyMembers = () => {
    if(subjectTeacherAssociation && subjectTeacherAssociation.subjectTeachers) {
      return (
        <Grid item xs={12} md={3} className={classes.root}>
        <ListSubjectTeacherAssociation association={subjectTeacherAssociation.subjectTeachers} showEdit={false}></ListSubjectTeacherAssociation>
        </Grid>
      )
    }
  }
  return (
    <div>
      <Grid container>
      <Grid item xs={6} md={9}>

        </Grid>
        <Grid item xs={6} md={3}>
          <NotificationComponent/>
        </Grid>
        
        {showFacultyMembers()}
      </Grid>
    </div>
  )
}

export default DashboardComponent
