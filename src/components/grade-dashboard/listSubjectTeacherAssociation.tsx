import React, { ReactElement, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import { drawerTheme, useDrawerStyles } from '../../utils/drawerStyles';
import { ThemeProvider } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
interface Props {
  association:any,
  showEdit:any,
  hideHeading?: any
  hasRemoveAbility?: any
  removeFaculty?: any
  callBack?:any
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container:{
    maxHeight: 350,
  },
  tableBodyHead : {
    fontWeight: 900,
    color: "#0F1727",
  },
  tableRowHead: {
    fontWeight: 900,
    //color: "#00425E",
    color: "orange"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0 20px",
    padding: "20px 0px",
    alignItems: "center",
    fontWeight: 800
  },
  icon:{
    opacity: 0.7
  }
});

function ListSubjectTeacherAssociation({association, showEdit, hideHeading, hasRemoveAbility, removeFaculty, callBack}: Props): ReactElement {
  const classes = useStyles();
  const drawerClass = useDrawerStyles();
  useEffect(()=>{
  },[association])
  const renderTeacher = (row:any) => {
    const teacher = row[Object.keys(row)[0]];
    return (
      <span>{teacher}</span>
    )
  }
  return (
    <ThemeProvider theme={drawerTheme}>
      {
        hideHeading  ? '' : (
          <div className={classes.buttonContainer}>
          <span>FACULTY MEMBERS</span>
          <div >
          {
            showEdit ? (<Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={callBack}
              className={drawerClass.button}
             >
               Edit
             </Button>) : ''
          }
          
          </div>
          </div>
        )
      }
    <div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="subject-teacher-association">
        <TableHead>
        <TableRow>
        <TableCell align="left" className={classes.tableRowHead}>SUBJECT</TableCell>
        <TableCell align="left" className={classes.tableRowHead}>FACULTY</TableCell>
        {hasRemoveAbility ? <TableCell align="right" className={classes.tableRowHead}></TableCell>: ''}
        </TableRow>
        </TableHead>
        <TableBody>
         {association.map((row:any, index:any) => (
           <TableRow key={index}>
            <TableCell align="left" className={classes.tableBodyHead}>{Object.keys(row)[0]}</TableCell>
            <TableCell align="left" className={classes.tableBodyHead}>{renderTeacher(row)}</TableCell>
            {hasRemoveAbility? <TableCell align="right" className={classes.tableBodyHead}><DeleteIcon onClick={()=>removeFaculty(row)} className={classes.icon}></DeleteIcon></TableCell> : "" }
           </TableRow>
         ))}
        </TableBody>
        </Table>
      </TableContainer>  
      
    </div>
    </ThemeProvider>
  )
}

export default ListSubjectTeacherAssociation
