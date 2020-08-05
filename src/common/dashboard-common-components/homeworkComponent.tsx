import React, { ReactElement, useState, useEffect } from 'react'
import {useDashboardPrimaryStyles} from '../../utils/dashboradstyles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import {getMonth, getDay, getToday} from "../../utils/dateUtils";
import { Calendar } from "react-modern-calendar-datepicker";
import { drawerTheme, useDrawerStyles } from '../../utils/drawerStyles';
import { Drawer, TextField } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Grid from "@material-ui/core/Grid";
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { formUseStyles } from "../../utils/formStyles";
import {subjects} from '../../constants/subjects';
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {saveHomeWork, getHomework} from "../../actions/homework-actions";
import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import { useFormik } from "formik";
interface Props {
  institution:any,
  grade:any,
  section:any,
  role:any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      padding: 10,
      background: "#FFF",
      borderRadius: 10,
      flexDirection: "column",
      alignItems: "self-end"
    },
    date: {
      display: "flex",
      alignItems: "center",
      marginTop: 10,
      color: "#6DA0E6"
    },
    homework: {
      padding: 10,
      display: "flex",
      flexDirection: "column",
      justifyContent: "left",
      textAlign: "left",
      "& span:nth-of-type(2)": {
        color: "#7E8285"
      }
    },
    actions: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
      "& > svg": {
        color: "#6DA0E6"
      }
    },
    root: {
      minWidth: 350,
    },
  })
)

function HomeworkComponent({institution, grade, section, role}: Props): ReactElement {
  const dashboardClasses = useDashboardPrimaryStyles();
  const classes = useStyles();
  const formStyles = formUseStyles();
  const [toggleCalendar, setToggleCalendar] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const drawerClass = useDrawerStyles();
  const dispatch = useDispatch();
  const [day, setDay] = useState(getToday() === 'Sunday' ? 'Monday' : getToday());
  const [selectedDay, setSelectedDay]:any = useState({day: new Date().getDate(), month: new Date().getMonth() + 1, year: new Date().getFullYear()});
  const validate = (values:any) => {
    const errors: any = {};
    if (!values.subject) {
      errors.subject = "Required";
    }
    if(!values.desc) {
      errors.desc = "Required";
    }

    return errors;
  }
  const formik = useFormik({
    initialValues: {
     subject: '',
     desc: ''
    },
    validate,
    isInitialValid: false,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      const storeHomework = Homework.homework ? Homework.homework : []
      const homework = {
        institutionId: institution,
        grade: grade,
        section:section,
        date: `${selectedDay.day},${getMonth(selectedDay.month)},${selectedDay.year}`,
        homework: validateAndSetHomework(storeHomework, values)
      }
      dispatch(saveHomeWork(institution, grade, section, homework));
      setOpenDrawer(false);
      formik.resetForm();
    }
  });

  const {Homework} = useSelector((store:any) => {
    return store.homeworkReducer;
  });

const edit = () =>
{
  if(role !== "STUDENT")
  {
    
    return(
       <AddCircleOutlineIcon onClick={()=>{setOpenDrawer(true)}}></AddCircleOutlineIcon>
       )
  }
  else
  {
    return;
  }
}
  const validateAndSetHomework = (storeHomework: any, homework:any) => {
    if(storeHomework.length > 0) {
      const filteredHomework = storeHomework.filter((work:any) => {
        return work.subject != homework.subject;
      });
      return [...filteredHomework, homework];
    }else {
      return [homework];
    }

  }

  const renderDate = () => {
    if(selectedDay) {
      const date = `${selectedDay.day} ${getMonth(selectedDay.month)}  ${selectedDay.year}`;
      return (
       <span>{selectedDay.day}, {getMonth(selectedDay.month)}, {getDay(new Date(date).getDay())}</span> 
      )
    }
  }

  const subjectDropDown = subjects.map((item:string, index:any) => {
    return (<MenuItem value={item} key={index}>{item}</MenuItem>)
  });


  useEffect(()=>{
    const date = `${selectedDay.day},${getMonth(selectedDay.month)},${selectedDay.year}`
   if(Object.keys(Homework).length< 1 || (Homework && Homework.grade !== grade || Homework.section !== section || date !=Homework.date)) {
      dispatch(getHomework(institution, grade, section, date))
    }
   
  },[grade, section,selectedDay, Homework]);

  const updateDay = () => {
    const date = `${selectedDay.day} ${getMonth(selectedDay.month)}  ${selectedDay.year}`;
    setDay(getDay(new Date(date).getDay()));
  }

  const listHomework = () => {
    if(Homework && Homework.homework && Homework.homework.length > 0) {
      return Homework.homework.map((homework:any, index:any) =>{
        return (
          <div className={classes.homework}><span>{homework.subject}</span> <span>{homework.desc}</span></div>
        )
      })
    }
  }

  const displayCalendar = () => {
    if(toggleCalendar) {
      return (
        <Calendar
            value={selectedDay}
            onChange={(e:any)=>{setToggleCalendar(false); setSelectedDay(e); updateDay()}}
            shouldHighlightWeekends
          />
      )
    } 
  }
  return (
    <div className= {dashboardClasses.root}>
      <section className={classes.header}>
       <div className={classes.actions}>
         <span>Home work</span>
         {edit()}
       </div>
       <div className={classes.date}>
       <CalendarTodayIcon onClick={()=>{setToggleCalendar(true)}}></CalendarTodayIcon>
       {renderDate()}
       </div>
       {displayCalendar()}
       <ThemeProvider theme={drawerTheme}>
       <Drawer
          open = {openDrawer}
          anchor= 'right' 
          elevation = {20}
          onClose={()=>{setOpenDrawer(false)}}
      >
      
      <div className = {drawerClass.drawer}>
      <div className = {drawerClass.header}>
          <h4 className={classes.root}>Add Home Work</h4>
      </div>
      <form onSubmit={formik.handleSubmit}>
      <Grid container className={drawerClass.form}>
      <Grid item xs={12} md={12}>
      <FormControl className={formStyles.drawerFormControl}>
      <InputLabel className={formStyles.drawerLabel} shrink={false}>Subject</InputLabel>
      <Select
          name="subject"
          id="subject"
          variant="outlined"
          error={!!formik.errors.subject && !!formik.touched.subject}
          value={formik.values.subject}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          >
          {subjectDropDown}
      </Select>
      {formik.errors.subject && formik.touched.subject && (
                    <strong className={formStyles.error}>
        Subject is required
      </strong>
      )}
      </FormControl>
      </Grid>
      <Grid item xs={12} md={12}>
      <FormControl className={formStyles.drawerFormControl}>
      <InputLabel className={formStyles.drawerLabel}>Work</InputLabel>
      <TextField
                  name="desc"
                  variant="outlined"
                  id="desc"
                  required={true}
                  error={!!formik.errors.desc && !!formik.touched.desc}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.desc}
                ></TextField>
                {formik.errors.desc && formik.touched.desc && (
                  <strong className={formStyles.error}>
                   Enter the homework
                </strong>
                )}
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
                  onClick = {()=>{setOpenDrawer(false)}}
                  className ={drawerClass.customButton}
                >
                  Cancel 
                </Button>
                </div>
              </Grid>
      </Grid>
      </form>
      </div>     
    </Drawer>
    </ThemeProvider>
      </section>
      <div>
        {listHomework()}
      </div>
    </div>
  )
}

export default HomeworkComponent
