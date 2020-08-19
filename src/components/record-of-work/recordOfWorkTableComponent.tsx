import React, { ReactElement, useState } from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import RecordOfWorkDrawer from "./recordOfWorkDrawer";
import { Drawer } from '@material-ui/core';
import { drawerTheme, useDrawerStyles } from '../../utils/drawerStyles';
import {monthlyRecordOfWork} from "../../constants/monthlyRecordOfWork";

interface Props {
  setMonths:any,
  months:any,
  saveRecordOfWork:any,
  setSave:any,
  constructAndSaveRecordOfWork:any
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      width: "100%",
      backgroundColor: "#FFF"
    },
    tableHeader: {
      display: "flex",
      justifyContent:"space-around"
    },
    row: {
      height: 60
    },
    month:{
      color:"#8288BF"
    },
    edit:{
      position: "relative",
      left: "30%",
      fontSize: 12,
      cursor: "pointer",
      color:"#5993E9"
    },
    tableHorizonal: {
    backgroundImage: "linear-gradient(to right, gray 33%, rgba(255,255,255,0) 0%)",
    backgroundPosition: "bottom",
    backgroundSize: "10px 1px",
    backgroundRepeat: "repeat-x",  
    width: "16%",
    fontWeight: "bolder"
    },
    addContainer: {
      backgroundColor: "#F5F6F8",
      height: 60,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      margin: "10px auto",
      width: "70px",
      "& > svg": {
        margin: 0
      }
    },
  })
);

function RecordOfWorkTableComponent({setMonths, months, saveRecordOfWork, setSave, constructAndSaveRecordOfWork}: Props): ReactElement {
  const classes  = useStyles()
  const borderClass = `${classes.tableHorizonal}`;
  const [drawerWeek, setDrawerWeek] = useState("");
  const [drawerMonth, setDrawerMonth] = useState("");
  const [work, setWork] = useState("");
  const [week, setWeek]:any = useState(["", "Week 1", "Week 2", "Week 3", "Week 4", "Week 5"])
  const [addRecordOfWorkDrawer, setAddRecordOfWorkDrawer] = useState(false);
  const addRecordOfWork = (month:any, week:any, workForm:any) => {
    const monthWork = months.filter((value:any) =>  Object.keys(value)[0] === month);
    const weekWork = monthWork[0][month].map((value:any) =>  {
      const weekName = Object.keys(value)[0];
      if(weekName=== week){
       return {[weekName]: workForm.work};
    } else {
      return {[weekName]: value[weekName]};
    }
  });
  monthWork[0][month] = weekWork;
  const tempMonths = months.map((value:any)=>{
    const monthName = Object.keys(value)[0] 
    if(monthName=== month) {
      return {[monthName]: weekWork}
    }else {
      return {[monthName]: value[monthName]}
    }
  });
  setMonths(tempMonths);
  setSave(true);
  //updateMonth(tempMonths);
    
  }
  const getHeader = () => {
    return week.map((week: any, index:any) => {
      return (
        <th data-week={week} data-week-index={index} className={borderClass}>
          <span className={classes.month}>{week}</span>
        </th>
      )
    })
  }

  const openDrawer = ( weekName:any, monthName:any, work?:any) => {
    setDrawerWeek(weekName);
    setDrawerMonth(monthName);
    if(work) setWork(work);
    setAddRecordOfWorkDrawer(true);
  }

  const renderData = (work:any, weekName:any, monthName:any) => {
    if(work) {
      return (<div>
        <div className={classes.edit} onClick={()=>{openDrawer(weekName, monthName, work)}}>edit</div>
        <div>{work}</div>
      </div>)
    }
    else {
      return (
        <div className={classes.addContainer}>
          <AddIcon onClick={()=>{openDrawer(weekName, monthName)}}></AddIcon>
        </div>
      )
    }
  }

  const getWork = (month:any, monthName:any) => {
    return month.map((week:any, index:any)=>{
      const weekName:any =  "Week " + (index + 1);
      const work:any = week[weekName]; 
      return (
        <td className={borderClass}>
          {renderData(work ,weekName, monthName)}
        </td>
      )
    })
  }

  const getRows = () => {
    return months.map((month:any, index:any) => {
      const monthName = Object.keys(month)[0];
      return(
       <tr className={classes.row}>
         <td className={borderClass}><span className={classes.month}>{monthName}</span></td>
         {getWork(months[index][monthName], monthName)}
       </tr>
      )
    })
  }
  return (
    <div>
       <table className={classes.table}>
         <tr className={classes.row}>
           {getHeader()}
         </tr>
          {getRows()}
       </table>
       <ThemeProvider theme={drawerTheme}>
       <Drawer
        open={addRecordOfWorkDrawer}
        onClose = {()=>{setAddRecordOfWorkDrawer(false)}}
        anchor= 'right' 
        elevation = {20}
       >
         <RecordOfWorkDrawer week={drawerWeek} month={drawerMonth} setAddRecordOfWorkDrawer={setAddRecordOfWorkDrawer} addRecordOfWork={addRecordOfWork} work={work} constructAndSaveRecordOfWork={constructAndSaveRecordOfWork} setWork={setWork}></RecordOfWorkDrawer>
       </Drawer>
       </ThemeProvider>
    </div>
  )
}

export default RecordOfWorkTableComponent
