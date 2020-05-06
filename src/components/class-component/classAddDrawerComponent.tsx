import React, { ReactElement, useEffect, useState } from 'react'
import { drawerTheme, useDrawerStyles } from '../../utils/drawerStyles';
import { useDispatch, useSelector } from "react-redux";
import { formUseStyles } from "../../utils/formStyles";
import Grid from "@material-ui/core/Grid";
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { Button } from "@material-ui/core";
import { getSchoolDetails } from "../../actions/address-form-actions";

import { getNonClassTeachersList, getTeacherDetails } from '../../actions/class-actions';
import {
  ThemeProvider
} from "@material-ui/core/styles";
import { Drawer } from '@material-ui/core';
import { useFormik } from "formik";
import { saveClassAction } from '../../actions/class-actions';
interface Props {

  openDrawer: any,
  callBack: any,
  noClassTeachers: any
  grade?: any,
  teacher?: any
}



function ClassAddDrawerComponent({ openDrawer, callBack, noClassTeachers, grade, teacher }: Props): ReactElement {
  const dispatch = useDispatch();
  const validate = (values: any) => {
    const errors: any = {};
    if (!values.grade) {
      errors.grade = "Required";
    }
    if (!values.teacher && !grade) {
      errors.teacher = "Required";
    }
    if (!values.division) {
      errors.division = "Required";
    }
    if (!values.section) {
      errors.section = "Required";
    } else if (values.section.length > 30) {
      errors.section = "Must be 30 characters or less";
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      grade: grade ? grade.grade : '',
      teacher: '',
      teacherName: grade ? grade.teacher : '',
      section: grade ? grade.section : '',
      division: grade ? grade.division : ''
    },
    validate,
    isInitialValid: false,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      const isUpdate = grade ? grade.id : false;
      const pervTeacher = teacher ? teacher : null;
      if (pervTeacher) {
        dispatch(saveClassAction(institution, values, isUpdate, pervTeacher.id));
      } else {
        dispatch(saveClassAction(institution, values));
      }
      handleClose();
    }
  })

  const drawerClass = useDrawerStyles();
  const classes = formUseStyles();

  let dropDownTeachers: any = noClassTeachers;

  const handleClose = (event?: any) => {
    constructAvailableTeacherDropDown(true);
    callBack();
  };


  const { institution } = useSelector((store: any) => {
    return store.loginReducer
  });

  const { divisionProvided } = useSelector((store: any) => {
    return store.addressFormStore;
  });

  const { availableGradesAndSections } = useSelector((store: any) => {
    return store.addressFormStore;
  });

  const [availableGrades, setAvailableGrades] = useState([]);

  const [availableSections, setavailableSections] = useState([]);


  useEffect(() => {
    if (divisionProvided.length < 1) {
      dispatch(getSchoolDetails(institution));
    }
    if (dropDownTeachers.length < 1) {
      dispatch(getNonClassTeachersList(institution));
    }

    if (availableGradesAndSections) {
      let grades: any = [];
      availableGradesAndSections.forEach((division: any) => {
        division.divisionGrade.forEach((grade: any) => {
          grades.push(grade.grade);
        });
      });

      setAvailableGrades(grades);
    }
    if (dropDownTeachers.length > 0) {
      constructAvailableTeacherDropDown()
    }
    if (grade && teacher.name != formik.values.teacherName) {
      if (formik.values.teacherName != "") {
        const classSection = grade.grade + (grade.section ? " " + grade.section : '');
        dispatch(getTeacherDetails(grade.institutionId, classSection, grade.teacher));
      }
    }

    if (grade && teacher.name == formik.values.teacherName) {
      setTimeout(() => {
        formik.setFieldValue('teacher', teacher, true);
      }, 1)
    }
  }, [dropDownTeachers, grade, teacher, availableGradesAndSections]);


  const constructAvailableTeacherDropDown = (onClose?: any) => {
    if (grade && teacher.name) {
      if (formik.values.teacherName === teacher.name) {
        if (!(dropDownTeachers.some((teach: any) => teach.name === teacher.name))) {
          dropDownTeachers.push(teacher);
        }
      }
    }

    if (onClose) {
      let index = 0;
      if (teacher) {
        dropDownTeachers.forEach((teach: any, i: any) => {
          if (teach.name === teacher.name) {
            index = i;
          }
        })
        dropDownTeachers.splice(index, 1);
      }
    }
    return (dropDownTeachers.map((item: any, index: any) => {
      return (
        <MenuItem value={item} key={index} style={{ maxHeight: 30 }} >
          {item.name}
        </MenuItem>
      );
    }))
  }

  const section = ["A", "B", "C", "D"];
  const sectionDropDown = availableSections.map((item: any, index: any) => {
    return (
      <MenuItem value={item} key={index} style={{ maxHeight: 30 }}>
        {item}
      </MenuItem>
    );
  });

  const gradesDropDown = availableGrades.map((item: any, index: any) => {
    return (
      <MenuItem value={item} key={index} style={{ maxHeight: 30 }}>
        {item}
      </MenuItem>
    );
  });

  const divisionDropDown = divisionProvided.map((item: any, index: any) => {
    return (
      <MenuItem value={item} key={index} style={{ maxHeight: '30px' }}>
        {item}
      </MenuItem>
    );
  });
  const changeTeacher = (teach: any) => {
    formik.handleChange(teach);
  }

  const divsionChange = (selectedDivision: any) => {
    const grades:any = [];
    formik.handleChange(selectedDivision);
    availableGradesAndSections.forEach((division: any) => {
      if(division.division === selectedDivision.target.value) {
        division.divisionGrade.forEach((grade:any) => {
          grades.push(grade.grade);
        });
      }
    });
    setAvailableGrades(grades);
  }

  const gradeonChange = (selectedGradeChange: any) => {
    const sections:any = [];
    formik.handleChange(selectedGradeChange);
    availableGradesAndSections.forEach((division: any)=> {
      if(division.division === formik.values.division) {
        division.divisionGrade.forEach((grade:any) => {
          if(grade.grade === selectedGradeChange.target.value) {
            grade.section.forEach((section:any)=>{
              if(!section.isCreated){
                sections.push(section.section)
              }
            })
          }
        });
      }
    });

    setavailableSections(sections.sort());
  }

  return (
    <ThemeProvider theme={drawerTheme}>
      <Drawer
        open={openDrawer}
        anchor='right'
        elevation={20}
        onClose={handleClose}
      >
        <div className={drawerClass.drawer}>
          <div className={drawerClass.header}>
            <h4>Create A New Class Room</h4>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Grid container className={drawerClass.form}>
              <Grid item xs={12} md={12}>
                <FormControl className={classes.drawerFormControl}>
                  <InputLabel className={classes.drawerLabel} shrink={false}>Division </InputLabel>
                  <Select
                    name="division"
                    id="division"
                    variant="outlined"
                    error={!!formik.errors.division && !!formik.touched.division}
                    value={formik.values.division}
                    onChange={(value: any) => { divsionChange(value) }}
                    onBlur={formik.handleBlur}
                  >
                    {divisionDropDown}
                  </Select>
                  {formik.errors.division && formik.touched.division && (
                    <strong className={classes.error}>
                      Division is Required
                </strong>
                  )}
                </FormControl>
              </Grid>
              {
                formik.values.division ? 
                <Grid item xs={12} md={12}>
                <FormControl className={classes.drawerFormControl}>
                  <InputLabel className={classes.drawerLabel} shrink={false}>Class</InputLabel>
                  <Select
                    name="grade"
                    id="section"
                    variant="outlined"
                    error={!!formik.errors.grade && !!formik.touched.grade}
                    value={formik.values.grade}
                    onChange={(value: any) => { gradeonChange(value) }}
                    onBlur={formik.handleBlur}
                  >
                    {gradesDropDown}
                  </Select>
                  {formik.errors.grade && formik.touched.grade && (
                    <strong className={classes.error}>
                      Class is Required
                </strong>
                  )}
                </FormControl>
              </Grid>
                : ''
              }
              
              <Grid item xs={12} md={12}>
                <FormControl className={classes.drawerFormControl}>
                  <InputLabel className={classes.drawerLabel} shrink={false}>Teacher </InputLabel>
                  <Select
                    name="teacher"
                    id="teacher"
                    variant="outlined"
                    error={!!formik.errors.teacher && !!formik.touched.teacher}
                    value={formik.values.teacher}
                    onChange={(value: any) => { changeTeacher(value) }}
                    onBlur={formik.handleBlur}
                  >
                    {constructAvailableTeacherDropDown()}
                  </Select>
                  {formik.errors.teacher && formik.touched.teacher && (
                    <strong className={classes.error}>
                      Teacher Name is Required
                </strong>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl className={classes.drawerFormControl}>
                  <InputLabel className={classes.drawerLabel} shrink={false}>Section</InputLabel>
                  <Select
                    name="section"
                    id="section"
                    variant="outlined"
                    error={!!formik.errors.section && !!formik.touched.section}
                    value={formik.values.section}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {sectionDropDown}
                  </Select>
                  {formik.errors.teacher && formik.touched.section && (
                    <strong className={classes.error}>
                      Section is Required
                </strong>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                {grade ? <strong>Class Strength {grade.strength}</strong> : ''}
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
                    onClick={handleClose}
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
  )
}

export default ClassAddDrawerComponent
