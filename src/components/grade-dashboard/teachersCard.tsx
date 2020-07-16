import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getSubjectTeacherAssociation} from "../../actions/grade-dashboard-actions";
import getProfilePicUrl from './../../utils/randomProfilePicGenerator';
import {Grid} from "@material-ui/core";

import {
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";

interface Props {
  institution:any,
  grade:any,
  section: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)",
      borderRadius: 10,
    },

    classDetails: {
      fontWeight: 900,
      textAlign: "initial",
      padding: "20px 0 0 30px"
    },

    subjectHeader: {
      color: "darkgray",
      marginTop: 10
    },

    card: {
      display: "flex",
      maxWidth: 200,
      minHeight: 70,
      borderRadius: 10,
      margin: "20px 20px 0px 20px",
      alignItems: "flex-start",
      flexDirection: "column",
      padding: "10px 0 0 20px",
    },

    subject: {
    color: "white",
    fontWeight: "bolder"
    },

    header: {
      padding: "20px 0 0 20px",
      textAlign: "left"
    },
    image: {
      width:30,
      height:30,
      marginRight: 5,
      borderRadius: "50%",
      border: "solid 2px orangered"
    },
    teacher: {
      display: "flex",
      alignItems: "center",
      fontSize:14,
      color: "white",
      marginTop: 5
    },
  })
);

function TeachersCard({institution, grade, section}: Props): ReactElement {
  const dispatch = useDispatch();

  const classes = useStyles();

  const colors = ["#3C4059", "#939938", "#806337", "#CE655F", "#4755BF"]

  const {subjectTeacherAssociation} = useSelector((store:any) => {
    return store.gradeDashboardReducer;
  });

  useEffect(() => {
    dispatch(getSubjectTeacherAssociation(institution,  grade, section))

  }, [grade, section])

  const getCardColor = (subject:any) => {
    const char:any= subject.charAt(0);
    
    if(["A","B","C","E","F"].includes(char)) {
      return colors[0];
    } else if(["H","I","J","K","L"].includes(char)) {
      return colors[1];
    } else if(["M","N","O","P","Q"].includes(char)) {
      return colors[2];
    } else if(["R","S","T","U"].includes(char)) {
      return colors[3];
    } else if(["V","W","X","Y", "Z", "D", "G"].includes(char)) {
      return colors[4];
    }
  }

  const renderTeacherCard = () => {
    if(subjectTeacherAssociation.subjectTeachers && subjectTeacherAssociation.subjectTeachers.length > 0) {
      return subjectTeacherAssociation.subjectTeachers.map((teacher:any) => {
        return (
          <Grid item xs={12} md={6}>
            <div className={classes.card} style={{backgroundColor: getCardColor(Object.keys(teacher)[0])}}>
            <div className={classes.subject}>
              {Object.keys(teacher)[0]}
            </div>
            <div>
              {renderTeacher(teacher)}
            </div>
          </div>
          </Grid>
          
        )
      })
    }  
  }

  const renderTeacher = (row:any) => {
    const teacher = row[Object.keys(row)[0]];
    const imageUrl = teacher.picture ? teacher.picture : getProfilePicUrl();
    return (
      <div className={classes.teacher}>
        <img src={imageUrl} className={classes.image} draggable={false}></img>
        <span>{teacher}</span>
      </div>
      
    )
  }
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <strong>Subject Teachers</strong>
      </div>
    <Grid container>
     {renderTeacherCard()}
    </Grid>
    </div>
  )
}

export default TeachersCard
