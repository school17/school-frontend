import React, { ReactElement, useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import {
  Link
} from "react-router-dom";
import ExamIcon from "../../../svg/exam.svg";
import studentIcon from "../../../svg/student.svg";
import teacherIcon from "../../../svg/teacher.svg";
import notificationIcon from "../../../svg/notification.svg";
import classRoomIcon from "../../../svg/classroom.svg";
import { useFormik } from "formik";
import { subjects } from "../../../constants/subjects";
import { grades } from "../../../constants/grades";
import { divisions } from "../../../constants/divisions";
import { sessionTime } from "../../../constants/session";
import { Button } from "@material-ui/core";
import { tests } from "../../../constants/test";
import { Drawer } from "@material-ui/core";
import { drawerTheme, useDrawerStyles } from "../../../utils/drawerStyles";
import Grid from "@material-ui/core/Grid";
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { formUseStyles } from "../../../utils/formStyles";
import { getMonth} from "../../../utils/dateUtils";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DatePicker from "react-modern-calendar-datepicker";
import ExamsListComponent from "./examsListComponent";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)"
    },
    date: {
      display: "flex",
      alignItems: "center",
      marginTop: "10px",
      color: "#6DA0E6",
      marginLeft: "10px",
      marginBottom: "20px"
    },
    alingText: {
      textAlign: "initial",
      fontSize: 18,
      display: "flex",
      flexDirection: "column",
      marginBottom: 20,
      borderBottom: "dashed 1px lightgrey",
      paddingBottom: 10,
    },
    desc: {
      fontSize: 12,
      color: "lightgrey",
      marginTop: 10
    },
    container: {
      padding: 20,
      fontWeight: "bold"
    },
    actions: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& > svg": {
        color: "#000fff",
        marginLeft: "50%",
        position: "relative",
        top: "-60px",
        left: "90%"
      }
    },
    imageIcons: {
      width: 50,
      height: 50,
      borderRadius: "50%"
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
    width: "90%",
    },
    iconContainer: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      margin:"15px 0px",
      color: "#5993E9",
      "& > span": {
        marginLeft: 10,
        fontSize: 12
      }
    }
  })
);

function AdminListComponent({  }: Props): ReactElement {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [examsList, setExamsList]:any = useState([]);
  const drawerClass = useDrawerStyles();
  const formStyles = formUseStyles();
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
  const timeDropDown = sessionTime.map((item: string, index: any) => {
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
    if (!values.time) {
      errors.time = "Required";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      subject: "",
      division: "",
      grade: "",
      test: "",
      time: "",
      date: null,
    },
    validate,
    isInitialValid: false,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      setOpenDrawer(false);
      formik.resetForm();
      console.log(Object.assign(formik.values, {schedule: examsList}));
    }
  });

  const formatInputValue = () => {
    let date = "";
    const formikValues:any = formik.values;
    if(formikValues && formikValues.date) {
      date = `${formikValues.date.day} ${getMonth(formikValues.date.month)}  ${
        formikValues.date.year
    }`;
    }
    return date;
  };

  const addExamToList = () => {
    let date = '';
    const formikValues:any = formik.values;
      date = `${formikValues.date.day} ${getMonth(formikValues.date.month)}  ${
        formikValues.date.year
      }`;
    
    const exam = {
      date: date,
      time: formik.values.time,
      subject: formik.values.subject
    }
    setExamsList([...examsList, exam]);
  }
  return (
    <div className={classes.container}>
    <div className={classes.alingText}>
    <span>Admin Settings</span>
    <span className={classes.desc}>All setting related to your institution</span>
    </div>
  
      <Grid container>
        <Grid  item xs={4} md={3}>
        <div className={classes.iconContainer}>
            <img
            className={classes.imageIcons}
            src={ExamIcon}
            onClick={() => {
              setOpenDrawer(true);
            }}
          />
          <span>Add Exams</span>
        </div>
        </Grid>
        <Grid  item xs={4} md={3}>
        <Link className={classes.iconContainer} to="/students">
        <img
        className={classes.imageIcons}
        src={studentIcon}
      />
       <span>Manage Students</span>
      </Link>
        </Grid>
        <Grid  item xs={4} md={3}>
        <Link className={classes.iconContainer} to="/teachers">
      </div>
        </Grid>
        <Grid  item xs={4} md={3}>
        <div className={classes.iconContainer}>
        <img
        className={classes.imageIcons}
        src={teacherIcon}
      />
       <span>Manage Teachers</span>
      </Link>
        </Grid>
        <Grid  item xs={4} md={3}>
        <div className={classes.iconContainer}>
        <img
        className={classes.imageIcons}
        src={notificationIcon}
      />
      <span>Add Notification</span>
      </div>
        </Grid> <Grid  item xs={4} md={3}>
        <Link className={classes.iconContainer} to="/class">
        <img
        className={classes.imageIcons}
        src={classRoomIcon}
      />
       <span>Manage Class room</span>
      </Link>
        </Grid>
      <span>Manage Class Rooms</span>
      </div>
        </Grid>
      </Grid>
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
                    <InputLabel
                      className={formStyles.drawerLabel}
                      shrink={false}
                    >
                      Divisons
                    </InputLabel>
                    <Select
                      name="division"
                      id="division"
                      variant="outlined"
                      error={
                        !!formik.errors.division && !!formik.touched.division
                      }
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
                    <div style={{ display: "flex" }}>
                      <Select
                        name="time"
                        id="time"
                        variant="outlined"
                        style={{ width: "90px", marginTop: "10px" }}
                        error={
                          !!formik.errors.time &&
                          !!formik.touched.time
                        }
                        value={formik.values.time}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      >
                        {timeDropDown}
                      </Select>

                      <Select
                        name="subject"
                        id="subject"
                        variant="outlined"
                        style={{
                          width: "250px",
                          marginTop: "10px",
                          marginLeft: "10px"
                        }}
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
                      (formik.errors.time &&
                        formik.touched.time && (
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
                  <AddCircleOutlineIcon
                      onClick={()=>{addExamToList()}}
                      style={{
                        color: "#000fff",
                        position: "relative",
                        top: "-60px",
                        left: "90%",
                        zIndex: 1000
                      }} 
                  ></AddCircleOutlineIcon>
                </Grid>

                <Grid item xs={12} md={12}>
                  <div className={drawerClass.buttonContainer}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={drawerClass.button}
                      disabled={!formik.isValid}
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
          <ExamsListComponent examsList={examsList}></ExamsListComponent>
        </Drawer>
      </ThemeProvider>
    </div>
  );
}
export default AdminListComponent;
