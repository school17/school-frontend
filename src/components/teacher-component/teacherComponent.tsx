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
interface Props {
  
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "2px 0px 16px -1px rgba(0,0,0,0.64)"
    },
  })
);
export default function TeacherComponent({}: Props): ReactElement {

  const classes = useStyles();
  const dispatch = useDispatch();
  const {teachers} = useSelector((store:any)=> {
    return store.teacherReducer
  });
  const {institution} = useSelector((store:any) => {
    return store.loginReducer
  })
  useEffect(() => {
    dispatch(fetchTeacher(institution));
  },[])
  console.log(teachers);
  return (
    <div className={classes.root}>
      <TeacherListComponent teachers = {teachers}/>
    </div>
  )
}
