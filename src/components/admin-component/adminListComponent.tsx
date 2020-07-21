import React, { ReactElement, useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import ExamIcon from "../../svg/Examination.svg";
import { useFormik } from "formik";
import { subjects } from "../../constants/subjects";
import { grades } from "../../constants/grades";
import { divisions } from "../../constants/divisions";
import { sessionTime } from "../../constants/session";
import { Button } from "@material-ui/core";
import { tests } from "../../constants/test";
import { Drawer } from "@material-ui/core";
import { drawerTheme, useDrawerStyles } from "../../utils/drawerStyles";
import Grid from "@material-ui/core/Grid";
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { formUseStyles } from "../../utils/formStyles";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { Calendar } from "react-modern-calendar-datepicker";
import { getMonth, getDay, getToday } from "../../utils/dateUtils";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)",
    },
    date: {
      display: "flex",
      alignItems: "center",
      marginTop: "10px",
      color: "#6DA0E6",
      marginLeft: "10px",
      marginBottom:"70px"
    },
    actions: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& > svg": {
        color: "#000fff",
        marginLeft:"50%"
    }
  }
  })  
);

function AdminListComponent({}: Props): ReactElement {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const drawerClass = useDrawerStyles();
  const formStyles = formUseStyles();
  const [toggleCalendar, setToggleCalendar] = useState(false);
  const [day, setDay] = useState(
    getToday() === "Sunday" ? "Monday" : getToday()
  );
  const [selectedDay, setSelectedDay]: any = useState({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const subjectDropDown = subjects.map((item: string, index: any) => {
    return (
      <MenuItem value={item} key={index}>
        {item}
      </MenuItem>
    );
  });
  const gradesDropDown = grades.map((item: string, index: any) => {
    return (
      <MenuItem value={item} key={index}>
        {item}
      </MenuItem>
    );
  });
  const testsDropDown = tests.map((item: string, index: any) => {
    return (
      <MenuItem value={item} key={index}>
        {item}
      </MenuItem>
    );
  });
  const divisonsDropDown = divisions.map((item: string, index: any) => {
    return (
      <MenuItem value={item} key={index}>
        {item}
      </MenuItem>
    );
  });
  const sessionTimeDropDown = sessionTime.map((item: string, index: any) => {
    return (
      <MenuItem value={item} key={index}>
        {item}
      </MenuItem>
    );
  });
  const validate = (values: any) => {
    const errors: any = {};
    if (!values.division) {
      errors.division = "Required";
    }
    if (!values.grade) {
      errors.grade = "Required";
    }
    if (!values.subject) {
      errors.subject = "Required";
    }
    if (!values.test) {
      errors.test = "Required";
    }
    if (!values.sessionTime) {
      errors.sessionTime = "Required";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      subject: "",
      division: "",
      grade: "",
      test: "",
      sessionTime: "",
    },
    validate,
    isInitialValid: false,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      setOpenDrawer(false);
      formik.resetForm();
    },
  });
  const renderDate = () => {
    if (selectedDay) {
      const date = `${selectedDay.day} ${getMonth(selectedDay.month)}  ${
        selectedDay.year
      }`;
      return (
        <span>
          {selectedDay.day}, {getMonth(selectedDay.month)},{" "}
          {getDay(new Date(date).getDay())}
        </span>
      );
    }
  };
  const updateDay = () => {
    const date = `${selectedDay.day} ${getMonth(selectedDay.month)}  ${
      selectedDay.year
    }`;
    setDay(getDay(new Date(date).getDay()));
  };
  const displayCalendar = () => {
    if (toggleCalendar) {
      return (
        <Calendar
          value={selectedDay}
          onChange={(e: any) => {
            setToggleCalendar(false);
            setSelectedDay(e);
            updateDay();
          }}
          shouldHighlightWeekends
        />
      );
    }
  };
  return (
    <div className={classes.root}>
      <img
        src={ExamIcon}
        style={{
          position: "absolute",
          height: "50px",
          width: "50px",
          left: "80px",
        }}
        onClick={() => {
          setOpenDrawer(true);
        }}
      />
      <img
        src={ExamIcon}
        style={{
          position: "absolute",
          height: "50px",
          width: "50px",
          left: "180px",
        }}
      />
      <ThemeProvider theme={drawerTheme}>
        <Drawer
          open={openDrawer}
          anchor="right"
          elevation={20}
          onClose={() => {
            setOpenDrawer(false);
          }}
        >
          <div className={drawerClass.drawer}>
            <div className={drawerClass.header}>
              <h4 className={classes.root}>Add Test</h4>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <Grid container className={drawerClass.form}>
              <Grid item xs={12} md={12}>
      <FormControl className={formStyles.drawerFormControl}>
      <InputLabel className={formStyles.drawerLabel} shrink={false}>Divisons</InputLabel>
      <Select
          name="division"
          id="division"
          variant="outlined"
          error={!!formik.errors.division && !!formik.touched.division}
          value={formik.values.division}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          >
          {divisonsDropDown}
      </Select>
      {formik.errors.division && formik.touched.division && (
                    <strong className={formStyles.error}>
        Division is required
      </strong>
      )}
      </FormControl>
      </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl className={formStyles.drawerFormControl}>
                    <InputLabel
                      className={formStyles.drawerLabel}
                      shrink={false}
                    >
                      Grades
                    </InputLabel>
                    <Select
                      name="grade"
                      id="grade"
                      variant="outlined"
                      error={!!formik.errors.grade && !!formik.touched.grade}
                      value={formik.values.grade}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    >
                      {gradesDropDown}
                    </Select>
                    {formik.errors.grade && formik.touched.grade && (
                      <strong className={formStyles.error}>
                        Grade is required
                      </strong>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl className={formStyles.drawerFormControl}>
                    <InputLabel
                      className={formStyles.drawerLabel}
                      shrink={false}
                    >
                      Mode of Test
                    </InputLabel>
                    <Select
                      name="test"
                      id="test"
                      variant="outlined"
                      error={!!formik.errors.test && !!formik.touched.test}
                      value={formik.values.test}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    >
                      {testsDropDown}
                    </Select>
                    {formik.errors.test && formik.touched.test && (
                      <strong className={formStyles.error}>
                        Mode of test is required
                      </strong>
                    )}
                  </FormControl>
                </Grid>
                      <Grid item xs={12} md={12}>
                  <FormControl className={formStyles.drawerFormControl}>
                  <InputLabel
                      className={formStyles.drawerLabel}
                      shrink={false}
                    >
                      Session / Subjects
                    </InputLabel>
                      <div style={{display: "flex"}}>
                      <Select
                        name="sessionTime"
                        id="sessionTime"
                        variant="outlined"
                        style={{width:"90px",marginTop:"10px"}}
                        error={
                          !!formik.errors.sessionTime &&
                          !!formik.touched.sessionTime
                        }
                        value={formik.values.sessionTime}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      >
                        {sessionTimeDropDown}
                      </Select>

                      <Select
                        name="subject"
                        id="subject"
                        variant="outlined"
                        style={{width:"250px",marginTop:"10px",marginLeft:"10px"}}
                        error={
                            !!formik.errors.subject && !!formik.touched.subject
                        }
                        value={formik.values.subject}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      >
                        {subjectDropDown}
                      </Select>
                    </div>
                    
                    {(formik.errors.subject && formik.touched.subject && (
                      <strong className={formStyles.error}>
                        Subject is required
                      </strong>
                    )) ||
                      (formik.errors.sessionTime &&
                        formik.touched.sessionTime && (
                          <strong className={formStyles.error}>
                            Session is required
                          </strong>
                        ))} 
                  </FormControl>
                </Grid> 
                <Grid item xs={12} md={12}>
                  <FormControl className={formStyles.drawerFormControl}>
                    <InputLabel
                      className={formStyles.drawerLabel}
                      shrink={false}
                    >
                      Date
                    </InputLabel>
                      <div className={classes.date}>
                        <CalendarTodayIcon
                           onClick={() => {
                            setToggleCalendar(true);
                          }}
                        ></CalendarTodayIcon>
                        {renderDate()}
                        <div className={classes.actions}>
                        <AddCircleOutlineIcon onClick={()=>{console.log("Added")}}></AddCircleOutlineIcon>
                        </div>
                        {displayCalendar()}
                      </div>
                      </FormControl>
                      </Grid>

                <Grid item xs={12} md={12}>
                  <div className={drawerClass.buttonContainer}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={drawerClass.button}
                      disabled = {!formik.isValid}
                     >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="default"
                      onClick={() => {
                        setOpenDrawer(false);
                      }}
                      className={drawerClass.customButton}
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
    </div>
  );
}
export default AdminListComponent;
