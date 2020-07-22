import React, { ReactElement } from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import TableContainer  from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
interface Props {
  examsList:any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container:{
      maxHeight: 350,
    },
    tableBodyHead : {
      fontWeight: 800,
      color: "#0F1727",
    },
    tableRowHead: {
      fontWeight: 800,
      color: "#00425E",
    },
  })
);





function ExamsListComponent({examsList}: Props): ReactElement {
  const classes = useStyles();
  const listAllExams = () => {
      return (
        <TableBody>
          {examsList.map((exam:any, index:any) => {
            return (
              <TableRow key={index}>
              <TableCell align="left" className={classes.tableBodyHead}>{exam.date}</TableCell>
              <TableCell align="left" className={classes.tableBodyHead}>{exam.subject}</TableCell>
              <TableCell align="left" className={classes.tableBodyHead}>{exam.time}</TableCell>
              <TableCell align="left" className={classes.tableBodyHead}><DeleteIcon></DeleteIcon></TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      )
  }

  const displayHeader = () => {
    if(examsList.length > 0 ) {
      return (
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="time-table">
          <TableRow>
          <TableCell align="left" className={classes.tableRowHead}>Date</TableCell>
          <TableCell align="left" className={classes.tableRowHead}>Subject</TableCell>
          <TableCell align="left" className={classes.tableRowHead}>Time</TableCell>
          <TableCell align="right" className={classes.tableRowHead}></TableCell>
          </TableRow>
          {listAllExams()}
          </Table>
        </TableContainer>
      )
    }
  }
  return (
    <div>
      {displayHeader()}
    </div>
  )
}

export default ExamsListComponent
