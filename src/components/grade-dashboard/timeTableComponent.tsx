import React, { ReactElement, useState, useEffect } from 'react';
import {timeTableInitialData} from './timeTableInitialData';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from "react-redux";
import { drawerTheme, useDrawerStyles } from '../../utils/drawerStyles';
import { Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {saveTimeTable, getTimeTable, updateTeacherTimeTableOnDelete} from '../../actions/time-table-actions';
import {
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import cogoToast from 'cogo-toast';
interface Props {
  showDropDownToggle:any,
  setShowDropDownToggle:any,
  institution: any,
  grade: any,
  section: any
}



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#FFF"
    },
   tableRow: {
    minWidth: "100px",
    height: 120,
    backgroundImage: "linear-gradient(to right, gray 33%, rgba(255,255,255,0) 0%)",
    backgroundPosition: "bottom",
    backgroundSize: "10px 2px",
    backgroundRepeat: "repeat-x",  
   },
   subjectCell: {
    minWidth: 80,
    height: 80,
    display:"flex",
    alignItems: "center",
    justifyContent: "center",
    "& + span": {
      display: "none"
    },
    "&:hover" : {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)",
      borderRadius: 10,

      "& + span" : {
        display: "block",
        position: "relative",
        color: "lightblue",
        top: -30,
        left: 15,
        fontSize: 12,
        cursor: "pointer"
      }
    }
   },
   subjectDeleteAction: {
    border: "solid 1px",
    top:  200,
    maxWidth: 150,
    minHeight: 70,
    borderRadius: 10,
    margin: 20,
    alignItems: "flex-start",
    flexDirection: "column",
    padding: "10px 0 0 20px",
    display: "flex"
  },
   hoverBox: {
    /*"&:hover" : {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)",
      borderRadius: 10,
    }*/
   },
   day: {
    color: "#8288BF",
    fontWeight: "bolder"
   },
   addIcon: {
     backgroundColor: "#F8F8F8",
     borderRadius: 10,
    width: 80,
    height: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
   },
   icon: {
    color: "darkgray",
    marginLeft: 10
   },
   demo: {
     width: 50,
     heigth: 50,
     backgroundColor:"teal"
   },
   dynamicDropDown: {
      width: 180,
      backgroundColor: "white",
      position: "absolute",
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)",
      borderRadius: 10,
      textAlign: "initial",
      fontWeight: "bolder",
      display:"none"
   },
   menuItem :{
     padding: "10px 20px", 
     cursor:"pointer",
     "&:hover" : {
       backgroundColor: "#F8F8F8"
     }
   }
   
  })
);

