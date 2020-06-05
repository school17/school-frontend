import React, { ReactElement, useEffect, useState } from 'react';
import namor from 'namor'
import {
  useTable,
  usePagination,
  TableOptions
} from 'react-table';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  MuiThemeProvider,
  ThemeProvider
} from "@material-ui/core/styles";
import {tableRowTheme} from '../../../utils/attendanceTableStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import funnel from "../../../svg/funnel.svg";

import {useDispatch} from "react-redux";
interface Props {
  names:any,
  attendance: any,
  dates: any,
  dataRows:any
  currentMonth:any,
  currentYear:number,
  updateMonth: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableWrapper: {
      maxHeight: 580,
      overflow: "auto",
      "&:webkit-scrollbar": {
        display: 'none'
      }
    },
    pagination: {
      display: 'flex',
      padding: '30px',
      justifyContent: 'center',
      alignItems: 'center'
    },
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    arrowButton: {
    },
    monthButton: {
      marginLeft: "5px",
      marginRight: "5px",
      cursor: "default",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "transparent"
      }
    },
    holiday: {
      color: "lightgray"
    },
    filterparent: {
    minWidth: "24px",
    maxWidth: "24px",
    display: "flex",
    flexDirection: "column",
      "&:hover" :{
        "& span":{
          display: 'none'
        },
        "& img": {
          display: "block"
        }
      },
      "& img" :{
        left: "6px",
        width: "15px",
        height: "23px",
        display:"none",
        position: "relative",
        color:"orange",
        marginRight: 0,
      },
      "& span" :{
        marginLeft: "2px"
      }
    },
  })
  );

