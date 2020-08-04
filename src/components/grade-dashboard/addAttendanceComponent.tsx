import React, { ReactElement, useState } from "react";
import { useDashboardPrimaryStyles } from "../../utils/dashboradstyles";
import { drawerTheme, useDrawerStyles } from "../../utils/drawerStyles";
import { formUseStyles } from "../../utils/formStyles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import FormControl from "@material-ui/core/FormControl";
import { InputLabel, Select, MenuItem, TextField } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import DatePicker from "react-modern-calendar-datepicker";
import Grid from "@material-ui/core/Grid";
import {getMonth} from "../../utils/dateUtils";
import getProfilePicUrl from './../../utils/randomProfilePicGenerator';
import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import {attendanceBulkSave} from "../../actions/attendance-actions";
interface Props {setOpenAttendanceDrawer:any, institution:any}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 350
    },
    calendar: {
      position: "relative",
      fontSize: 14,
      fontWeight: "bold",
      borderRadius: 4,
      backgroundColor: "#F5F6F8",
      padding: 15,
      border: "none",
      textAlign: "left",
      width: "100%"
    },
    image: {
      flex: "0 0 2rem",
      marginRight: 25,
    },
    absentees: {
      backgroundColor: "#FFF",
      color: "black",
      fontWeight: "bolder",
      paddingLeft: 20
    }
  })
);

function AddAttendanceComponent({ setOpenAttendanceDrawer, institution }: Props): ReactElement {
  const validate = (values: any) => {
    const errors: any = {};
    return errors;
  };

  const {studentsList} = useSelector((store:any) => {
    return store.gradeDashboardReducer;
  });

  const { grade, section } = useParams();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      date: null,
      studentsList: []
    },
    validate,
    isInitialValid: false,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      const attendance = {
        institutionId: institution,
        month: getMonth(values.date.month),
        date: values.date.day,
        year: values.date.year,
        studentsList: values.studentsList,
        grade:grade,
        section: section
      }
      dispatch(attendanceBulkSave(attendance));
      setOpenAttendanceDrawer(false);
    }
  });
  const drawerClass = useDrawerStyles();
  const formStyles = formUseStyles();
  const classes = useStyles();
  const [totalAbsentess, setTotalAbsentess] = useState(0);
  const formatInputValue = () => {
    let date = "";
    const formikValues:any = formik.values;
    if(formikValues && formikValues.date) {
      date = `${formikValues.date.day} ${getMonth(formikValues.date.month)} ${
        formikValues.date.year
    }`;
    }
    return date;
  };
  const setStudents = (value:any) => {
    formik.values.studentsList  = value.map((student:any) => student.name); 
    setTotalAbsentess(formik.values.studentsList.length)
  }
  return (
    <div className={drawerClass.drawer}>
      <div className={drawerClass.header}>
        <h4 className={classes.root}>Add Attendance</h4>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container className={drawerClass.form}>
          <Grid item xs={12} md={12}>
            <FormControl className={formStyles.drawerFormControl}>
              <InputLabel className={formStyles.drawerLabel} shrink={false}>
                Date
              </InputLabel>
              <DatePicker
                   value={formik.values.date}
                   shouldHighlightWeekends
                   inputPlaceholder="Select a date"
                   formatInputText={formatInputValue}
                   inputClassName={classes.calendar}
                   onChange = {(e:any)=> {
                     formik.setFieldValue('date', e, true)
                    }}
                ></DatePicker>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
              <FormControl className={formStyles.drawerFormControl}>
                <InputLabel className={formStyles.drawerLabel}>Students</InputLabel>
                <Autocomplete
                  multiple
                  id="students-list"
                  options={studentsList as any[]}
                  ListboxProps={{ style: { maxHeight: 200, overflow: 'auto' } }}
                  getOptionLabel={(option) => option.name}
                  renderOption={(option) => (
                    <React.Fragment>
                    <img className={classes.image} src={option.picture ? option.picture : getProfilePicUrl()} width='30px' height='30px' style={{borderRadius: "50%", marginRight: "15px", border:"solid 2px orangered"}}/>
                     <span>{option.name}</span>
                    </React.Fragment>
                  )}
                  onChange = {(event:any, value:any) => {setStudents(value)}}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
                <div  className={drawerClass.buttonContainer}> 
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className = {drawerClass.button}
                  disabled = {!formik.isValid}
                >
                  Save 
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  onClick = {()=>{setOpenAttendanceDrawer(false)}}
                  className ={drawerClass.customButton}
                >
                  Cancel 
                </Button>
                </div>
              </Grid>
        </Grid>
      </form>
      <div className={classes.absentees}>
      <span>Total Absentees - {totalAbsentess}</span>
      </div>
    </div>
  );
}

export default AddAttendanceComponent;
