import React, { ReactElement, useState } from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { formUseStyles, textFieldTheme } from "../../utils/formStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import {roles} from '../../constants/roles';
import MenuItem from "@material-ui/core/MenuItem";
import { useFormik } from "formik";
interface Props {}

function AddAdmins({  }: Props): ReactElement {
  const initialValues = {
    adminRole: 'Account Admin',
    AdminEmail: ''
  }
  const classes = formUseStyles();
  const [usersList, setUser] = useState([{}]);
  const formik = useFormik({
    initialValues,
    onSubmit: (values: any) => {
      addAdmin(values);
    }
  });
  const addAdmin = (values:any) => {
    setUser([
      ...usersList,
      {
        role: values.adminRole,
        email: values.AdminEmail
      }
    ])
    formik.handleReset(initialValues);
  }
  const rolesDropDown = roles.map((item: any, index: any) => {
    return (
      <MenuItem value={item} key={index}>
        {item}
      </MenuItem>
    );
  });

  const listAllUser = usersList.map((item:any, index: any) => {
    return(
      <div key={index}>
        <span>{item.role}</span>: <span>{item.email}</span>
      </div>
    )
  })
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
      <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} md={4}>
        <FormControl className={classes.formControl}>
                  <InputLabel className={classes.label} shrink={false}>
                    Select a role
                  </InputLabel>
                  <Select
                    name="adminRole"
                    id="adminRole"
                    variant="outlined"
                    defaultValue= "Account Admin"
                    value={formik.values.adminRole}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {rolesDropDown}
                  </Select>
                </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel className={classes.label}>Email</InputLabel>
            <TextField
              variant="outlined"
              name="AdminEmail"
              id="AdminEmail"
              value={formik.values.AdminEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required={true}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button variant="contained" color="primary" type="submit">
            Add Admin
          </Button>
        </Grid>
      </Grid>
      </form>
      {listAllUser}
    </div>
  );
}

export default AddAdmins;
