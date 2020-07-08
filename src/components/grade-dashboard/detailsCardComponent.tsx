import React, { ReactElement } from 'react'
import {
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import getProfilePicUrl from './../../utils/randomProfilePicGenerator'
interface Props {
  gradeDetails:any
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "left",
      alignItems: "baseline",
      padding: 15,
      background: "#3C4059",
      borderRadius: 10,
      color: "#F7F8F5",
      fontWeight: 800,
    },
    teacherDetails  :{
      display: "flex",
      alignItems: "center"
    },
    classDetails: {
      fontSize: 20,
      marginBottom: 10
    },
    label: {
      color: "#A1A5B5",
      marginBottom: 10,
      fontSize: 10
    }
  })
);

function DetailsCardComponent({gradeDetails}: Props): ReactElement {
  const classes = useStyles();
  const imgurl = getProfilePicUrl();
  return (
    <div className={classes.root}>
      <span className={classes.classDetails}>{gradeDetails.grade} - {gradeDetails.section}</span>
      <span className={classes.label}>CLASS TEACHER</span>
      <div className={classes.teacherDetails}>
      <img src={imgurl} width='30px' height='30px' style={{borderRadius: "50%", marginRight: "15px"}}/>
      <span>{gradeDetails.teacher}</span>
      </div>
    </div>
  )
}

export default DetailsCardComponent
