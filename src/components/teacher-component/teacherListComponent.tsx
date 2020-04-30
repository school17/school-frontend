import React, { ReactElement, useState, useEffect } from 'react'
import {
  useTable,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination
} from 'react-table';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import TeacherModalComponent from './teacherModalComponent';
import {fetchTeacher} from '../../actions/teacher-action';

import {
  MuiThemeProvider
} from "@material-ui/core/styles";

import {tableRowTheme} from '../../utils/tableStyles';

import CssBaseline from '@material-ui/core/CssBaseline';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import makeData from './makeData';
import {useDispatch} from "react-redux";
interface Props {
  teachersPayload: any,
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
    }
  })
  )
export default function TeacherListComponent({teachersPayload, institution}: Props): ReactElement {
  const dispatch = useDispatch();
  //const data = React.useMemo(() => makeData(20), [])
  const [openModel, toggleOpenModel] = useState(false);
  const [teacher, setTeacher] = useState({});
  const clicked = (selectedTeacher:any) => {
    if(openModel){
      toggleOpenModel(false);
    } 
    else {
      toggleOpenModel(true);
      setTeacher(selectedTeacher);
    }
  }

  const [data, setData] = useState(teachersPayload.teachers);

  useEffect(()=>{
    setData(teachersPayload.teachers)
  },[teachersPayload])

  const totalPages = teachersPayload.totalPages;
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
        Header: 'Division',
        accessor: 'division',
      },
      {
        Header: 'Classes',
        accessor: 'grades',
        Cell: (row: any) => {
          let grades = row.value.join(', ')
          return <span> {grades} </span>
        }
      },
      {
        Header: 'Subjects',
        accessor: 'subjects',
        Cell: (row: any) => {
          let subjects = row.value.join(', ')
          return <span> {subjects} </span>
        }
      },
      {
        Header: 'Class Teacher',
        accessor: 'grade',
      },
      {
        Header: '',
        accessor: 'actions',
        Cell: (row:any) => {
          let teacher = row.data[row.row.id];
          return <span><EditIcon onClick = {()=>{clicked(teacher)}}></EditIcon></span>
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
    dispatch(fetchTeacher(institution, searchQuery));
    nextPage();
  }

  const handlePreviousPage = () => {
    const searchQuery = {
      pageNumber: pageIndex - 1,
      pageSize: pageSize
    }
    dispatch(fetchTeacher(institution, searchQuery));
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
    <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => handlePreviousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => handleNextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
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
        </select>
      </div>
      {openModel? <TeacherModalComponent opeModel = {openModel} callBack={clicked} teacher={teacher} /> : ''}
    </MuiThemeProvider>
   
    
  )
}
