import React, { ReactElement } from 'react'
import {Grid} from "@material-ui/core";
import NotificationComponent from './notificationComponent';
interface Props {
  
}

function DashboardComponent({}: Props): ReactElement {
  return (
    <div>
      <Grid container>
      <Grid item xs={6} md={9}>

        </Grid>
        <Grid item xs={6} md={3}>
          <NotificationComponent/>
        </Grid>

      </Grid>
    </div>
  )
}

export default DashboardComponent
