import React, { ReactElement, useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import {
  Link
} from "react-router-dom";
import ExamIcon from "./../../../svg/ExamIcon.svg";
import studentIcon from "../../svg/student.svg";
import teacherIcon from "../../svg/teacher.svg";
import notificationIcon from "../../svg/notification.svg";
import timeoffIcon from "../../svg/timeoff.svg";
import classRoomIcon from "../../svg/classroom.svg";
import Grid from "@material-ui/core/Grid";
import AddExamDrawer from "./addExamDrawer";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)"
    },
    date: {
      display: "flex",
      alignItems: "center",
      marginTop: "10px",
      color: "#6DA0E6",
      marginLeft: "10px",
      marginBottom: "20px"
    },
    alingText: {
      textAlign: "initial",
      fontSize: 18,
      display: "flex",
      flexDirection: "column",
      marginBottom: 20,
      borderBottom: "dashed 1px lightgrey",
      paddingBottom: 10,
    },
    desc: {
      fontSize: 12,
      color: "lightgrey",
      marginTop: 10
    },
    container: {
      padding: 20,
      fontWeight: "bold"
    },
    actions: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& > svg": {
        color: "#000fff",
        marginLeft: "50%",
        position: "relative",
        top: "-60px",
        left: "90%"
      }
    },
    imageIcons: {
      width: 50,
      height: 50,
      borderRadius: "50%"
    },
    calendar: {
      position: "relative",
    fontSize: 14,
    fontWeight: "bold",
    borderRadius: 4,
    backgroundColor: "#F5F6F8",
    padding: 15,
    border: "none",
    textAlign: "left",
    width: "90%",
    },
    iconContainer: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      margin:"15px 0px",
      color: "#5993E9",
      "& > span": {
        marginLeft: 10,
        fontSize: 12
      }
    }
  })
);

function AdminActionsComponent({  }: Props): ReactElement {
  const classes = useStyles();
  const [openExamDrawer, setOpenExamDrawer] = useState(false);
  return (
    <div className={classes.container}>
    <div className={classes.alingText}>
    <span>Admin Settings</span>
    <span className={classes.desc}>All setting related to your institution</span>
    </div>
  
      <Grid container>
        <Grid  item xs={4} md={3}>
        <div className={classes.iconContainer}>
            <img
            className={classes.imageIcons}
            src={ExamIcon}
            onClick={() => {
              setOpenExamDrawer(true);
            }}
          />
          <span>Add Exams</span>
        </div>
        </Grid>
        <Grid  item xs={4} md={3}>
        <Link className={classes.iconContainer} to="/students-management">
        <img
        className={classes.imageIcons}
        src={studentIcon}
      />
       <span>Manage Students</span>
      </Link>
        </Grid>
        <Grid  item xs={4} md={3}>
        <Link className={classes.iconContainer} to="/teachers">
        <img
        className={classes.imageIcons}
        src={teacherIcon}
      />
       <span>Manage Teachers</span>
      </Link>
        </Grid>

        <Grid  item xs={4} md={3}>
        <div className={classes.iconContainer}>
        <img
        className={classes.imageIcons}
        src={notificationIcon}
      />
      <span>Add Notification</span>
      </div>
        </Grid>
         <Grid  item xs={4} md={3}>
        <Link className={classes.iconContainer} to="/class">
        <img
        className={classes.imageIcons}
        src={classRoomIcon}
      />
       <span>Manage Class room</span>
      </Link>
        </Grid>

         <Grid  item xs={4} md={3}>
        <Link className={classes.iconContainer} to="/view-leaves">
        <img
        className={classes.imageIcons}
        src={timeoffIcon}
      />
       <span>View Leaves</span>
      </Link>
        </Grid>
      </Grid>
      <AddExamDrawer openDrawer={openExamDrawer} setOpenDrawer={setOpenExamDrawer}></AddExamDrawer>
    </div>
  );
}
export default AdminActionsComponent;