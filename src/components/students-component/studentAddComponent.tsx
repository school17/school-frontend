import React, { ReactElement, useEffect, useState } from 'react'
import { drawerTheme, useDrawerStyles } from '../../utils/drawerStyles';
import { useDispatch, useSelector } from "react-redux";
import { formUseStyles } from "../../utils/formStyles";
import Grid from "@material-ui/core/Grid";
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { Button } from "@material-ui/core";
import { getSchoolDetails } from "../../actions/address-form-actions";
import {saveStudent} from "../../actions/students-actions";
import DatePicker from 'react-date-picker';
import {
  ThemeProvider
} from "@material-ui/core/styles";
import { Drawer, TextField } from '@material-ui/core';
import { useFormik } from "formik";
import ImageUpload from '../../common/imageUpload';

interface Props {
  openDrawer: any,
  callBack: any,
  student?: any
}

function StudentDrawerComponent({openDrawer, callBack, student}: Props): ReactElement {
  const dispatch = useDispatch();
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
    if (!values.phone) {
      errors.email = "Required";
    } else if (values.phone.length > 25) {
      errors.phone = "Must be 30 characters or less";
    }
    if (!values.dob) {
      errors.dob = "Required";
    } else if (values.phone.length > 25) {
      errors.dob = "Must be 30 characters or less";
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

  const drawerClass = useDrawerStyles();
  const classes = formUseStyles();
  const [imageFile, setIimageFile] = useState();
  const handleClose = (event?: any) => {
    callBack()
  };

  const {institution} = useSelector((store:any) => {
    return store.loginReducer
  });

  const {divisionProvided} = useSelector((store:any) => {
    return store.addressFormStore;
  });

  const divisionDropDown = divisionProvided.map((item: any, index: any) => {
    return (
      <MenuItem value={item} key={index} style={{ maxHeight: '30px' }}>
        {item}
      </MenuItem>
    );
  });

  const saveImage = (image:any ) => {
    setIimageFile(image);
    setTimeout(() =>{
      formik.setFieldValue('picture', image);
    });
  }

  /*useEffect(()=> {
    dispatch(getSchoolDetails(institution));
  },[]);*/

  const { availableGradesAndSections } = useSelector((store: any) => {
    return store.addressFormStore;
  });
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

  const onDOBChange = (value:any) => {
    setTimeout(() => {
      formik.setFieldValue('dob', value, true);
    }, 1)
  }

  const formik = useFormik({
    initialValues: {
      name: student ? student.name:  '',
      division: student ? student.division:  '',
      email: student ? student.email:  '',
      grade: student ? student.grade: '',
      section: student ? student.section : '',
      address1: student ? student.address.address1 : '',
      address2: student ? student.address.address2 : '',
      street: student ? student.address.street : '',
      area: student ? student.address.area : '',
      city: student ? student.address.city : '',
      state: student ? student.address.state : '',
      pincode: student ? student.address.pincode : '',
      phone: student ? student.phone : '',
      dob: student ? student.dob: '',
      picture: '',
    },
    validate,
    isInitialValid: false,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      const isUpdate = student ? student.id : false;
      if(isUpdate) {
        Object.assign(student, values);
        values["institutionId"] = institution;
        dispatch(saveStudent(institution, student, isUpdate, imageFile));
      }else {
        values["institutionId"] = institution;
        dispatch(saveStudent(institution, values, isUpdate, imageFile));
      }
      formik.resetForm();
      handleClose();
    }
  });
  useEffect(()=>{
    if(formik.values.division) {
      const grades:any = [];
      availableGradesAndSections.forEach((division: any) => {
        if(division.division === formik.values.division) {
          division.divisionGrade.forEach((grade:any) => {
            grades.push(grade.grade);
          });
        }
      });
      setAvailableGrades(grades);
      const sections:any = [];
      availableGradesAndSections.forEach((division: any)=> {
        if(division.division === formik.values.division) {
          division.divisionGrade.forEach((grade:any) => {
            if(grade.grade === formik.values.grade) {
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
  },[formik.values])
  return (
    <ThemeProvider theme={drawerTheme}>
       <Drawer
          open = {openDrawer}
          anchor= 'right' 
          elevation = {20}
          onClose={handleClose}
    >
     <div className = {drawerClass.drawer}>
     <div className = {drawerClass.header}>
          <h4>Add A New Student</h4>
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
                    Student Name is Required
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
                <InputLabel className={classes.drawerLabel}>Contact Number</InputLabel>
                <TextField
                  name="phone"
                  variant="outlined"
                  id="phone"
                  required={true}
                  error={!!formik.errors.phone && !!formik.touched.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                ></TextField>
                {formik.errors.phone && formik.touched.phone && (
                  <strong className={classes.error}>
                    Phone Number is Required
                </strong>
                )}
      </FormControl>
      </Grid>

      <Grid item xs={12} md={12}>
      <FormControl className={classes.drawerFormControl}>
                <InputLabel className={classes.drawerLabel}>Date Of Birth</InputLabel>
                <DatePicker
                className = {classes.datePicker}
                onChange={onDOBChange}
                value={formik.values.dob}
                />
                {formik.errors.dob && (
                  <strong className={classes.error}>
                    Date of Birth is Required
                </strong>
                )}
      </FormControl>
      </Grid>

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
              {
                formik.values.grade? 
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
                  {formik.errors.section && formik.touched.section && (
                    <strong className={classes.error}>
                      Section is Required
                </strong>
                  )}
                </FormControl>
              </Grid> : ''
              }
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
                <ImageUpload saveImage={saveImage}></ImageUpload>
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

export default StudentDrawerComponent
