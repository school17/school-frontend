import React, { ReactElement, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import {
  ValidAddressForm,
  resetAddressForm
} from "../../actions/address-form-actions";
import { useFormik, Field } from "formik";
import { formUseStyles, textFieldTheme } from "../../utils/formStyles";
import { AnyAction } from "redux";
import { InputLabel } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";

interface ISchoolAddressProps {
  name: string;
  branch: string;
  address1: string;
  address2: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
}

const validate = (values: any) => {
  const errors: any = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 30) {
    errors.name = "Must be 30 characters or less";
  }
  if (!values.branch) {
    errors.branch = "Required";
  } else if (values.branch.length > 30) {
    errors.branch = "Must be 30 characters or less";
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

export default function AddressFrom(): ReactElement {
  const classes = formUseStyles();
  const dispatch = useDispatch();
  const submitAddressForm = useSelector(
    (store: AnyAction) => store.addressFormStore.submitAddressForm
  );
  const { name, branch, address } = useSelector((store: any) => {
    return store.addressFormStore;
  });
  const formik = useFormik({
    initialValues: {
      name: name,
      branch: branch,
      address1: address.address1,
      address2: address.address2,
      street: address.street,
      area: address.area,
      city: address.city,
      state: address.state,
      pincode: address.pincode
    },
    validate,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      dispatch(ValidAddressForm(values));
    }
  });

  const submitForm = async () => {
    try {
      await formik.handleSubmit();
      if (!formik.isValid || !formik.dirty) {
        dispatch(resetAddressForm());
      }
    } catch (e) {
      alert("CAUGHT");
    }
  };
  useEffect(() => {
    if (submitAddressForm) {
      submitForm();
    }
  }, [submitAddressForm]);
  return (
    <MuiThemeProvider theme={textFieldTheme}>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.label}>School Name</InputLabel>
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
                    School Name is Required
                  </strong>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.label}>Branch</InputLabel>
                <TextField
                  variant="outlined"
                  name="branch"
                  id="branch"
                  error={!!formik.errors.branch && !!formik.touched.branch}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.branch}
                  required={true}
                ></TextField>
                {formik.errors.branch && formik.touched.branch && (
                  <strong className={classes.error}>
                    Branch Name is Required
                  </strong>
                )}
              </FormControl>
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.label}>Address 1</InputLabel>
                <TextField
                  variant="outlined"
                  name="address1"
                  id="address1"
                  error={!!formik.errors.address1 && !!formik.touched.address1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address1}
                  required={true}
                ></TextField>
                {formik.errors.address1 && formik.touched.address1 && (
                  <strong className={classes.error}>Address is Required</strong>
                )}
              </FormControl>
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.label}>Address 2</InputLabel>
                <TextField
                  variant="outlined"
                  name="address2"
                  id="address2"
                  error={!!formik.errors.address2 && !!formik.touched.address2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address2}
                ></TextField>
                <strong className={classes.error}>
                  {formik.errors.address2 && "Address is required"}
                </strong>
              </FormControl>
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.label}>street</InputLabel>
                <TextField
                  variant="outlined"
                  name="street"
                  id="street"
                  error={!!formik.errors.street && !!formik.touched.street}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street}
                  required={true}
                ></TextField>
                {formik.errors.street && formik.touched.street && (
                  <strong className={classes.error}>street is Required</strong>
                )}
              </FormControl>
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.label}>area</InputLabel>
                <TextField
                  variant="outlined"
                  name="area"
                  id="area"
                  error={!!formik.errors.area && !!formik.touched.area}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.area}
                  required={true}
                ></TextField>
                <strong className={classes.error}>
                  {formik.errors.area && "area is required"}
                </strong>
              </FormControl>
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.label}>city</InputLabel>
                <TextField
                  variant="outlined"
                  name="city"
                  id="city"
                  error={!!formik.errors.city && !!formik.touched.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  required={true}
                ></TextField>
                <strong className={classes.error}>
                  {formik.errors.city && "city is required"}
                </strong>
              </FormControl>
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.label}>state</InputLabel>
                <TextField
                  variant="outlined"
                  name="state"
                  id="state"
                  error={!!formik.errors.state && !!formik.touched.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                  required={true}
                ></TextField>
                <strong className={classes.error}>
                  {formik.errors.state && "state is required"}
                </strong>
              </FormControl>
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.label}>pincode</InputLabel>
                <TextField
                  variant="outlined"
                  name="pincode"
                  id="pincode"
                  error={!!formik.errors.pincode && !!formik.touched.pincode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pincode}
                  required={true}
                ></TextField>
                <strong className={classes.error}>
                  {formik.errors.pincode && "Pincodeis required"}
                </strong>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </div>
    </MuiThemeProvider>
  );
}
