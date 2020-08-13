import React, { ReactElement, useEffect } from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { formUseStyles } from "../../utils/formStyles";
import { grades } from "../../constants/grades";
import {subjects} from '../../constants/subjects';
import { useFormik } from "formik";
import { useInverseDrawerStyles, inverseDrawerTheme } from '../../utils/drawerStyles';
import Grid from "@material-ui/core/Grid";
import { divisions } from "../../constants/divisions";
import { Button } from "@material-ui/core";
import {getRecordOfWork} from "../../actions/record-of-work-action";
import { useDispatch, useSelector } from "react-redux";
interface Props {
  selector:any,
  setSelector:any,
  institution:any,
  setIsValidSelector:any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      height: "100%",
      paddingTop: "20px",
      fontWeight: "bolder",
      backgroundColor: "#F5F6F8"
    },
    buttonContainer: {
      marginBottom: 20,
      display: "flex",
      flexDirection: "row-reverse",
      marginRight: 20,
    }
  })
);


function RecordOfWorkSelector({selector, setSelector,institution, setIsValidSelector}: Props): ReactElement {
  const classes = useStyles();
  const drawerClass = useInverseDrawerStyles();
  const formStyles = formUseStyles();
  const dispatch = useDispatch();
  const validate = (values:any) => {
    const errors: any = {};
    if (!values.grade) {
      errors.grade = "Required";
    }
    if(!values.subject) {
      errors.subject = "Required";
    }

    if(!values.division) {
      errors.division = "Required";
    }

    return errors;
  }
  const formik = useFormik({
    initialValues: {
      grade: '',
      subject: '',
      division: ''
    },
    validate,
    isInitialValid: false,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      setSelector(values);
      dispatch(getRecordOfWork(institution,values.division, values.grade, values.subject))
    }
  });

  useEffect(()=>{
    if(formik.isValid && formik.values.division && formik.values.grade && formik.values.subject) {
      setIsValidSelector(true);
      setSelector(formik.values);
      dispatch(getRecordOfWork(institution, formik.values.division, formik.values.grade, formik.values.subject))
    }
},[formik.values, formik.isValid])
  const gradesDropDown = grades.map((item: string, index: any) => {
    return (
      <MenuItem value={item} key={index}>
        {item}
      </MenuItem>
    );
  });
  const subjectDropDown = subjects.map((item:string, index:any) => {
    return (<MenuItem value={item} key={index}>{item}</MenuItem>)
  });

  const divisonsDropDown = divisions.map((item: string, index: any) => {
    return (
      <MenuItem value={item} key={index}>
        {item}
      </MenuItem>
    );
  });
  return (
    <ThemeProvider theme={inverseDrawerTheme}>
    <div className={classes.container}>
      <span>Record of work</span>
      <div className={drawerClass.form}>
      <form onSubmit={formik.handleSubmit}>
      <Grid container className={drawerClass.form}>

      <Grid xs={12} md={12}>
        <FormControl className={formStyles.drawerFormControl}>
                <InputLabel
                  className={formStyles.drawerLabel}
                  shrink={false}
                >
                  Division
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
        <Grid xs={12} md={12}>
        <FormControl className={formStyles.drawerFormControl}>
                <InputLabel
                  className={formStyles.drawerLabel}
                  shrink={false}
                >
                  Classes
                </InputLabel>
                <Select
                  name="grade"
                  id="grade"
                  variant="outlined"
                  error={
                    !!formik.errors.grade && !!formik.touched.grade
                  }
                  value={formik.values.grade}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  
                >
                  {gradesDropDown}
                </Select>
                {formik.errors.grade && formik.touched.grade && (
                    <strong className={formStyles.error}>
                      Class is required
                    </strong>
                  )}
              </FormControl>
        </Grid>

        <Grid xs={12} md={12}>
        <FormControl className={formStyles.drawerFormControl}>
                <InputLabel
                  className={formStyles.drawerLabel}
                  shrink={false}
                >
                  Subject
                </InputLabel>
                <Select
                  name="subject"
                  id="subject"
                  variant="outlined"
                  error={
                    !!formik.errors.subject && !!formik.touched.subject
                  }
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
      
      </Grid>
      {/*<div className={classes.buttonContainer}>
      <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className = {drawerClass.button}
                  disabled = {!formik.isValid}
                >
                  Fetch 
                </Button>
                 </div> */}
      </form>
      </div>
    </div>
    </ThemeProvider>
  )
}

export default RecordOfWorkSelector
