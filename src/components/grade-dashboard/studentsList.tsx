import React, { ReactElement, useEffect } from 'react'
import {getStudents} from "../../actions/grade-dashboard-actions";
import { useDispatch, useSelector } from "react-redux";
import getProfilePicUrl from './../../utils/randomProfilePicGenerator'
import {
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
interface Props {
  institution:any,
  grade:any,
  section: any,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)",
      float: "left",
      width: "100%",
      padding: 20,
      fontWeight: 800,
      borderRadius: 10
    },
    header: {
      textAlign: "initial"
    },
    items: {
      display:"flex",
      alignItems: "center",
      
    },
    image: {
      flex: "0 0 2rem",
      marginRight: 25,
    },
    rollNo: {
      flex: "0 0 5rem",
      textAlign: "inherit"
    },
    name: {
      flex: "0 0 15rem",
      textAlign: "initial",
      marginLeft: 10
    },
    evenRow: {
      backgroundColor: "#F5F5F5",
      borderRadius: 10
    },
    content: {
      display: "flex",
      width: "100%",
      padding: 10,
      justifyContent: "space-around"
    },
    rowHeader: {
      color: "#9C9BA4"
    },
    rows: {
      marginLeft: 5
    }
  })
);

function StudentsList({institution, grade, section}: Props): ReactElement {
  const dispatch = useDispatch();
  const classes = useStyles();

  const {studentsList} = useSelector((store:any) => {
    return store.gradeDashboardReducer;
  });

  const displayStudentsRow = () => {
    return (
      studentsList.map((student:any, index:any) => {
        const rowClassName = ` ${classes.content} `  + `${classes.rows}`+   (index %2 == 0 ? ` ${classes.evenRow}` : ``)
        const imageUrl = student.picture ? student.picture : getProfilePicUrl();
        return (
          <div className={classes.items}>
            <img className={classes.image} src={imageUrl} width='30px' height='30px' style={{borderRadius: "50%", marginRight: "15px"}}/>
            <div className={rowClassName}>
              <span className={classes.rollNo}>1102{index + 1}</span>
              <span className={classes.name}>{student.name}</span>
            </div>
          </div>
        )
      })
    )
  }


  useEffect(() => {
    dispatch(getStudents(institution,  grade, section))

  }, [])
  return (
    <div className={classes.root}>
      <div className={classes.header}>STUDENTS</div>
      <div className={classes.items + " " + classes.rowHeader}>
        <span className={classes.image}>ID</span>
        <div className={classes.content}>
          <span className={classes.rollNo}>ROLL NO.</span>
          <span className={classes.name}>NAME</span>
        </div>
        
      </div>
      {studentsList.length > 0 ? displayStudentsRow(): "NO IT DOES NOT"}
    </div>
    
  )
}

export default StudentsList
