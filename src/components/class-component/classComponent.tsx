import React, { ReactElement, useEffect } from 'react';
import {
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import ClassActionComponent from './classActionComponent';
import ClassListComponent from './classListComponent'
import {fetchGrades} from '../../actions/class-actions';
interface Props {
  
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)"
    },
  })
);

function ClassComponent({}: Props): ReactElement {
  const dispatch = useDispatch();
  const classes = useStyles();
  

  const {institution} = useSelector((store:any) => {
    return store.loginReducer
  });

  const {gradesPayload} = useSelector((store:any)=> {
    return store.classReducer
  });

  

  const searchQuery = {
    pageSize: '10',
    pageNumber: '0'
  }

  useEffect(() => {
    dispatch(fetchGrades(institution, searchQuery));
  },[])


  return (
    <div className={classes.root}>
      <ClassActionComponent></ClassActionComponent>
      {<ClassListComponent classPayload = {gradesPayload} institution={institution}></ClassListComponent>}
    </div>
  )
}

export default ClassComponent