function TimeTableComponent({showDropDownToggle,setShowDropDownToggle, institution, grade, section}: Props): ReactElement {
  const classes = useStyles();
  const drawerClass = useDrawerStyles();
  const dispatch = useDispatch();
  const top = 110;
  const left = 310;
  const [arrays, setArrays]:any = useState(timeTableInitialData);
  const header:any = arrays[0];

  const save = () => {
    dispatch(saveTimeTable(institution, grade, section, arrays.slice(1, arrays.length)));
  }

  const removeSubject = (day:any, period:any, teacher:any) => {
    const index = getDayIndex(day);
    arrays[index][day][period] = "";
    setArrays([...arrays]);
    dispatch(updateTeacherTimeTableOnDelete(institution, teacher, day, period));

  }
  const {subjectTeacherAssociation, timetable} = useSelector((store:any) => {
    return store.gradeDashboardReducer;
  });

  useEffect(() => {
    if(Object.keys(timetable).length > 1) {
      setArrays([arrays[0], ...timetable.timetable])
    } else {
      setArrays([...timeTableInitialData]);
    }
  }, [timetable])

  const {teachersPayload} = useSelector((store: any)=> {
    return store.teacherReducer;
  });


  const getTeacher = (row:any) => {
    return row[Object.keys(row)[0]];
  }

  const checkTeacherAvailability = (teacher:any, day:any, period:any) => {
    const teachersList = teachersPayload.teachers;
    const filteredTeacher:any = teachersList.filter((value:any) => value.name === teacher)
    const timeTable:any = filteredTeacher[0].timeTable;
    const dayIndex: any = getDayIndex(day);
    const grade:any = timeTable ?  timeTable[dayIndex-1][day][period] : "";
    return grade;
  }
  const subjectDropDown = () => {
      return subjectTeacherAssociation.subjectTeachers.map((value:any, index: any) => {
      return (<div key={index} className={classes.menuItem} data-subject={Object.keys(value)[0]} data-teacher= {getTeacher(value)} 
      onClick={()=>{updateAssociationFromDropDown(Object.keys(value)[0], getTeacher(value))}}>
            {Object.keys(value)[0]}
      </div>)
    }) 
  }  
  const getDayIndex = (day:any) => {
    let index = 0;
    switch(day) {
      case "Monday":
        index=1; break;
      case "Tuesday":
        index=2; break;
      case "Wednesday":
        index=3; break;
      case "Thursday":
        index=4; break;
      case "Friday":
        index=5; break;
      case "Saturday":
        index=6;break;
      
    }
    return index;
  }
  const dragover = (e:any) => {
    e.preventDefault();
  }
  const dropOver = (e:any, period:any, day:any) => {
    e.preventDefault();
    const elementId = e.dataTransfer.getData("subject_id");
    const element:any = document.getElementById(elementId);
    const subject = element.getAttribute("data-subject"),
          teacher =  element.getAttribute("data-teacher");
    const object:any  = {
      subject: subject,
      teacher: teacher
    }

    const index = getDayIndex(day);
    const occupiedGrade = checkTeacherAvailability(teacher, day, period)
    if(occupiedGrade) {
      cogoToast.error(`Teacher ${teacher} is occupied with class ${occupiedGrade}`, {position: 'top-right'})
    } else {
      const tempIndex = getDayIndex(day);
      const teacherTemp = arrays[tempIndex][day][period];
      if(teacherTemp.teacher) {
        removeSubject(day, period, teacherTemp.teacher)
      }
      arrays[index][day][period] = object;
      setArrays([...arrays]);
    }
    
  }

  const updateAssociationFromDropDown = (subject:any, teacher:any) => {
    const dropDown:any = document.getElementById("dynamicDropDown"); 
    const day:any = dropDown.getAttribute("data-day");
    const period:any= dropDown.getAttribute("data-period");
    const object:any  = {
      subject: subject,
      teacher: teacher
    }
    const index = getDayIndex(day);
    const occupiedGrade = checkTeacherAvailability(teacher, day, period);
    if(occupiedGrade) {
      cogoToast.error(`Teacher ${teacher} is occupied with class ${occupiedGrade}`, {position: 'top-right'})
    } else {
      const tempIndex = getDayIndex(day);
      const teacherTemp = arrays[tempIndex][day][period];
      if(teacherTemp.teacher) {
        removeSubject(day, period, teacherTemp.teacher)
      }
      arrays[index][day][period] = object;
      setArrays([...arrays]);
    }
    setShowDropDownToggle(false);
  }

  const showDropDown =(day:any, index:any) => {
    setShowDropDownToggle(true);
    const dayIndex:any = getDayIndex(day);
    setTimeout(()=>{
      const dropDown:any = document.getElementById("dynamicDropDown");
      dropDown.style.top = `${top + (120 * dayIndex) }px`;
      dropDown.style.left = `${left + (100*index)}px`;
      dropDown.style.display="block";
      dropDown.setAttribute("data-day", day);
      dropDown.setAttribute("data-period", index);
    },10)
  }

  const applyAddIcon = (day:any, index:any) => {
    return (
      <div className={classes.addIcon}>
        <AddIcon className={classes.icon} onClick={()=>{showDropDown(day ,index)}}></AddIcon>
      </div>
    )
  }

  const tableRowsClasses = (value?:any) => {
    const hoverClass = `${classes.hoverBox}`;
    return `${classes.subjectCell} ` + hoverClass;
  }

  const subjectCell = (day:any, index:any, value:any) => {

    return (
        <div>
          <div className={tableRowsClasses()}>
          {value.subject}
          </div>
          <span onClick={()=> {removeSubject(day, index, value.teacher)}}>remove</span>
        </div>
          
    )
  }
  const displayHeaders = header.period.map((value:any, index:any) => {
    return (
      <th className={classes.tableRow}>{value}</th>
    )
  })

  
  const setTimeTable = (day:any) => {
    const d:any= getDayIndex(day);
      return arrays[d][day].map((value: any, index: any) => {
        return (
          <th className={classes.tableRow} 
          data-day={day} 
          data-period={index}
          onDrop={(e) =>dropOver(e, index, day)}
          onDragOver= {(e)=>dragover(e)}>{value.subject ? subjectCell(day, index, value) : applyAddIcon(day, index)}</th>
        )
      })
  }

  return (
    <div id="time-table" className={classes.root}>
      {(Object.keys(subjectTeacherAssociation).length > 0) && showDropDownToggle ? 
      <div id="dynamicDropDown" className={classes.dynamicDropDown}>{subjectDropDown()}</div> : ""}
      <table>
        <tr>
          <th className={classes.tableRow}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={drawerClass.button}
            onClick={save}
            >
              Save
          </Button>
          </th>
          {displayHeaders}
        </tr>
        <tr>
          <td className={classes.tableRow + " " + classes.day}>Monday</td>
          {setTimeTable("Monday")}
        </tr>
        <tr>
          <td className={classes.tableRow + " " + classes.day}>Tuesday</td>
          {setTimeTable("Tuesday")}
        </tr>
        <tr>
          <td className={classes.tableRow + " " + classes.day}>Wednesday</td>
          {setTimeTable("Wednesday")}
        </tr>
        <tr>
          <td className={classes.tableRow + " " + classes.day}>Thursday</td>
          {setTimeTable("Thursday")}
        </tr>
        <tr>
          <td className={classes.tableRow + " " + classes.day}>Friday</td>
          {setTimeTable("Friday")}
        </tr>
        <tr>
          <td className={classes.tableRow + " " + classes.day}>Saturday</td>
          {setTimeTable("Saturday")}
        </tr>
      </table>
    </div>
  )
}

export default TimeTableComponent
