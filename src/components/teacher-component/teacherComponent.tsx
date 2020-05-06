import React, { ReactElement, useEffect } from 'react'
import TeacherListComponent from './teacherListComponent';
import {
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {fetchTeacher} from '../../actions/teacher-action';
import {useDispatch} from "react-redux";
import TeachersActionComponent from './teachersActionComponent';
interface Props {
  
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)"
    },
  })
);
export default function TeacherComponent({}: Props): ReactElement {

  const classes = useStyles();
  const dispatch = useDispatch();
  const {teachersPayload} = useSelector((store:any)=> {
    return store.teacherReducer
  });
  const {institution} = useSelector((store:any) => {
    return store.loginReducer
  })

  const searchQuery = {
    pageSize: '10',
    pageNumber: '0'
  }

  useEffect(() => {
    if(!teachersPayload) {
      dispatch(fetchTeacher(institution, searchQuery));
    }
  },[teachersPayload])
  return (
    <div className={classes.root}>
      <TeachersActionComponent searchQuery={searchQuery} institution={institution}></TeachersActionComponent>
      <TeacherListComponent teachersPayload = {teachersPayload} institution={institution}/>
    </div>
  )
}
