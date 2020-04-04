import React, { ReactElement } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginComponent from '../login-component/loginComponent';
import ProtectRoutes from '../protected-routes/protectedRoutes';
import ResetPasswordRoutes from '../protected-routes/resetPasswordRoutes';
interface Props {
  
}

function BaseComponent({}: Props): ReactElement {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }
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
