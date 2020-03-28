import React, { ReactElement, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  resetSchoolInfoForm,
  ValidSchoolInfoForm
} from "../../actions/address-form-actions";
import { useFormik } from "formik";
import { formUseStyles, textFieldTheme } from "../../utils/formStyles";
import { modes } from "../../constants/modes";
import InputLabel from "@material-ui/core/InputLabel";
import ImageUpload from "./imageUploader";
import { MuiThemeProvider } from "@material-ui/core/styles";

interface Props {}

export default function SchoolInfoForm({  }: Props): ReactElement {
  const classes = formUseStyles();
  const { mode,grades,phoneNumber,email, submitSchoolInfoForm } = useSelector((store: any) => {
    return store.addressFormStore;
  });
  const dispatch = useDispatch();

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.mode) {
      errors.mode = "Required";
    } else if (values.mode.length > 30) {
      errors.mode = "Must be 30 characters or less";
    }
    if (!values.grades) {
      errors.grades = "Required";
    } else if (values.grades.length > 30) {
      errors.grades = "Must be 30 characters or less";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Required";
    } else if (values.phoneNumber.length > 30) {
      errors.phoneNumber = "Must be 30 characters or less";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (values.email.length > 30) {
      errors.email = "Must be 30 characters or less";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      mode: mode,
      grades: grades,
      phoneNumber: phoneNumber,
      email: email
    },
    validate,
    onSubmit: (values: any) => {
      dispatch(ValidSchoolInfoForm(values));
    }
  });

  const modeDropDown = modes.map((item, index) => {
    return (
      <MenuItem value={item} key={index}>
        {item}
      </MenuItem>
    );
  });

  const [labelWidth, setLabelWidth] = React.useState(0);
  const submitForm = async () => {
    try {
      await formik.handleSubmit();
      if (!formik.isValid || !formik.dirty) {
        dispatch(resetSchoolInfoForm());
      }
    } catch (e) {
      alert("CAUGHT");
    }
  };
  useEffect(() => {
    if (submitSchoolInfoForm) {
      submitForm();
    }
  }, [submitSchoolInfoForm]);

  return (
    <MuiThemeProvider theme={textFieldTheme}>
      <div>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={12}>
              <ImageUpload></ImageUpload>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} className={classes.formFields}>
            <form onSubmit={formik.handleSubmit}>
              <Grid item xs={12} md={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel className={classes.label} shrink={false}>
                    Education mode
                  </InputLabel>
                  <Select
                    name="mode"
                    id="mode"
                    variant="outlined"
                    error={!!formik.errors.mode && !!formik.touched.mode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mode}
                  >
                    {modeDropDown}
                  </Select>
                  {formik.errors.mode && formik.touched.mode && (
                    <strong className={classes.error}>
                      Please select a mode of education
                    </strong>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel className={classes.label}>grades</InputLabel>
                  <TextField
                    variant="outlined"
                    name="grades"
                    id="grades"
                    required={true}
                    error={!!formik.errors.grades && !!formik.touched.grades}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.grades}
                  ></TextField>
                  {formik.errors.grades && formik.touched.grades && (
                    <strong className={classes.error}>Grade is required</strong>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel className={classes.label}>
                    Phone Number
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    name="phoneNumber"
                    id="phoneNumber"
                    required={true}
                    error={
                      !!formik.errors.phoneNumber &&
                      !!formik.touched.phoneNumber
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                  ></TextField>
                  {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                    <strong className={classes.error}>
                      Phone Number is required
                    </strong>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel className={classes.label}>email</InputLabel>
                  <TextField
                    variant="outlined"
                    name="email"
                    id="email"
                    required={true}
                    error={!!formik.errors.email && !!formik.touched.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  ></TextField>
                  {formik.errors.email && formik.touched.email && (
                    <strong className={classes.error}>Email is required</strong>
                  )}
                </FormControl>
                </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    </MuiThemeProvider>
  );
}
