import React, { ReactElement, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginComponent from '../login-component/loginComponent';
import ProtectRoutes from '../protected-routes/protectedRoutes';
import ResetPasswordRoutes from '../protected-routes/resetPasswordRoutes';
import {getSchoolDetails} from "../../actions/address-form-actions";
import { useDispatch, useSelector } from "react-redux";
import {connectWs} from "../socket/message";

import {
  createStyles,
  makeStyles,
  Theme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import { InputLabel, FormControl, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    customButton: {
      marginTop: "25px",
      marginLeft: "63%",
      padding: "12px"
    }
  })
);

interface Props {
  
}

function BaseComponent({}: Props): ReactElement {
  const classes = useStyles();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }

  const dispatch = useDispatch();
  connectWs();


  const {institution} = useSelector((store:any) => {
    return store.loginReducer
  });

  useEffect(()=> {
    if(institution){
      dispatch(getSchoolDetails(institution));
    }
  },[institution])
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginComponent}></Route>
          <ResetPasswordRoutes path="/reset-password" >
          </ResetPasswordRoutes>
          <ProtectRoutes path = '/'>
          </ProtectRoutes>
        </Switch>
      </BrowserRouter>
      {/* <Button variant="contained" color="primary"
          className = {classes.customButton}
          onClick={logout}>
        LOGOUT
      </Button> */}
    </div>
  )
}

export default BaseComponent;
