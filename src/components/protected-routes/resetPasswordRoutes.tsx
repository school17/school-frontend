import React, { ReactElement, ReactNode, useState, useEffect } from 'react';
import {
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import ResetPasswordComponent from '../login-component/resetPasswordComponent';

interface Props {
  children: ReactNode;
  path: string;
}

function ResetPasswordRoutes({children, ...rest}:Props): ReactElement {

  const [userName] = useState(localStorage.getItem('token'));
  let location = useLocation();
  if(!userName) {
    return (
      <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
        />
    )
  }
  else {
    return (
      <div>
        <ResetPasswordComponent></ResetPasswordComponent>
      </div>
    )
  }
  
}

export default ResetPasswordRoutes