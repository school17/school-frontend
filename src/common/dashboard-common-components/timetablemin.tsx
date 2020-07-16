import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getTimeTable} from '../../actions/time-table-actions';
import {useDashboardPrimaryStyles} from '../../utils/dashboradstyles';
import DoneIcon from '@material-ui/icons/Done';
import Grow from '@material-ui/core/Grow';
import {getToday} from "../../utils/dateUtils";
import { Drawer } from '@material-ui/core';
import TimeTableBaseComponent from "../../components/grade-dashboard/timeTableBaseComponent";

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
    header: {
      display: "flex",
      justifyContent: "space-between",
      padding: "5px 10px",
      backgroundColor: "#FFF",
      borderRadius: 7,
    },
    period: {
      display: "flex",
      padding: "5px 10px",
      "&div:nth-of-type(1)" : {
        marginTop: 10
      }
    },
    periodIndex: {
      background: "#D3D3D3",
      borderRadius: "50%",
      width: "20px",
      height: "20px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "10px"
    },
    daySelector: {
      position: "absolute",
      backgroundColor: "#3C4059",
      padding: "10px 20px",
      textAlign: "left",
      color: "#FFF",
      minWidth: 150,
      borderRadius: 10,
      //boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)"
      boxShadow: "0 0 4px 0 rgba(0,0,0,.1), 0 1px 20px 0 rgba(0,0,0,.2)",
    },
    day: {
      paddingTop: 10,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& > svg" : {
        fontSize: "1rem"
      }
    }
  })
);

function Timetablemin({institution, grade, section}: Props): ReactElement {
  const getDay = () => {
    let day = ""
    switch (new Date().getDay()) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
    }

    return day;
  }
  const dispatch = useDispatch();

  const [dayTimeTable, setDayTimeTable] = useState([])

  const dashboardClasses = useDashboardPrimaryStyles();

  const [toggleDaySelector, setToggleDaySelector] = useState(false);

  const [openTimeTable, setOpenTimeTable] = useState(false);

  const [selectedDay, setSelectedDay] = useState(getToday() === 'Sunday' ? 'Monday' : getToday());

  const [isupdating, setIsUpdating] = useState(false);

  const classes = useStyles();

  const {timetable} = useSelector((store:any) => {
    return store.gradeDashboardReducer;
  });

  const periods = () => {
    return dayTimeTable.map((period:any, index:any)=> {
      return (
        <div className={classes.period}>
          <span className={classes.periodIndex}>{index + 1}</span>
          <span >{period.subject}</span>
        </div>
        
      )
    })
  }

  const daySelector = () => {
    if(toggleDaySelector) {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      return (<div id="time-table-day-selector" className={classes.daySelector}>
         {days.map((day: any, index:any) => {
          return(<div className={classes.day} onClick={()=>{selectDayTimeTable(day)}}  key={index}>
          <span>{day}</span>
          {day == selectedDay ? <DoneIcon></DoneIcon> : ''}
          </div>)
         })}
      </div>)
    
    }  
  }

  const selectDayTimeTable = (day:any) => {
    setSelectedDay(day);
    openDaySelector();
    //setDefaultTimeTable();
  }

  const openDaySelector = () => {
    if(toggleDaySelector) {
      setToggleDaySelector(false);
    }
    else {
      setToggleDaySelector(true);
    }

  }

  const setDefaultTimeTable = () => {
    const daysTimeTable = timetable.timetable.filter((day:any) => {
      if(day[selectedDay]) {
        return day[selectedDay];
      }
    });
    setDayTimeTable(daysTimeTable[0][selectedDay]);
  }
  useEffect(() => {
    if(Object.keys(timetable).length < 1 || (timetable.grade !== grade || timetable.section !== section)) {
      dispatch(getTimeTable(institution, grade, section));
    }
    else {
      setDefaultTimeTable();
    }
  },[timetable, dayTimeTable, selectedDay, grade, section]);
  return (
    <div className= {dashboardClasses.root}>
      <div>
        <div className={classes.header}>
          <span>Time Table</span>
          <span className={dashboardClasses.action} onClick={()=>setOpenTimeTable(true)}> Edit </span>
        </div>
        <div className={classes.header}>
          <span  className={dashboardClasses.action} onClick={openDaySelector}> {selectedDay}</span>
        </div>{daySelector()}
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
         {...({ timeout: 1000 })}
        >
          <div style={{marginTop: 10}}>
            {periods()}
          </div>
        </Grow>   
      </div>
      <Drawer
        open={openTimeTable}
        onClose={()=>setOpenTimeTable(false)}
        anchor='right'
      >
        <TimeTableBaseComponent institution= {institution} grade= {grade} section={section}></TimeTableBaseComponent>
      </Drawer>
    </div>
  )
}

export default Timetablemin
