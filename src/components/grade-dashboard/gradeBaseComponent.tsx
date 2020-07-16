import React, { ReactElement, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getGradeDetails} from "../../actions/grade-dashboard-actions";
import SubjectTeacherAssociationComponent from "./subjectTeacherAssociationComponent";
import TimeTableBaseComponent from "./timeTableBaseComponent";
import TeachersCard from "./teachersCard";
import DetailsCardComponent from "./detailsCardComponent";
import StudentsList from "./studentsList";
import Timetablemin from "./../../common/dashboard-common-components/timetablemin";
import {Grid} from "@material-ui/core";
import ExamTimeTable from "./../../common/dashboard-common-components/examTimeTable";
import LogWorkComponent from "./logWorkComponent";
import HomeworkComponent from "../../common/dashboard-common-components/homeworkComponent";

import {
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
interface Props {
  
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)",
     
    },

    header: {
      flexGrow: 1,
    }
  })
);

function GradeBaseComponent({}: Props): ReactElement {
  let { grade, section } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();

  const {institution, email, role} = useSelector((store:any) => {
    return store.loginReducer;
  });

  const {gradeDetails, subjectTeacherAssociation} = useSelector((store:any) => {
    return store.gradeDashboardReducer;
  });

  useEffect(() => {
    if(institution) {
      dispatch(getGradeDetails(institution, {grade: grade, section: section}))
    }
  }, [institution])
  return (
    <div className={classes.header}>
      <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
        <DetailsCardComponent gradeDetails={gradeDetails}></DetailsCardComponent>
        </Grid>
        <Grid item xs={12} md={12}>
        <Timetablemin institution= {institution} grade= {grade} section={section}></Timetablemin>
        </Grid>

        <Grid item xs={12} md={12}>
        <HomeworkComponent institution= {institution} grade= {grade} section={section}></HomeworkComponent>
        </Grid>
        <Grid item xs={12} md={12}>
        <LogWorkComponent institution= {institution} grade= {grade} section={section}></LogWorkComponent>
        </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
      <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        {(institution && grade && section)?  <ExamTimeTable institution= {institution} grade= {grade} section={section} division={gradeDetails.division}></ExamTimeTable> : ''}
      </Grid>
      <Grid item xs={12} md={12}>
        <TeachersCard institution= {institution} grade= {grade} section={section}></TeachersCard>
      </Grid>
      </Grid>
      </Grid>
      <Grid item xs={12} md={5}>
        <StudentsList institution= {institution} grade= {grade} section={section}></StudentsList>
      </Grid>
      {(Object.keys(subjectTeacherAssociation).length > 0) ? 
       <Grid item xs={12} md={12}>
       <Paper className={classes.root}>
       {/*<TimeTableBaseComponent institution= {institution} grade= {grade} section={section}></TimeTableBaseComponent>*/}
       </Paper>
       </Grid> : 
        <Grid item xs={12} md={3} >
        <Paper className={classes.root}>
        <SubjectTeacherAssociationComponent institution= {institution} grade= {grade} section={section}></SubjectTeacherAssociationComponent>
        </Paper>
          
        </Grid>}
     
      
    </Grid>
    </div>
    
  )
}

export default GradeBaseComponent
