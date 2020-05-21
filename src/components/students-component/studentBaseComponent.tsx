import React, { ReactElement, useEffect } from 'react';
import {
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import {useSelector, useDispatch} from "react-redux";
import {searchStudents} from '../../actions/students-actions';
import StudentListComponent from './studentListComponent';
import StudentActionComponent from './studentActionComponent';

interface Props {
  
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)"
    },
  })
);

function StudentBaseComponent({}: Props): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {institution} = useSelector((store:any) => {
    return store.loginReducer
  })
  const {studentsPayload} = useSelector((store:any)=> {    
    return store.studentReducer
  });
  const searchQuery = {
    pageSize: '10',
    pageNumber: '0'
  }
  useEffect(() => {
    dispatch(searchStudents(institution, searchQuery));
  },[])
  return (
    <div className={classes.root}>
      <StudentActionComponent searchQuery={searchQuery} institution={institution}></StudentActionComponent>
      <StudentListComponent studentsPayload = {studentsPayload} 
      institution={institution}/>
    </div>
  )
}

export default StudentBaseComponent
