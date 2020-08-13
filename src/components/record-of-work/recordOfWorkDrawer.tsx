import React, { ReactElement } from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useFormik } from "formik";
import { Button } from "@material-ui/core";
import { InputLabel, FormControl, TextareaAutosize} from "@material-ui/core";
import { drawerTheme, useDrawerStyles } from '../../utils/drawerStyles';
import { formUseStyles } from "../../utils/formStyles";

interface Props {
  week:any,
  month: any,
  setAddRecordOfWorkDrawer:any,
  addRecordOfWork:any,
  work:any,
  constructAndSaveRecordOfWork:any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      padding: 10,
      background: "#FFF",
      borderRadius: 10,
      flexDirection: "column",
      alignItems: "self-end"
    },
    root: {
      minWidth: 350,
    },
    month: {
      fontSize: 14,
      color: "black",
      fontWeight: "bolder",
      margin: 25
    }
  })
)

function RecordOfWorkDrawer({week, month, setAddRecordOfWorkDrawer, addRecordOfWork, work, constructAndSaveRecordOfWork}: Props): ReactElement {
  const drawerClass = useDrawerStyles();
  const classes = useStyles();
  const formStyles = formUseStyles();
  const validate = (values:any) => {
    const errors: any = {};
    
    if(!values.work) {
      errors.work = "Required";
    }

    return errors;
  }
  const formik = useFormik({
    initialValues: {
     work: work? work :''
    },
    validate,
    isInitialValid: false,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      addRecordOfWork(month, week, values);
      setAddRecordOfWorkDrawer(false);
      constructAndSaveRecordOfWork();
    }
  });
  return (
     <div className = {drawerClass.drawer}>
     <div className = {drawerClass.header}>
          <h4 className={classes.root}>Add Record Of Work</h4>
      </div>
      <form onSubmit={formik.handleSubmit}>
      <Grid container className={drawerClass.form}>
      <span className={classes.month}>{month} - {week}</span>
      <Grid item xs={12} md={12}>
      <FormControl className={formStyles.drawerFormControl}>
      <InputLabel className={formStyles.drawerLabel}>Activity to be done</InputLabel>
      <TextareaAutosize
                  className={formStyles.textArea}
                  name="work"
                  id="work"
                  rowsMax={10}
                  rowsMin={5}
                  required={true}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.work}
                ></TextareaAutosize>
                {formik.errors.work && formik.touched.work && (
                  <strong className={formStyles.error}>
                   Enter Syllabus
                </strong>
                )}
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
                  onClick = {()=>{setAddRecordOfWorkDrawer(false)}}
                  className ={drawerClass.customButton}
                >
                  Cancel 
                </Button>
                </div>
              </Grid>
      </Grid>
      </form>
     </div>
  )
}

export default RecordOfWorkDrawer
