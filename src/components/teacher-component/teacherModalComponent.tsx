import React, { ReactElement, useEffect, useState } from 'react'
import { formUseStyles } from "../../utils/formStyles";
import { ThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { InputLabel } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { useFormik, Field } from "formik";
import Autocomplete from '@material-ui/lab/Autocomplete';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {Drawer} from '@material-ui/core';
import {subjects} from '../../constants/subjects';
import Button from "@material-ui/core/Button";
import { saveTeacherAction } from '../../actions/teacher-action'; 
import { useDispatch, useSelector } from "react-redux";
import {drawerTheme, useDrawerStyles} from '../../utils/drawerStyles';
import {getSchoolDetails} from "../../actions/address-form-actions";
import ImageUpload from '../../common/imageUpload';
import {
  createStyles,
  makeStyles,
  Theme
} from "@material-ui/core/styles";

interface Props {
  opeModel: boolean,
  callBack: any,
  teacher?: any
}

const validate = (values: any) => {
  const errors: any = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 30) {
    errors.name = "Must be 30 characters or less";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (values.email.length > 30) {
    errors.email = "Must be 30 characters or less";
  }
  if (!values.division) {
    errors.division = "Required";
  } else if (values.division.length > 30) {
    errors.division = "Must be 30 characters or less";
  }

  if (!values.address1) {
    errors.address1 = "Required";
  } else if (values.address1.length > 30) {
    errors.address1 = "Must be 30 characters or less";
  }
  if (!values.address2) {
    errors.address2 = "Required";
  } else if (values.address2.length > 30) {
    errors.address2 = "Must be 30 characters or less";
  }
  if (!values.street) {
    errors.street = "Required";
  } else if (values.street.length > 30) {
    errors.street = "Must be 30 characters or less";
  }
  if (!values.area) {
    errors.area = "Required";
  } else if (values.area.length > 30) {
    errors.area = "Must be 30 characters or less";
  }
  if (!values.city) {
    errors.city = "Required";
  } else if (values.city.length > 30) {
    errors.city = "Must be 30 characters or less";
  }
  if (!values.state) {
    errors.state = "Required";
  } else if (values.state.length > 30) {
    errors.state = "Must be 30 characters or less";
  }
  if (!values.pincode) {
    errors.pincode = "Required";
  } else if (values.pincode.length > 30) {
    errors.pincode = "Must be 30 characters or less";
  }
  
  return errors;
};


function TeacherModalComponent({ opeModel, callBack, teacher }: Props): ReactElement {
  const drawerClass = useDrawerStyles();
  const classes = formUseStyles();
  const handleClose = (event?: any) => {
    callBack()
  };

  const {institution} = useSelector((store:any) => {
    return store.loginReducer
  });

  const {divisionProvided} = useSelector((store:any) => {
    return store.addressFormStore;
  });

  useEffect(()=> {
    dispatch(getSchoolDetails(institution));
  },[])

  const divisionDropDown = divisionProvided.map((item: any, index: any) => {
    return (
      <MenuItem value={item} key={index}>
        {item}
      </MenuItem>
    );
  });

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: teacher ? teacher.name:  '',
      division: teacher ? teacher.division:  '',
      email: teacher ? teacher.email:  '',
      grades: teacher ? teacher.grades:  [],
      subjects: teacher ? teacher.subjects : [],
      address1: teacher ? teacher.address.address1 : '',
      address2: teacher ? teacher.address.address2 : '',
      street: teacher ? teacher.address.street : '',
      area: teacher ? teacher.address.area : '',
      city: teacher ? teacher.address.city : '',
      state: teacher ? teacher.address.state : '',
      pincode: teacher ? teacher.address.pincode : '',
    },
    validate,
    isInitialValid: false,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      const isUpdate = teacher ? teacher.id : false;
      dispatch(saveTeacherAction(institution, values, isUpdate));
      handleClose();
    }
  });
  const selectedGrades = () => {
    let gradesArray: any = [];
    if(teacher) {
      grades.forEach(grade =>{
        if(teacher.grades.indexOf(grade) >= 0 ){
          gradesArray.push(grade)
        }
      })
    }
    return gradesArray;
  }

  const selectedSubjects = () => {
    let subjectsArray: any = [];
    if(teacher) {
      subjects.forEach(subject =>{
        if(teacher.subjects.indexOf(subject) >= 0 ){
          subjectsArray.push(subject)
        }
      })
    }
    return subjectsArray;
  }


  const grades = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  const setGrades = (value:any) => {
    setTimeout(() => {
      formik.setFieldValue('grades', value, true);
    }, 1);
  }

  const {saved} = useSelector((store:any)=> {
    return store.teacherReducer
  })

  const setSubjects = (value:any) => {
    setTimeout(() => {
      formik.setFieldValue('subjects', value, true);
    }, 1);
  }
  return (

    <ThemeProvider theme={drawerTheme}>
    <Drawer
    open = {opeModel}
    anchor= 'right' 
    elevation = {20}
    onClose={handleClose}
    >
      <div className = {drawerClass.drawer}>
        <div className = {drawerClass.header}>
          <h4>Add A New Teacher</h4>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Grid container className={drawerClass.form}>
            <Grid item xs={12} md={12}>
              <FormControl className={classes.drawerFormControl}>
                <InputLabel className={classes.drawerLabel}>Name</InputLabel>
                <TextField
                  name="name"
                  variant="outlined"
                  id="name"
                  required={true}
                  error={!!formik.errors.name && !!formik.touched.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                ></TextField>
                {formik.errors.name && formik.touched.name && (
                  <strong className={classes.error}>
                    Teacher Name is Required
                </strong>
                )}
              </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
              <FormControl className={classes.drawerFormControl}>
                <InputLabel className={classes.drawerLabel}>Email</InputLabel>
                <TextField
                  name="email"
                  variant="outlined"
                  id="email"
                  required={true}
                  error={!!formik.errors.email && !!formik.touched.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                ></TextField>
                {formik.errors.email && formik.touched.email && (
                  <strong className={classes.error}>
                    Email is Required
                </strong>
                )}
              </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
              <FormControl className={classes.drawerFormControl}>
                <InputLabel className={classes.drawerLabel} shrink={false}>
                  Select a division
                </InputLabel>
                <Select
                  name="division"
                  id="division"
                  variant="outlined"
                  error={!!formik.errors.division && !!formik.touched.division}
                  value={formik.values.division}
                  onChange={formik.handleChange}
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
            <Grid item xs={12} md={12}>
              <FormControl className={classes.drawerFormControl}>
                <InputLabel className={classes.drawerLabel}>Classes</InputLabel>
                <Autocomplete
                  multiple
                  id="grades-outlined"
                  options={grades}
                  getOptionLabel={(option) => option}
                  ListboxProps={{ style: { maxHeight: 200, overflow: 'auto' } }}
                  defaultValue={selectedGrades()}
                  filterSelectedOptions
                  onChange = {(event:any, value:any) => {setGrades(value)}}
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
              <FormControl className={classes.drawerFormControl}>
                <InputLabel className={classes.drawerLabel}>Subjects</InputLabel>
                <Autocomplete
                  multiple
                  id="subjects-autocomplete"
                  options={subjects}
                  getOptionLabel={(option) => option}
                  ListboxProps={{ style: { maxHeight: 200, overflow: 'auto' } }}
                  defaultValue={selectedSubjects()}
                  onChange = {(event:any, value:any) => {setSubjects(value)}}
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
              <FormControl className={classes.drawerFormControl}>
                <InputLabel className={classes.drawerLabel}>Address 1</InputLabel>
                <TextField
                  name="address1"
                  variant="outlined"
                  id="address1"
                  required={true}
                  error={!!formik.errors.address1 && !!formik.touched.address1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address1}
                ></TextField>
                {formik.errors.address1 && formik.touched.address1 && (
                  <strong className={classes.error}>
                    Address is Required
                </strong>
                )}
              </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
              <FormControl className={classes.drawerFormControl}>
                <InputLabel className={classes.drawerLabel}>Address 2</InputLabel>
                <TextField
                  name="address2"
                  variant="outlined"
                  id="address2"
                  required={true}
                  error={!!formik.errors.address2 && !!formik.touched.address2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address2}
                ></TextField>
                {formik.errors.address2 && formik.touched.address2 && (
                  <strong className={classes.error}>
                    Address 2 is Required
                </strong>
                )}
              </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
              <FormControl className={classes.drawerFormControl}>
                <InputLabel className={classes.drawerLabel}>Street</InputLabel>
                <TextField
                  name="street"
                  variant="outlined"
                  id="street"
                  required={true}
                  error={!!formik.errors.street && !!formik.touched.street}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street}
                ></TextField>
                {formik.errors.street && formik.touched.street && (
                  <strong className={classes.error}>
                    Street is Required
                </strong>
                )}
              </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
              <FormControl className={classes.drawerFormControl}>
                <InputLabel className={classes.drawerLabel}>Area</InputLabel>
                <TextField
                  name="area"
                  variant="outlined"
                  id="area"
                  required={true}
                  error={!!formik.errors.area && !!formik.touched.area}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.area}
                ></TextField>
                {formik.errors.area && formik.touched.area && (
                  <strong className={classes.error}>
                    Area is Required
                </strong>
                )}
              </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
              <FormControl className={classes.drawerFormControl}>
                <InputLabel className={classes.drawerLabel}>City</InputLabel>
                <TextField
                  name="city"
                  variant="outlined"
                  id="city"
                  required={true}
                  error={!!formik.errors.city && !!formik.touched.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                ></TextField>
                {formik.errors.city && formik.touched.city && (
                  <strong className={classes.error}>
                    City is Required
                </strong>
                )}
              </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
              <FormControl className={classes.drawerFormControl}>
                <InputLabel className={classes.drawerLabel}>State</InputLabel>
                <TextField
                  name="state"
                  variant="outlined"
                  id="state"
                  required={true}
                  error={!!formik.errors.state && !!formik.touched.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                ></TextField>
                {formik.errors.state && formik.touched.state && (
                  <strong className={classes.error}>
                    State is Required
                </strong>
                )}
              </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
              <FormControl className={classes.drawerFormControl}>
                <InputLabel className={classes.drawerLabel}>Pin code</InputLabel>
                <TextField
                  name="pincode"
                  variant="outlined"
                  id="pincode"
                  //className = {drawerClass.pincode}
                  required={true}
                  error={!!formik.errors.pincode && !!formik.touched.pincode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pincode}
                ></TextField>
                {formik.errors.pincode && formik.touched.pincode && (
                  <strong className={classes.error}>
                    Pincode is Required
                </strong>
                )}
              </FormControl>

               <FormControl className={classes.drawerFormControl}>
                <InputLabel className={classes.drawerLabel}>Upload your Image</InputLabel>
                <div className = {drawerClass.pincode}>
                <ImageUpload ></ImageUpload>
                </div>
                 
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
                  onClick = {handleClose}
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
  )
}

export default TeacherModalComponent
