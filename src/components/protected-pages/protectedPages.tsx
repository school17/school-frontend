import React, { ReactElement } from 'react';
import SideNav from '../sideNav-component/sidenav';

interface Props {
  
}

function ProtectedPages({}: Props): ReactElement {
  return (
    <div>
      <SideNav/>
    </div>
  )
}

export default ProtectedPages
