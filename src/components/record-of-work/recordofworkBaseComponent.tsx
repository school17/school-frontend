import React, { ReactElement } from 'react'
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import RecordofworkSelectorComponent from "./recordofworkSelectorComponent";
import RecordofworkTimeTableComponents from "./recordofworkTimeTableComponents";
import {Grid} from "@material-ui/core";
interface Props {
  
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)",
    },

    header: {
      flexGrow: 1,
    },
  })
);

function RecordofworkBaseComponent({}: Props): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <Grid container>
    <Grid xs={12} md={2}>
    <RecordofworkSelectorComponent>
      </RecordofworkSelectorComponent>
    </Grid>
    <Grid xs={12} md={10}>
      <RecordofworkTimeTableComponents>
      </RecordofworkTimeTableComponents>
      </Grid>
    </Grid>
     
    </div>
  )
}

export default RecordofworkBaseComponent
