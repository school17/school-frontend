import React, { ReactElement } from 'react';
import { drawerTheme, useDrawerStyles } from '../../utils/drawerStyles';
import {FormControl, InputLabel, TextField, Drawer, Grid} from "@material-ui/core";
import { Theme, createStyles, makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {filterModalStyles} from '../../utils/modalStyles';
import {formUseStyles, textFieldTheme} from '../../utils/formStyles';
import { useFormik } from "formik";
interface Props {
  openFilterDrawer: any,
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

function StudentFilterDrawer({openFilterDrawer,
  callBack,
  filterValues}: Props): ReactElement {
  const classes = useStyles();
  const drawerClass = useDrawerStyles();
  const modalClasses = filterModalStyles();
  const formClasses = formUseStyles();
  const close = () => {
    callBack(formik.values)
  }
  const formik = useFormik({
    initialValues: {
      name: filterValues.name,
      email: filterValues.email,
      grade: filterValues.grade,
      section: filterValues.section,
      division: filterValues.division
    },
    enableReinitialize: true,
    onSubmit: (values: any) => {
    }
  });
  return (
    <ThemeProvider theme={drawerTheme}>
    <Drawer
    open = {openFilterDrawer}
    anchor= 'right' 
    elevation = {20}
    onClose={close}
    >
    <div className= {drawerClass.drawer}>
     <div className = {drawerClass.header}>
        <h4>Apply Filter to Search Students</h4>
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
    </Grid>
    </form>
     </div>
    </Drawer>
     
    </ThemeProvider>
  )
}

export default StudentFilterDrawer
