import React, { ReactElement, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getGradeDetails} from "../../actions/grade-dashboard-actions";
import SubjectTeacherAssociationComponent from "./subjectTeacherAssociationComponent";
import {Grid} from "@material-ui/core";
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

  const {gradeDetails} = useSelector((store:any) => {
    return store.gradeDashboardReducer;
  })
  useEffect(() => {
    if(institution) {
      dispatch(getGradeDetails(institution, {grade: grade, section: section}))
    }
  }, [institution])
  return (
    <div className={classes.header}>
       <h4>DASHBOARD FOR GRADE {grade} {section}</h4>
      <Grid container spacing={4}>
      <Grid item xs={12} md={9}>
      <Paper className={classes.root}>
      <h4>Class Teacher: {gradeDetails.teacher}</h4>
      <h4>Total Students: {gradeDetails.strength}</h4>
      </Paper>
      </Grid>
      <Grid item xs={12} md={3} >
      <Paper className={classes.root}>
      <SubjectTeacherAssociationComponent institution= {institution} grade= {grade} section={section}></SubjectTeacherAssociationComponent>
      </Paper>
        
      </Grid>
    </Grid>
    </div>
    
  )
}

export default GradeBaseComponent
