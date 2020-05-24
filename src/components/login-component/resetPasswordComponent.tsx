import React, { ReactElement, useEffect} from "react";
import classes from "*.module.css";
import Grid from "@material-ui/core/Grid";
import {
  makeStyles,
  Theme,
  createStyles,
  MuiThemeProvider
} from "@material-ui/core/styles";
import { InputLabel, FormControl, TextField } from "@material-ui/core";
import { formUseStyles, textFieldTheme } from "../../utils/formStyles";
import {
  resetPassword
} from "../../actions/user-details-action";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import {
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
interface Props {}


const validate = (values: any) => {
  const errors: any = {};
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Must be 30 characters or less";
  }

  if (!values.conform) {
    errors.conform = "Required";
  } else if (values.conform.length < 8) {
    errors.conform = "Must be 30 characters or less";
  } else if (values.conform !== values.password) {
    errors.conform = "Password should be same";
  }
  return errors;
};
function ResetPasswordComponent({  }: Props): ReactElement {
  const  {user} = useSelector((store: any) => {
    return store.userDetailsReducer
  });
  let history = useHistory();
  let location = useLocation();
  useEffect(() => {
    if(!user.temporaryPassword) {
      history.replace('/');
    }
  }, [user])
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      formContainer: {
        width: "50%",
        border: "solid 2px #F8F8F8",
        margin: "auto",
        borderRadius: "4px",
        paddingBottom: "20px"
      },
      header: {
        display: "flex",
        paddingLeft: "13%",
        backgroundColor: "#F8F8F8"
      },
      form: {
        marginTop: "25px"
      },
      buttonContainer: {
        display: "flex",
        flexDirection: "column-reverse",
        margin: "0 12%"
      },
      customButton: {
        padding: "12px"
      }
    })
  );
  const classes = useStyles();
  const formClasses = formUseStyles();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
      conform: ""
    },
    validate,
    onSubmit: (values: any) => {
      const userDetails = {
        institution: user ? user.institution: "",
        email: user ?user.email : "",
        password: values.password
      }
      if(values.conform === values.password) {
        dispatch(resetPassword(userDetails));
      }
    }
  });
  return (
    <div className="reset-container">
      <div className={classes.formContainer}>
        <MuiThemeProvider theme={textFieldTheme}>
          <div>
            <div className={classes.header}>
              <h4>RESET PASSWORD</h4>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <Grid container className={classes.form}>
                <Grid item xs={12} md={12}>
                  <FormControl className={formClasses.formControl}>
                    <InputLabel className={formClasses.label}>
                      Password
                    </InputLabel>
                    <TextField
                      name="password"
                      variant="outlined"
                      id="password"
                      type="password"
                      required={true}
                      error={
                        !!formik.errors.password && !!formik.touched.password
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    ></TextField>
                    {formik.errors.password && formik.touched.password && (
                      <strong className={formClasses.error}>
                        Password is Required
                      </strong>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl className={formClasses.formControl}>
                    <InputLabel className={formClasses.label}>
                      Confirm Password
                    </InputLabel>
                    <TextField
                      name="conform"
                      variant="outlined"
                      id="conform"
                      type="password"
                      required={true}
                      error={
                        !!formik.errors.conform && !!formik.touched.conform
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.conform}
                    ></TextField>
                    {formik.errors.conform && formik.touched.conform && (
                      <strong className={formClasses.error}>
                        {formik.errors.conform}
                      </strong>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12} className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.customButton}
                    type="submit"
                    disabled = {!formik.isValid}
                  >
                    RESET
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </MuiThemeProvider>
      </div>
    </div>
  );
}

export default ResetPasswordComponent;
