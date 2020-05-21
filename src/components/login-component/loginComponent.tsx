import React, { ReactElement, useState, useEffect } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import { InputLabel, FormControl, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoginDetails } from "../../actions/login-actions";
import { formUseStyles, textFieldTheme } from "../../utils/formStyles";
import Grid from "@material-ui/core/Grid";
import {fetchUserDetails} from '../../actions/user-details-action';
import {getSchoolDetails} from './../../actions/address-form-actions'

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

interface Props {}

function LoginComponent({  }: Props): ReactElement {
  let location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const [userName, setUserName] = useState(localStorage.getItem("token"));
  const {user} = useSelector((store: any) => {
    return store.userDetailsReducer
  });

  const { name } = useSelector((store: any) => {
    return store.addressFormStore;
  });
  const dispatch = useDispatch();
  const formClasses = formUseStyles();
  const updateName = (event: any) => {
    setEmail(event.target.value);
  };
  const updatePassword = (event: any) => {
    setPassword(event.target.value);
  };
  const submitHandler = (event: any) => {
    fetchToken();
    event.preventDefault();
  };

  useEffect(() => {
    if (userName) {
      const token: any = jwt_decode(userName.replace("Bearer ", ""));
      dispatch(setLoginDetails(token.role, token.institution, token.sub));
      dispatch(fetchUserDetails(token.institution, token.sub));
      dispatch(getSchoolDetails(token.institution))
    }
  }, [userName]);

  const fetchToken = () => {
    axios({
      method: "post",
      url: "http://localhost:81/login",
      data: {
        email: email,
        password: password
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(response => {
        const token: any = jwt_decode(
          response.data.Authorization.replace("Bearer ", "")
        );
        localStorage.setItem("token", response.data.Authorization);
        localStorage.setItem("role", token.role);
        localStorage.setItem("institution", token.institution);
        localStorage.setItem("expiry", token.expiry);
        setUserName(response.data.Authorization);
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  };

  if (userName &&  Object.keys(user).length > 0) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: location }
          }}
        />
      );
  }
  return (
    <div className="reset-container">
      <div className={classes.formContainer}>
        <MuiThemeProvider theme={textFieldTheme}>
        <div>
        <div className= {classes.header}><h4>LOGIN</h4></div>
          <form onSubmit={submitHandler}>
            <Grid container className={classes.form}>
              <Grid item xs={12} md={12}>
              <FormControl className={formClasses.formControl}>
              <InputLabel className={formClasses.label}>User Name</InputLabel>
                <TextField
                  name="email"
                  id="email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={updateName}
                />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={12}>
              <FormControl className={formClasses.formControl}>
              <InputLabel className={formClasses.label}>Password</InputLabel>
                <TextField
                 name="password"
                 id="password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={updatePassword}
                />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={12} className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  className = {classes.customButton}
                  type="submit"
                >
                  Login
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

export default LoginComponent;
