import React, { ReactElement } from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
interface Props {
  examsList:any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      display: "flex",
      color: "black",
      fontWeight: "bolder",
      margin: 20,
      justifyContent: "space-between"
    },
    header: {
      display: "flex",
      fontWeight: "bolder",
      margin: 20,
      justifyContent: "space-between",
      color: "orange"
    }
  })
);





function ExamsListComponent({examsList}: Props): ReactElement {
  const classes = useStyles();
  const listAllExams = () => {
    if(examsList.length> 0) {
      return (examsList.map((exam:any) => {
        return(<div className={classes.content}>
          <span>{exam.date}</span>
          <span>{exam.subject}</span>
          <span>{exam.time}</span>
          <DeleteIcon></DeleteIcon>
        </div>)
      }))
    }
  }

  const displayHeader = () => {
    if(examsList.length > 0 ) {
      return (
        <div className={classes.header}>
          <span>Date</span>
          <span>Subject</span>
          <span>Time</span>
          <span></span>
        </div>
      )
    }
  }
  return (
    <div>
      {displayHeader()}
      {listAllExams()}
    </div>
  )
}

export default ExamsListComponent
