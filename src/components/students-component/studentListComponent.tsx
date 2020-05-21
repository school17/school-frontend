import React, { ReactElement, useState, useEffect } from 'react';
import {
  useTable,
  usePagination
} from 'react-table';

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import {searchStudents} from '../../actions/students-actions';
import {Button, TextField} from "@material-ui/core";
import {paginationTheme} from '../../utils/paginationStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  MuiThemeProvider,
  ThemeProvider
} from "@material-ui/core/styles";

import {tableRowTheme} from '../../utils/tableStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {useDispatch} from "react-redux";
import StudentDrawerComponent from './studentAddComponent';
interface Props {
  studentsPayload: any,
  institution: any
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

function StudentListComponent({studentsPayload, institution}: Props): ReactElement {
  const dispatch = useDispatch();
  const [openModel, toggleOpenModel] = useState(false);
  const [openStudentDrawer, toggleopenStudentGradeDrawer] = useState(false);
  const [student, setStudent] = useState({});
  const clicked = (selectedTeacher:any) => {
    if(openStudentDrawer){
      toggleopenStudentGradeDrawer(false);
    } 
    else {
      toggleopenStudentGradeDrawer(true);
      setStudent(selectedTeacher);
    }
  }
 

  const deleteSelectedStudent = (student:any) => {
    //dispatch(deleteStudent(student.institutionId, student.id));
  }

 const [data, setTableData] = useState(studentsPayload.students);
  useEffect(()=>{
      setTableData(studentsPayload.students)
  },[studentsPayload.students]);
  const totalPages = studentsPayload.totalPages;
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: (row:any) =>{
          const url:any = row.data[row.row.id].picture ?  row.data[row.row.id].picture : 'http://getdrawings.com/free-icon/teacher-icon-69.png'
          return <div style={{display: 'flex', alignItems:'center'}}>
            <img src={url} width='50px' height='50px' style={{borderRadius: "50%", margin: "0px 45px"}}/>
            <div style={{fontWeight: 500}}><span>{row.value}</span></div>
          </div> 
        }
      },
      {
        Header: 'Grade',
        accessor: 'grade',
      },
      {
        Header: 'Section',
        accessor: 'section',
      },
     
      {
        Header: '',
        accessor: 'actions',
        Cell: (row:any) => {
          let student = row.data[row.row.id];
          return <span><EditIcon onClick = {()=>{clicked(student)}}></EditIcon> <DeleteIcon onClick = {()=>{deleteSelectedStudent(student)}} ></DeleteIcon></span>
        }
      }
    ],
    []
  )
  const {
    getTableProps, headerGroups, rows, prepareRow, getTableBodyProps,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    page,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      pageCount: totalPages,
      initialState: { pageIndex: 0}
    },
    usePagination
  )

  const handleNextPage = () => {
    const searchQuery = {
      pageNumber: pageIndex + 1,
      pageSize: pageSize
    }
    dispatch(searchStudents(institution, searchQuery));
    nextPage();
  }

  const handlePreviousPage = () => {
    const searchQuery = {
      pageNumber: pageIndex - 1,
      pageSize: pageSize
    }
    dispatch(searchStudents(institution, searchQuery));
    previousPage();
  }

  const classes = useStyles();
  return (
    <MuiThemeProvider theme= {tableRowTheme}>
    <CssBaseline></CssBaseline>
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
    <ThemeProvider theme={paginationTheme}>
    <div className ={classes.pagination}>
        <Button 
        variant="contained"
        color="primary"
        onClick={() => gotoPage(0)} disabled={!canPreviousPage} >
          {'FIRST'}
        </Button>{' '}
        <Button 
        variant="contained"
        color="primary"
        onClick={() => handlePreviousPage()} disabled={!canPreviousPage}>
          {'PREV'}
        </Button>{' '}
        <span style={{margin: '0px 20px'}}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
          <span style={{width: 60}}>
          <TextField
              variant="outlined"
              type="number"
              size="small"
              fullWidth={false}
              defaultValue={pageIndex + 1}
              value = {pageIndex + 1}
              onChange={(e:any) => {
                const page:any  = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
          ></TextField>
          </span>
          
        <Button 
        variant="contained"
        color="primary"
        onClick={() => handleNextPage()} disabled={!canNextPage}>
          {'NEXT'}
        </Button>{' '}
        <Button
        variant="contained"
        color="primary"
         onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'LAST'}
        </Button>{' '}
        {/*<select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5,10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
          </select>*/}
      </div>
    </ThemeProvider>
      {openStudentDrawer? <StudentDrawerComponent openDrawer = {openStudentDrawer} callBack={clicked} student ={student}/>  : ''}
    </MuiThemeProvider>
  )
}

export default StudentListComponent
