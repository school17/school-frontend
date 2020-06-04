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
  Theme
} from "@material-ui/core/styles";

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
  const dispatch = useDispatch();

  const {institution} = useSelector((store:any) => {
    return store.loginReducer
  });

  useEffect(()=> {
    if(institution){
      dispatch(getSchoolDetails(institution));
    }
  },[institution])

  connectWs(institution);
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
    </div>
  )
}

export default BaseComponent;