function TimeOffListComponent({names, attendance, dates, dataRows, currentMonth, currentYear, updateMonth}: Props): ReactElement {
  const classes = useStyles();

  const months = ["JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER", "JANUARY", "FEBURUARY", "MARCH", "APRIL", "MAY"];
  const acedamicHalves = {
    firstHalfYear: (months.indexOf(currentMonth) < 7) ? currentYear : Number(currentYear-1),
    secondHalfYear: (months.indexOf(currentMonth) >= 7) ? currentYear : Number(currentYear+1),
  }
  const [data, setTableData] = useState(dataRows);
  const [tableHeaders, setTableheaders] = useState(dates);

  const getPrevMonth = (ev:any) => {
    let monthButtonValue:any = document.getElementById("monthButton");
    let buttonMonth = monthButtonValue.value.split(" ")[0];
    const buttonYear = monthButtonValue.value.split(" ")[1];
    let monthIndex = months.indexOf(buttonMonth);
    let prevIndex = monthIndex-1;
    if(monthIndex > 0){
      currentMonth = months[prevIndex];
      currentYear = (prevIndex < 7) ? acedamicHalves.firstHalfYear : acedamicHalves.secondHalfYear;
      monthButtonValue.value = `${currentMonth} ${currentYear}`;
      monthButtonValue.innerText = `${currentMonth} ${currentYear}`;
    }else{
      currentMonth = months[monthIndex];
      currentYear = buttonYear;
      monthButtonValue.value = `${currentMonth} ${currentYear}`;
      monthButtonValue.innerText = `${currentMonth} ${currentYear}`;
    }

    updateMonth(currentMonth, currentYear);
  }

  const getNextMonth = (ev:any) => {
    let monthButtonValue:any = document.getElementById("monthButton");
    let buttonMonth = monthButtonValue.value.split(" ")[0];
    const buttonYear = monthButtonValue.value.split(" ")[1];
    let monthIndex = months.indexOf(buttonMonth);
    let nextIndex = monthIndex+1;
    if(monthIndex < months.length-1){
      currentMonth = months[nextIndex];
      currentYear = (nextIndex < 7) ? acedamicHalves.firstHalfYear : acedamicHalves.secondHalfYear;
      monthButtonValue.value = `${currentMonth} ${currentYear}`;
      monthButtonValue.innerText = `${currentMonth} ${currentYear}`;
    }else{
      currentMonth = months[monthIndex];
      currentYear = buttonYear;
      monthButtonValue.value = `${currentMonth} ${currentYear}`;
      monthButtonValue.innerText = `${currentMonth} ${currentYear}`;
    }

    updateMonth(currentMonth, currentYear);
  }

  const filter = (value?:any) => {
    const filteredData = data.filter((d:any) => {
      const searchString: any  = `"${value.split(" ")[0]} ${value.split(" ")[1]}":true`;
      return JSON.stringify(d).includes(searchString);
    });
    setTableData(filteredData);
  }

  const buttonMonthGroup = () => {return(<div className={classes.root}>
                                          <Button style={{maxWidth: '30px', minWidth: '15px', marginLeft: '10%', backgroundColor: "#F5F6F8"}} variant="outlined" className={classes.arrowButton} onClick={getPrevMonth}>
                                            <ArrowLeftIcon style={{marginLeft: "10px"}}/>
                                          </Button>
                                          <Button style={{maxWidth: '70%', minWidth: '50%', backgroundColor: "#F5F6F8", fontSize: "10px", fontWeight: "bolder",padding: "9px 0px"}} id="monthButton" variant="outlined" className={classes.monthButton} value={`${currentMonth} ${currentYear}`} disableRipple>{`${currentMonth} ${currentYear}`}</Button>
                                          <Button style={{maxWidth: '30px', minWidth: '15px', backgroundColor: "#F5F6F8"}} variant="outlined" className={classes.arrowButton} onClick={getNextMonth}>
                                            <ArrowRightIcon style={{marginLeft: "10px"}}/>
                                          </Button>
                                        </div>);
                                }                            
  useEffect(()=>{
    /*if(dates.length > 0) {
      setTableheaders(dates)
    }

    if(data.length > 0) {
      setTableData(dataRows);
    }*/
  },[dates, data])

  

  const columns = React.useMemo(()=>{
    const defineColumns:any = [];
    defineColumns.push({
      Header: buttonMonthGroup(),
      accessor: 'name',
      Cell: (row:any) =>{
        const url:any = row.data[row.row.id].user.picture ?  row.data[row.row.id].user.picture : 'http://getdrawings.com/free-icon/teacher-icon-69.png'
        const count:any =  row.data[row.row.id].count; 
        return <div style={{display: 'flex', alignItems:'center', minWidth:"150px", justifyContent: "space-between"}}>
          <img src={url} width='30px' height='30px' style={{borderRadius: "50%", margin: "0px 5px"}}/>
          <div style={{fontWeight: 500, marginLeft:"5px"}}><span>{row.data[row.row.id].user.name}</span></div>
          <div style={{
    width: "25px",
    height: "25px",
    borderRadius: "30%",
    backgroundColor: "rgb(171, 247, 255)",
    display: "flex",
    fontWeight:"bolder",
    alignItems: "center",
    justifyContent: "center"}}><span>{count}</span></div>
        </div> 
      }
    })
    tableHeaders.forEach((value:any,key:any)=>{
      defineColumns.push({
          Header: <div className = {value.includes("SUN") ? classes.holiday : ""}>
                    <div>{value.split(" ")[0]}</div>
                    <div className={classes.filterparent}><span>{value.split(" ")[1]}</span>
                    <img src={funnel} onClick={()=>filter(value)}></img>
                    </div>
                  </div>,
          accessor: value,
          Cell: (row:any) => {
            let attendance = row.data[row.row.id];
            return attendance[value] ? <div style={{width: "15px", height: "15px", borderRadius:"50%", backgroundColor:"#0F1727", margin:"auto"}}></div> : ''
          }
      }); 
    });
    return defineColumns;
  },[]);

  const {
    getTableProps, headerGroups, rows, prepareRow, getTableBodyProps,
   
    page,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      pageCount: 1,
      initialState: { pageIndex: 0}
    },
    usePagination
  )

  
  return (
    <MuiThemeProvider theme= {tableRowTheme}>
      <div>
      <div className ={classes.tableWrapper}>
      <MaUTable {...getTableProps()} stickyHeader>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell:any) => {
                return ( 
                  <TableCell {...cell.getCellProps()}>
                  {cell.render('Cell')}
                  </TableCell>
               )
              })}
            </TableRow>
          )
        })}
      </TableBody>
      </MaUTable>
    </div>
    </div>
    </MuiThemeProvider>
  )
}

export default TimeOffListComponent
