import React, { ReactElement, useEffect, useState } from 'react';
import TimeOffListComponent from './timeOffListComponent';
import {
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import {useSelector, useDispatch} from "react-redux";

import {getAttendanceStudentsName, getAttendance} from "../../../actions/attendance-actions";
import SelectGradeOptions from "./selectGradeOptions";
import { toStatement } from '@babel/types';
interface Props {
  
}

function ViewLeaveComponent({}: Props): ReactElement {
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)"
    },
  })
);

const indexOfMonth = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

const dispatch = useDispatch();
const classes = useStyles();

const {institution} = useSelector((store:any) => {
  return store.loginReducer
});

const {names, attendance, dataLoading} = useSelector((store:any) => {
  return store.attendanceReducer
});
const [dates, setDates] = useState([]);

const[data, setData] = useState([]);

const [monthAndYear, setMonthAndYear] = useState({
  currentMonth: new Date().toString().split(" ")[1],
  currentYear: Number(new Date().toString().split(" ")[3]),
  changeMonth: false
});

const months = ["JANUARY", "FEBURUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",];

const [formData, setFormData] = useState({
  monthIndex: indexOfMonth.indexOf(monthAndYear.currentMonth),
  grade: '',
  section: ''
});

const fetchAttendance = (formData:any) => {
  setFormData(formData);
  dispatch(getAttendance(institution, formData.grade, formData.section, monthAndYear.currentMonth, monthAndYear.currentYear));
  setMonthAndYear({
    currentMonth: monthAndYear.currentMonth,
    currentYear: monthAndYear.currentYear,
    changeMonth: false
  });
}


useEffect(()=>{
  if(!dataLoading) {
    generateDates(months.indexOf(monthAndYear.currentMonth) > 0 ? 
    months.indexOf(monthAndYear.currentMonth) : months.indexOf("JUNE"));
    genetateData();
  }

  if(dataLoading) {
    setData([]);
    setDates([]);
  }

  if(monthAndYear.changeMonth) {
    fetchAttendance(formData);
  }


},[dataLoading, formData, monthAndYear])

const updateMonth = (month:any, year:any) => {
  setMonthAndYear({
    currentMonth: month,
    currentYear: year,
    changeMonth: true
  });
}

const generateDates = (monthIndex: any) => {
  let dates:any = [];
  for(let i=1; i<=new Date(2020, monthIndex + 1, 0).getDate(); i++ ){
    switch (new Date(2020, monthIndex, i).getDay()){
       case 0:
        dates.push(i+ " SUN");
        break;
       case 1:
        dates.push(i+ " MON");
        break;
        case 2:
        dates.push(i+ " TUE");
        break;
        case 3:
        dates.push(i+ " WED");
        break;
        case 4:
        dates.push(i+ " THR");
        break;
        case 5:
        dates.push(i+ " FRI");
        break;
        case 6:
        dates.push(i+ " SAT");
        break;
    }
  
  }

    setDates(dates);
 
}



const genetateData = () => {
  const rowData:any = []
  for(let i=0; i<names.length; i++){
    let obj:any = {
      name: names[i],
      count: 0
    }
      dates.forEach((value:any)=>{
        const date:any = value.split(" ");
        Object.assign(obj, {
          [value]: findAbsence(obj.name, date[0]),
          count: findAbsence(obj.name, date[0]) ? obj.count + 1 : obj.count
        })
    });
    rowData.push(obj);
  }
  setData(rowData);
}

const findAbsence = (name:any, date:any) => {
  let absence = false;
  for(var i=0; i< attendance.length; i++){
    if(attendance[i].name == name && date === (attendance[i].date)) {
      absence = true;
      break;
    }
  }
  return absence;
}

const check =  () =>{
  if(dates.length > 1   && !dataLoading && data.length > 1){
    // let currentMonth:any = new Date().toString().split(" ")[1];
    // let currentYear:any = Number(new Date().toString().split(" ")[3]);
    return <TimeOffListComponent names={names} attendance={attendance} dates={dates} dataRows={data} currentMonth={monthAndYear.currentMonth} 
    currentYear={monthAndYear.currentYear} updateMonth={updateMonth}/> 
  }
}

  return ( 
    <div className={classes.root}>
      <SelectGradeOptions callBack={fetchAttendance}></SelectGradeOptions>
      {check()}
    </div>
  )
}

export default ViewLeaveComponent
