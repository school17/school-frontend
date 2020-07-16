import React, { ReactElement, useState, useEffect } from 'react';
import {Grid} from "@material-ui/core";
import TimeTableTeacherList from './timeTableTeacherList';
import TimeTableComponent from "./timeTableComponent";
import { ThemeProvider } from '@material-ui/core/styles';
import { drawerTheme } from '../../utils/drawerStyles';
import {getTimeTable} from '../../actions/time-table-actions';
import {
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
interface Props {
  institution:any,
  grade:any,
  section: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#F8F8F8",
     
    }
  })
);

function TimeTableBaseComponent({institution, grade, section}: Props): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showDropDownToggle, setShowDropDownToggle] = useState(false);
  const {subjectTeacherAssociation} = useSelector((store:any) => {
    return store.gradeDashboardReducer;
  });
  useEffect(() => {
    dispatch(getTimeTable(institution, grade, section))
  },[grade, section])
  return (
    <ThemeProvider theme={drawerTheme}>
      <Grid container>
      <Grid xs={12} md={2} className={classes.root}>
        <TimeTableTeacherList institution= {institution} grade= {grade} section={section} showDropDownToggle={showDropDownToggle} setShowDropDownToggle={setShowDropDownToggle}></TimeTableTeacherList>
      </Grid>
        <Grid xs={12} md={10}>
        <TimeTableComponent showDropDownToggle={showDropDownToggle} setShowDropDownToggle={setShowDropDownToggle}
        institution= {institution} grade= {grade} section={section}></TimeTableComponent>
      </Grid>
      
    </Grid>
    </ThemeProvider>
  )
}

export default TimeTableBaseComponent
