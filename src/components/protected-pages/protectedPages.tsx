import React, { ReactElement, useEffect } from 'react';
import SideNav from '../sideNav-component/sidenav';

interface Props {
  
}

function ProtectedPages({}: Props): ReactElement {
  
  return (
    <div>
      <SideNav></SideNav>    
    </div>
   
  )

  
}

export default ProtectedPages
