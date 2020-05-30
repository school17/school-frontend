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
import {useDispatch} from "react-redux";
interface Props {
  names:any,
  attendance: any,
  dates: any,
  dataRows:any
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
    }
  })
  )


function TimeOffListComponent({names, attendance, dates, dataRows}: Props): ReactElement {
  const classes = useStyles();
  const [data, setTableData] = useState(dataRows);
  const [tableHeaders, setTableheaders] = useState(dates);
  useEffect(()=>{
    if(dates.length > 1) {
      setTableheaders(dates)
    }

    if(data.length > 1) {
      setTableData(dataRows);
    }
    console.log("TABLE",dataRows)
  },[dates, data])

  const columns = React.useMemo(()=>{
    const defineColumns:any = [];
    defineColumns.push({
      Header: "Name",
      accessor: 'name',
      Cell: (row:any) =>{
        const url:any = row.data[row.row.id].picture ?  row.data[row.row.id].picture : 'http://getdrawings.com/free-icon/teacher-icon-69.png'
        const count:any =  row.data[row.row.id].count; 
        return <div style={{display: 'flex', alignItems:'center', minWidth:"150px", justifyContent: "space-between"}}>
          <img src={url} width='30px' height='30px' style={{borderRadius: "50%", margin: "0px 5px"}}/>
          <div style={{fontWeight: 500, marginLeft:"5px"}}><span>{row.value}</span></div>
          <div style={{
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: "lightblue",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"}}><span>{count}</span></div>
        </div> 
      }
    })
    tableHeaders.forEach((value:any,key:any)=>{
      defineColumns.push({
          Header: value,
          accessor: value,
          Cell: (row:any) => {
            let attendance = row.data[row.row.id];
            return attendance[value] ? <div style={{width: "10px", height: "10px", borderRadius:"50%", backgroundColor:"#0F1727"}}></div> : ''
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
