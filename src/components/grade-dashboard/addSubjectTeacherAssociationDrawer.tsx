import React, { ReactElement, useState, useEffect } from 'react';
import { Drawer, TextField } from '@material-ui/core';
import { useFormik } from "formik";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import { formUseStyles } from "../../utils/formStyles";
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {subjects} from "../../constants/subjects";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ListSubjectTeacherAssociation from './listSubjectTeacherAssociation';
import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import {saveSubjectTeacherAssociation, editSubjectTeacherAssociation} from "../../actions/grade-dashboard-actions";

interface Props {
  openDrawer: any,
  callBack: any,
  drawerClass:any,
  addedAssociation? :any
}

const useStyles = makeStyles({
  root: {
    minWidth: 350,
  },
  add: {
    display: "flex",
    alignItems: "center",
    color: "black"
  },
  addIcon: {
    fontSize: 30
  },
  table: {
    backgroundColor: "white",
    padding: "10px 20px"
  }
});

function AddSubjectTeacherAssociationDrawer({openDrawer, callBack, drawerClass, addedAssociation}: Props): ReactElement {
  const formClasses = formUseStyles();
  const classes = useStyles();
  let { grade, section } = useParams();
  const dispatch = useDispatch();
  const {subjectTeacherAssociation} = useSelector((store:any) => {
    return store.gradeDashboardReducer;
  });
  const {institution} = useSelector((store:any) => {
    return store.loginReducer;
  });

  const {teachersPayload} = useSelector((store: any)=> {
    return store.teacherReducer;
  });

  const [associations, setAssociations]:any = useState([])
  const [deleteAssociation, setDeleteAssociation]:any  = useState(false)

  useEffect(()=>{
    if(addedAssociation) {
      setAssociations(addedAssociation);
    }
  },[addedAssociation])

  const subjectsDropDown = subjects.map((item: any, index: any) => {
    return (
      <MenuItem value={item} key={index} style={{ maxHeight: '30px' }}>
        {item}
      </MenuItem>
    );
  });

  const teachersDropDown = teachersPayload.teachers.map((item:any, index:any) => {
    return (
      <MenuItem value={item.name} key={index} style={{ maxHeight: '30px' }}>
      {item.name}
    </MenuItem>
    )
  })

  const handleClose = (event?: any) => {
    callBack()
  };
  const validate = (values: any) => {
    const errors: any = {};
    if (!values.subject) {
      errors.subject = "Required";
    }
    if (!values.teacher) {
      errors.teacher = "Required";
    }
    return errors;
  }
  const formik = useFormik({
    initialValues: {
      subject: '',
      teacher: ''
    },
    validate,
    isInitialValid: false,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      if(formik.isValid) {
        const object = {[values.subject]: values.teacher}
        setAssociations([object, ...associations])
        formik.resetForm();
      }
      //handleClose();
    }
  });

  const saveAssociation = () => {
    if(addedAssociation){
      subjectTeacherAssociation.subjectTeachers = associations
      dispatch(editSubjectTeacherAssociation(institution, grade, section, subjectTeacherAssociation))
    }else {
      dispatch(saveSubjectTeacherAssociation(institution, grade, section, associations));
    }
    handleClose();
  }

  const removeFaculty = (faculty:any) => {
    setDeleteAssociation(true);
    associations.forEach((association:any, index:any) => {
      if(faculty == association){
        associations.splice(index, 1)
      }
    });
    setAssociations(associations);
   setTimeout(()=>{
    setDeleteAssociation(false);
   },1)
  }

  const showList = () => {
    if(associations.length > 0 && !deleteAssociation) {
      return (
        <div className={classes.table}>
        <ListSubjectTeacherAssociation association={associations} 
        showEdit={false} hideHeading={true} hasRemoveAbility={true} removeFaculty={removeFaculty}></ListSubjectTeacherAssociation>
        </div>
      )
    }
  }
  return (
    <div>
      <Drawer
          open = {openDrawer}
          anchor= 'right' 
          elevation = {20}
          onClose={handleClose}
      >
       <div className = {drawerClass.drawer}>
       <div className = {drawerClass.header}>
          <h4 className={classes.root}> Add Faculty to Subjects </h4>
      </div>
      <form onSubmit={formik.handleSubmit}>
      <Grid container className={drawerClass.form}>
      <Grid item xs={10} md={10}>
      <FormControl className={formClasses.drawerFormControl}>
      <InputLabel className={formClasses.drawerLabel} shrink={false}>Subject </InputLabel>
                  <Select
                    name="subject"
                    id="subject"
                    variant="outlined"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {subjectsDropDown}
                  </Select>
                  {formik.errors.subject && formik.touched.subject && (
                    <strong className={formClasses.error}>
                      Subject is Required
                </strong>
                  )}
      </FormControl>
      </Grid>
      <Grid item xs={10} md={10}>
      <FormControl className={formClasses.drawerFormControl}>
      <InputLabel className={formClasses.drawerLabel} shrink={false}>Faculty </InputLabel>
                  <Select
                    name="teacher"
                    id="teacher"
                    variant="outlined"
                    value={formik.values.teacher}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {teachersDropDown}
                  </Select>
                  {formik.errors.teacher && formik.touched.teacher && (
                    <strong className={formClasses.error}>
                      Teacher is Required
                </strong>
                  )}
      </FormControl>
      </Grid>
      <Grid item xs={2} md={2} className={classes.add}>
        <AddCircleOutlineIcon className={classes.addIcon} onClick={()=>formik.handleSubmit()}></AddCircleOutlineIcon>           
      </Grid>
      <Grid item xs={12} md={12}>
                <div  className={drawerClass.buttonContainer}> 
                <Button
                  variant="contained"
                  color="primary"
                  className = {drawerClass.button}
                  onClick = {saveAssociation}
                  disabled = {associations.length < 1}
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
      {showList()}
      
      
       </div>
      
      </Drawer>
    </div>
  )
}

export default AddSubjectTeacherAssociationDrawer
