import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getSubjectTeacherAssociation} from "../../actions/grade-dashboard-actions";
import {fetchTeacher} from '../../actions/teacher-action';
import AddSubjectTeacherAssociationDrawer from "./addSubjectTeacherAssociationDrawer";
import { drawerTheme, useDrawerStyles } from '../../utils/drawerStyles';
import { Button } from "@material-ui/core";
import {
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
interface Props {
  institution:any,
  grade:any,
  section: any,
  showDropDownToggle:any,
  setShowDropDownToggle:any
}

const colors = ["#3C4059", "#939938", "#806337", "#CE655F", "#4755BF"]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)",
     
    },

    container : {
      backgroundColor: "#F8F8F8"
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
      maxWidth: 150,
      minHeight: 70,
      borderRadius: 10,
      margin: 20,
      alignItems: "flex-start",
      flexDirection: "column",
      padding: "10px 0 0 20px",
      cursor: "pointer"
    },

    subject: {
    color: "white",
    fontWeight: "bolder"
    },

    header: {
      flexGrow: 1,
    },
    image: {
      width:20,
      height:20,
      marginRight: 5
    },
    teacher: {
      display: "flex",
      alignItems: "center",
      fontSize:14,
      color: "white",
      marginTop: 5
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      paddingRight: 20
    }
  })
);

function TimeTableTeacherList({institution, grade, section,  showDropDownToggle, setShowDropDownToggle}: Props): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const drawerClass = useDrawerStyles();
  const {subjectTeacherAssociation} = useSelector((store:any) => {
    return store.gradeDashboardReducer;
  });
  const [openDrawer, toggleOpenDrawer] = useState(false);
  const clicked = () => {
    if(openDrawer) toggleOpenDrawer(false);
    else toggleOpenDrawer(true);
  }

  const renderTeacher = (row:any) => {
    const teacher = row[Object.keys(row)[0]];
    return (
      <div className={classes.teacher}>
        <img src={`http://getdrawings.com/free-icon/teacher-icon-69.png`} className={classes.image} draggable={false}></img>
        <span>{teacher}</span>
      </div>
      
    )
  }

  const getTeacher = (row:any) => {
    return row[Object.keys(row)[0]];
  }

  const dragStart = (e:any) => {
    const target:any = e.target;
    e.dataTransfer.setData('subject_id', target.id);
  }

  const onDragOver = (e:any) => {
    e.stopPropagation();
  }

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

  const removeDynamicDropDown = () => {
    setShowDropDownToggle(false);
  }

  const renderNotAvailable = () => {
    return (
      <strong>To Set the time table, add subjects and teachers</strong>
    )
  }

  const renderTeacherCard = () => {
    return subjectTeacherAssociation.subjectTeachers.map((teacher:any) => {
      return (
        <div className={classes.card} style={{backgroundColor: getCardColor(Object.keys(teacher)[0])}}
          id = {Object.keys(teacher)[0]}
          draggable={true} 
          onDragStart={dragStart}
          onDragOver = {onDragOver}
          data-subject = {Object.keys(teacher)[0]}
          data-teacher = {getTeacher(teacher)}
          onClick={removeDynamicDropDown}
        >
          <div className={classes.subject}>
            {Object.keys(teacher)[0]}
          </div>
          <div>
            {renderTeacher(teacher)}
          </div>
        </div>
      )
    })
    
  }



  
  const searchQuery = {
    pageNumber: 0,
    pageSize: 100
  }
  useEffect(() => {
    dispatch(fetchTeacher(institution, searchQuery, {}));
    dispatch(getSubjectTeacherAssociation(institution,  grade, section))

  }, [grade, section])
  return (
    <div className={classes.container}>
        <div className={classes.classDetails}>
          <div className={classes.buttonContainer}>
          <div>{grade} - {section}</div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={drawerClass.button}
            onClick={clicked}
            >
              {Object.keys(subjectTeacherAssociation).length > 0 ? "Edit" : "Add"}
          </Button>
          </div>
          <div className={classes.subjectHeader}>Subjects</div>
          
        </div>
       

      {(Object.keys(subjectTeacherAssociation).length > 0) ? renderTeacherCard() : renderNotAvailable()}
      <AddSubjectTeacherAssociationDrawer openDrawer = {openDrawer} callBack={clicked} drawerClass={drawerClass} addedAssociation={subjectTeacherAssociation.subjectTeachers}></AddSubjectTeacherAssociationDrawer>
    </div>
  )
}

export default TimeTableTeacherList

