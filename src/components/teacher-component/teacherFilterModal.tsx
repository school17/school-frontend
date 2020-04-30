import React, { ReactElement } from 'react';
import {FormControl, InputLabel, TextField, Drawer} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Theme, createStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useFormik } from "formik";
import Grid from "@material-ui/core/Grid";
import {formUseStyles, textFieldTheme} from '../../utils/formStyles';
import {filterModalStyles} from '../../utils/modalStyles';
import { MuiThemeProvider } from "@material-ui/core/styles";
import {subjects} from '../../constants/subjects';
import {drawerTheme, useDrawerStyles} from '../../utils/drawerStyles';
interface Props {
  openFilterModal: any,
  callBack: any,
  filterValues: any
}

const useStyles = makeStyles((theme: Theme)=>(
  createStyles(
    {
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        border: '2px solid #000',
      },
    }
  )
));

function TeacherFilterModal({openFilterModal, callBack, filterValues}: Props): ReactElement {
  const classes = useStyles();
  const drawerClass = useDrawerStyles();
  const modalClasses = filterModalStyles();
  const formClasses = formUseStyles();
  const formik = useFormik({
    initialValues: {
      name: filterValues.name,
      email: filterValues.email,
      subjects: filterValues.subjects,
      grades: filterValues.grades
    },
    enableReinitialize: true,
    onSubmit: (values: any) => {
    }
  });
  const selectedSubjects = () => {
    let subjectsArray: any = [];
    if(filterValues.subjects && filterValues.subjects.length > 0) {
      subjects.forEach(subject =>{
        if(filterValues.subjects.indexOf(subject) >= 0 ){
          subjectsArray.push(subject)
        }
      })
    }
    return subjectsArray;
  }
  const setSubjects = (value:any) => {
    formik.values.subjects  = value;
  }

  const selectedGrades = () => {
    let gradesArray: any = [];
    if(filterValues.grades && filterValues.grades.length > 0) {
      grades.forEach(grade =>{
        if(filterValues.grades.indexOf(grade) >= 0 ){
          gradesArray.push(grade)
        }
      })
    }
    return gradesArray;
  }

  const setGrades = (value:any) => {
    formik.values.grades  = value;
  }

  const close = () => {
    callBack(formik.values)
  }
  const grades = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  return (
    
    <ThemeProvider theme={drawerTheme}>
    <Drawer
    open = {openFilterModal}
    anchor= 'right' 
    elevation = {20}
    onClose={close}
    >
        <div className= {drawerClass.drawer}>
        <div className = {drawerClass.header}>
          <h4>Apply Filter to Search Teachers</h4>
        </div>
          <form>
          <Grid container  className={drawerClass.form}>
            <Grid item xs={12} md={12}>
            <FormControl className={formClasses.drawerFormControl}>
                <InputLabel className={formClasses.drawerLabel}>Name</InputLabel>
                <TextField
                  name="name"
                  variant="outlined"
                  id="name"
                  required={true}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></TextField>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
            <FormControl className={formClasses.drawerFormControl}>
                <InputLabel className={formClasses.drawerLabel}>Email</InputLabel>
                <TextField
                  name="email"
                  variant="outlined"
                  id="email"
                  required={true}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></TextField>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl className={formClasses.drawerFormControl}>
                <InputLabel className={formClasses.drawerLabel}>Subjects</InputLabel>
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
              <FormControl className={formClasses.drawerFormControl}>
                <InputLabel className={formClasses.drawerLabel}>Classe</InputLabel>
                <Autocomplete
                  multiple
                  id="subjects-autocomplete"
                  options={grades}
                  getOptionLabel={(option) => option}
                  ListboxProps={{ style: { maxHeight: 200, overflow: 'auto' } }}
                  defaultValue={selectedGrades()}
                  onChange = {(event:any, value:any) => {setGrades(value)}}
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
          </Grid>
          </form>
        </div>
        </Drawer>
      </ThemeProvider>
  )
}

export default TeacherFilterModal


{/* <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    className={classes.modal}
    open={openFilterModal}
    closeAfterTransition
    onClose={() => { callBack(formik.values)}}
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  > </Modal>*/}