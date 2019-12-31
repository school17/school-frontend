import React, { ReactElement } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginComponent from '../login-component/loginComponent';
import ProtectRoutes from '../protected-routes/protectedRoutes';
import ProtectedPages from '../protected-pages/protectedPages';

interface Props {
  
}

function BaseComponent({}: Props): ReactElement {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginComponent}></Route>
          <ProtectRoutes path="/">
            <ProtectedPages></ProtectedPages>
          </ProtectRoutes>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default BaseComponent;
