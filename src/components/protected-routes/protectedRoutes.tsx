import React, { ReactElement, ReactNode, useState, useEffect } from 'react';
import {
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

import ProtectedPages from '../protected-pages/protectedPages';

interface Props {
  children: ReactNode;
  path: string;
}

function ProtectRoutes({children, ...rest}:Props): ReactElement {
  const [userName] = useState(localStorage.getItem('userName'));
  let history = useHistory();
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
        <ProtectedPages></ProtectedPages>
      </div>
    )
  }
  
}

export default ProtectRoutes
