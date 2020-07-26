import React, { ReactElement, useState } from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Drawer } from "@material-ui/core";
import { drawerTheme } from "../../../utils/drawerStyles";
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DatePicker from "react-modern-calendar-datepicker";
import ExamsListComponent from "./examsListComponent";
import { subjects } from "../../../constants/subjects";
import { grades } from "../../../constants/grades";
import { divisions } from "../../../constants/divisions";
import { sessionTime } from "../../../constants/session";
import { tests } from "../../../constants/test";
import {useDrawerStyles } from "../../../utils/drawerStyles";
import { formUseStyles } from "../../../utils/formStyles";
import { useFormik } from "formik";
import { getMonth} from "../../../utils/dateUtils";
import Grid from "@material-ui/core/Grid";
import {saveGradeTest} from "../../../actions/test-action";
import { useDispatch, useSelector} from "react-redux";
interface Props {
  openAdminExamDrawer:any, setOpenAdminExamDrawer:any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)"
    },
    
    container: {
      padding: 20,
      fontWeight: "bold"
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
    }
  })
);

function AddExamDrawer({openAdminExamDrawer, setOpenAdminExamDrawer}: Props): ReactElement {
  const drawerClass = useDrawerStyles();
  const formStyles = formUseStyles();
  const classes = useStyles();
  const dispatch = useDispatch();
  const {institution} = useSelector((store:any) => {
    return store.loginReducer
  });
  const [examsList, setExamsList]:any = useState([]);
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
    if (!values.testName) {
      errors.testName = "Required";
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
      testName: "",
      time: "",
      date: null,
    },
    validate,
    isInitialValid: false,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      setOpenAdminExamDrawer(false);
      formik.resetForm();
      const payload:any = (Object.assign(formik.values, {schedule: examsList}));
      payload["institutionId"]= institution;
      payload["startDate"] = examsList[0].date;
      dispatch(saveGradeTest(institution,payload))
    }
  });

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

  const filterExam = (subject: any) => {
    const filterExam = examsList.filter((exam:any) => {
      return exam.subject !== subject;
    });
    setExamsList(filterExam);
  }

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

    const filterExam = examsList.filter((exam:any) => {
      return exam.subject !== formik.values.subject;
    });

    setExamsList([...filterExam, exam]);
  }
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
  return (
    <ThemeProvider theme={drawerTheme}>
    <Drawer
      open={openAdminExamDrawer}
      anchor="right"
      elevation={20}
      onClose={() => {
        setOpenAdminExamDrawer(false);
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
                  Grades / Mode of Test
                </InputLabel>
                <div style = {{display:"flex"}}>
                <Select
                  name="grade"
                  id="grade"
                  variant="outlined"
                  style = {{width : "175px"}}
                  error={!!formik.errors.grade && !!formik.touched.grade}
                  value={formik.values.grade}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                >
                  {gradesDropDown}
                </Select>
                <Select
                  name="testName"
                  id="testName"
                  variant="outlined"
                  style = {{marginLeft: "10px", width : "175px"}}
                  error={!!formik.errors.testName && !!formik.touched.testName}
                  value={formik.values.testName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                >
                  {testsDropDown}
                </Select>
                </div>
                {formik.errors.grade && formik.touched.grade && (
                  <strong className={formStyles.error}>
                    Grade is required
                  </strong>
                )}
                {formik.errors.testName && formik.touched.testName && (
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
                    setOpenAdminExamDrawer(false);
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
      <ExamsListComponent examsList={examsList} deleteExam={filterExam}></ExamsListComponent>
    </Drawer>
  </ThemeProvider>
  )
}

export default AddExamDrawer
