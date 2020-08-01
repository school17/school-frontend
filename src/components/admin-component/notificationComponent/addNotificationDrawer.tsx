import React, { ReactElement } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider,
  withStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import { useDrawerStyles } from "../../../utils/drawerStyles";
import { formUseStyles } from "../../../utils/formStyles";
import { useFormik } from "formik";
import { notificationType } from "../../../constants/notificationType";
import { Button } from "@material-ui/core";
import { Drawer } from "@material-ui/core";
import { drawerTheme } from "../../../utils/drawerStyles";
import { InputLabel, Select, MenuItem, TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import {CustomSwitch} from "../../../utils/formStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import { saveNotifications } from "../../../actions/notification-actions";
import { useDispatch, useSelector } from "react-redux";
interface Props {
  openAdminNotificationDrawer: any;
  setOpenAdminNotificationDrawer: any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)",
    },

    container: {
      padding: 20,
      fontWeight: "bold",
    },
  })
);

export default function AddNotificationDrawer({
  openAdminNotificationDrawer,
  setOpenAdminNotificationDrawer,
}: Props): ReactElement {
  const handleChange = (event: any) => {
    if (event.target.checked === true) {
      formik.values.hasFeedback = true;
    }
  };
  const dispatch = useDispatch();
  const drawerClass = useDrawerStyles();
  const formStyles = formUseStyles();
  const classes = useStyles();
  const validate = (values: any) => {
    const errors: any = {};
    if (!values.notificationType) {
      errors.notificationType = "Required";
    }
    if (!values.message) {
      errors.message = "Required";
    }
    return errors;
  };
  const { institution } = useSelector((store: any) => {
    return store.loginReducer;
  });
  const formik = useFormik({
    initialValues: {
      notificationType: "",
      message: "",
      hasFeedback: false,
    },
    validate,
    isInitialValid: false,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      const payload: any = Object.assign(formik.values);
      payload["institutionId"] = institution;
      dispatch(saveNotifications(institution, payload));
      setOpenAdminNotificationDrawer(false);
      formik.resetForm();
    },
  });
  const notificationTypeDropDown = notificationType.map(
    (item: string, index: any) => {
      return (
        <MenuItem value={item} key={index}>
          {item}
        </MenuItem>
      );
    }
  );
  return (
    <ThemeProvider theme={drawerTheme}>
      <Drawer
        open={openAdminNotificationDrawer}
        anchor="right"
        elevation={20}
        onClose={() => {
          setOpenAdminNotificationDrawer(false);
        }}
      >
        <div className={drawerClass.drawer}>
          <div className={drawerClass.header}>
            <h4 className={classes.root}>Add Notification</h4>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Grid container className={drawerClass.form}>
              <Grid item xs={12} md={12}>
                <FormControl className={formStyles.drawerFormControl}>
                  <InputLabel className={formStyles.drawerLabel} style={{color:"black"}} shrink={false}>
                    Notification Type
                  </InputLabel>
                  <div style={{ display: "flex" }}>
                    <Select
                      name="notificationType"
                      id="notificationType"
                      variant="outlined"
                      style={{ width: "200px"}}
                      error={
                        !!formik.errors.notificationType &&
                        !!formik.touched.notificationType
                      }
                      value={formik.values.notificationType}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    >
                      {notificationTypeDropDown}
                    </Select>
                    <FormControlLabel
                      style={{ marginLeft: "70px" , color: "black"}}
                      name="hasFeedback"
                      id="hasFeedback"
                      label="Feedback"
                      labelPlacement="bottom"
                      control={<CustomSwitch onChange={handleChange} />}
                      
                      value={formik.values.hasFeedback}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik.errors.notificationType &&
                    formik.touched.notificationType && (
                      <strong className={formStyles.error}>
                        Notification type is required
                      </strong>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl className={formStyles.drawerFormControl}>
                  <InputLabel className={formStyles.drawerLabel} shrink={false}>
                    Comment
                  </InputLabel>
                  <TextField
                    name="message"
                    variant="outlined"
                    id="message"
                    multiline
                    rows={7}
                    required={true}
                    style={{ height: "70px", marginBottom: "70px" }}
                    error={!!formik.errors.message && !!formik.touched.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                  ></TextField>
                  {formik.errors.message && formik.touched.message && (
                    <strong className={formStyles.error}>
                      comment is required
                    </strong>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <div className={drawerClass.buttonContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={drawerClass.button}
                    disabled={!formik.isValid}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="default"
                    onClick={() => {
                      setOpenAdminNotificationDrawer(false);
                    }}
                    className={drawerClass.customButton}
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
  );
}
