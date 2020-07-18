import React, { ReactElement, useState, useEffect } from 'react';
import {useDashboardPrimaryStyles} from '../../utils/dashboradstyles';
import { Calendar } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { formUseStyles } from "../../utils/formStyles";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import {getMonth, getDay, getToday} from "../../utils/dateUtils";
import { useDispatch, useSelector } from "react-redux";
import {getTimeTable} from '../../actions/time-table-actions';
import LogworklistComponent from './logworklistComponent';
import {
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";

interface Props {
  institution:any,
  grade:any,
  section:any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      padding: 10,
      background: "#FFF",
      borderRadius: 10,
      flexDirection: "column",
      alignItems: "self-end"
    },
    date: {
      display: "flex",
      alignItems: "center",
      marginTop: 10,
      color: "#6DA0E6"
    }
  })
);

function LogWorkComponent({institution, grade, section}: Props): ReactElement {

  const dashboardClasses = useDashboardPrimaryStyles();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [selectedDay, setSelectedDay]:any = useState({day: new Date().getDate(), month: new Date().getMonth() + 1, year: new Date().getFullYear()});
  
  const [day, setDay] = useState(getToday() === 'Sunday' ? 'Monday' : getToday());
  const [toggleCalendar, setToggleCalendar] = useState(false);

  const [dayTimeTable, setDayTimeTable] = useState([]);

  const setDefaultTimeTable = () => {
    const daysTimeTable = timetable.timetable.filter((dayTimeTable:any) => {
      if(dayTimeTable[day]) {
        return dayTimeTable[day];
      }
    });
    setDayTimeTable(daysTimeTable[0][day]);
  }

  const {timetable} = useSelector((store:any) => {
    return store.gradeDashboardReducer;
  });

  useEffect(() => {
    
    if(Object.keys(timetable).length < 1 || (timetable.grade !== grade || timetable.section  !== section)) {
      //console.log("From if "+grade+" "+section+" "+Object.keys(timetable).length+" "+timetable.grade+" "+timetable.section);
      dispatch(getTimeTable(institution, grade, section));
    }
    if(Object.keys(timetable).length > 1 && (timetable.grade === grade && timetable.section === section)) {
      //console.log("From else if "+grade+" "+section+" "+Object.keys(timetable).length+" "+timetable.grade+" "+timetable.section);
  
      setDefaultTimeTable();
    }
    
/*
    else if(Object.keys(timetable).length > 1 ) {
      console.log("From else if "+grade+" "+section+" "+Object.keys(timetable).length+" "+timetable.grade+" "+timetable.section);
  
      setDefaultTimeTable();
    }*/
  },[timetable, dayTimeTable, day, grade, section]);


  const displayCalendar = () => {
    if(toggleCalendar) {
      return (
        <Calendar
            value={selectedDay}
            onChange={(e:any)=>{setToggleCalendar(false); setSelectedDay(e); updateDay()}}
            shouldHighlightWeekends
          />
      )
    } 
  }

  const updateDay = () => {
    const date = `${selectedDay.day} ${getMonth(selectedDay.month)}  ${selectedDay.year}`;
    setDay(getDay(new Date(date).getDay()));
  }

  const renderDate = () => {
    if(selectedDay) {
      const date = `${selectedDay.day} ${getMonth(selectedDay.month)}  ${selectedDay.year}`;
      return (
       <span>{selectedDay.day}, {getMonth(selectedDay.month)}, {getDay(new Date(date).getDay())}</span> 
      )
    }
  }

  const renderLogListComponent = () => {
    if(dayTimeTable.length > 0) {
      return (
        <LogworklistComponent dayTimeTable={dayTimeTable} institution={institution} 
          grade={grade} section={section} selectedDay={selectedDay}></LogworklistComponent>
      )
    }
  }
   
  return (
    <div className= {dashboardClasses.root}>
      <section className={classes.header}>
        <div>Log Book</div>
        <div className={classes.date}>
        <CalendarTodayIcon onClick={()=>{setToggleCalendar(true)}}></CalendarTodayIcon>
        {renderDate()}
        </div>
        {displayCalendar()}
      </section>
      <div>
          {renderLogListComponent()}
      </div>
    </div>
  )
}

export default LogWorkComponent
