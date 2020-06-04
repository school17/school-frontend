import React, { ReactElement, useState} from 'react'
import {
  ThemeProvider
} from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import { drawerTheme, useDrawerStyles } from '../../../utils/drawerStyles';
import Grid from "@material-ui/core/Grid";
import { formUseStyles } from "../../../utils/formStyles";
import FormControl from "@material-ui/core/FormControl";
import { Button } from "@material-ui/core";
interface Props {
  callBack: any,
}

function SelectGradeOptions({callBack}: Props): ReactElement {
  const {divisionProvided} = useSelector((store:any) => {
    return store.addressFormStore;
  });
  const { availableGradesAndSections } = useSelector((store: any) => {
    return store.addressFormStore;
  });
  const drawerClass = useDrawerStyles();
  const classes = formUseStyles();
  const [availableSections, setavailableSections] = useState([]);
  const [availableGrades, setAvailableGrades] = useState([]);
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
              if(!section.created){
                sections.push(section.section)
              }
            })
          }
        });
      }
    });

    setavailableSections(sections.sort());
  }

  

  const gradesDropDown = availableGrades.map((item: any, index: any) => {
    return (
      <MenuItem value={item} key={index} style={{ maxHeight: 30 }}>
        {item}
      </MenuItem>
    );
  });

  const sectionDropDown = availableSections.map((item: any, index: any) => {
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

  const month = ["JANUARY", "FEBURARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"]

  const monthDropDown = month.map((item: any, index: any) => {
    return (
      <MenuItem value={item} key={index} style={{ maxHeight: '30px' }}>
        {item}
      </MenuItem>
    );
  });

  const formik = useFormik({
    initialValues: {
      division: '',
      grade: '',
      section: '',
      month: "JANUARY",
      monthIndex: 1
    },
    isInitialValid: false,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      values.monthIndex = month.indexOf(values.month) + 1;
      callBack(values);
    }
  });
  return (
    <ThemeProvider theme={drawerTheme}>
      <form onSubmit={formik.handleSubmit}>
      <Grid container className={drawerClass.form}>
      <Grid item xs={6} md={2}>
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
                <Grid item xs={6} md={1}>
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
              {
                formik.values.grade? 
                <Grid item xs={6} md={1}>
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
                  {formik.errors.section && formik.touched.section && (
                    <strong className={classes.error}>
                      Section is Required
                </strong>
                  )}
                </FormControl>
              </Grid> : ''
              }
              {
                 formik.values.section? 
                 <Grid item xs={12} md={1}>
               <FormControl className={classes.drawerFormControl}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className = {drawerClass.searchButton}
                >
                  FIND 
                </Button>
                </FormControl>
                </Grid> : ''
              }
      </Grid>
      </form>
    </ThemeProvider>
  )
}

export default SelectGradeOptions
