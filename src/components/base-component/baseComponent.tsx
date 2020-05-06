import React, { ReactElement, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginComponent from '../login-component/loginComponent';
import ProtectRoutes from '../protected-routes/protectedRoutes';
import ResetPasswordRoutes from '../protected-routes/resetPasswordRoutes';
import {getSchoolDetails} from "../../actions/address-form-actions";
import { useDispatch, useSelector } from "react-redux";
interface Props {
  
}

function BaseComponent({}: Props): ReactElement {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }

  const dispatch = useDispatch();

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
      <button onClick={logout}>LOGOUT</button>
    </div>
  )
}

export default BaseComponent;
