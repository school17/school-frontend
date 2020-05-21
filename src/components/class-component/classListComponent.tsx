import React, { ReactElement, useState, useEffect } from 'react'
import {
  useTable,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination
} from 'react-table';
import { makeStyles, Theme, createStyles, MuiThemeProvider, ThemeProvider } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import {tableRowTheme} from '../../utils/tableStyles';
import {fetchGrades} from '../../actions/class-actions';
import ClassAddDrawerComponent from './classAddDrawerComponent';

import {Button, TextField} from "@material-ui/core";
import {paginationTheme} from '../../utils/paginationStyles';

import CssBaseline from '@material-ui/core/CssBaseline';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {useDispatch, useSelector} from "react-redux";
interface Props {
  classPayload: any,
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

function ClassListComponent({classPayload, institution}: Props): ReactElement {
  const dispatch = useDispatch();
  const [openGradeDrawer, toggleopenGradeDrawer] = useState(false);
  const [grade, setGrade] = useState({});
  const {teacher} = useSelector((store: any) => {    
    return store.classReducer;
  });
  const clicked = (selectedTeacher:any) => {
    if(openGradeDrawer){
      toggleopenGradeDrawer(false);
    } 
    else {
      toggleopenGradeDrawer(true);
      setGrade(selectedTeacher);
    }
  }

  const [data, setData] = useState(classPayload.grades);

  useEffect(()=>{
    if(classPayload.grades.length > 0) {
      setData(classPayload.grades)
    }
  },[classPayload])

  const totalPages = classPayload.totalPages;
  const columns = React.useMemo(
    () => [
      
      {
        Header: 'Class',
        accessor: 'grade',
      },
      {
        Header: 'Section',
        accessor: 'section',
      },
      {
        Header: 'Class Teacher',
        accessor: 'teacher',
      },
      {
        Header: 'Strength',
        accessor: 'strength',
      },
      {
        Header: 'Division',
        accessor: 'division',
      },
      {
        Header: '',
        accessor: 'actions',
        Cell: (row:any) => {
          let grade = row.data[row.row.id];
          return <span><EditIcon onClick = {()=>{clicked(grade)}}></EditIcon></span>
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
    dispatch(fetchGrades(institution, searchQuery));
    nextPage();
  }

  const handlePreviousPage = () => {
    const searchQuery = {
      pageNumber: pageIndex - 1,
      pageSize: pageSize
    }
    dispatch(fetchGrades(institution, searchQuery));
    previousPage();
  }

  let {noClassTeachers} = useSelector((store: any) => {
    return store.classReducer;
  });

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
      {openGradeDrawer? <ClassAddDrawerComponent openDrawer = {openGradeDrawer} callBack={clicked} 
      grade={grade} noClassTeachers={noClassTeachers} teacher={teacher} /> : ''}
      </MuiThemeProvider>
  )
}

export default ClassListComponent
