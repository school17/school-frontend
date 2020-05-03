import React, { ReactElement, useState } from 'react';
import {
  makeStyles,
  Theme,
  createStyles, 
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClassAddDrawerComponent from './classAddDrawerComponent'
interface Props {
  
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '30px',
      display: 'flex',
      marginLeft: '50px',
      flexWrap: 'wrap'
    },
    icon: {
      marginTop : 10
    }
  })
);

function ClassActionComponent({}: Props): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openDrawer, toggleOpenDrawer] = useState(false);
  const Theme = createMuiTheme({
    overrides: {
      MuiChip: {
        root: {
          backgroundColor: '#FFF',
          border: 'solid 1px orange'
        },
        label: {
          fontSize: 10,
          fontWeight: 500
        }
      },
    }
  })
  let {noClassTeachers} = useSelector((store: any) => {
    return store.classReducer;
  });
  const openAddClassDrawer = () => {
    if(openDrawer){
      toggleOpenDrawer(false)
    } 
    else toggleOpenDrawer(true);
  }
  
  return (
    <div className={classes.root}>
      <ThemeProvider theme = {Theme}>
      <div className={classes.icon}>
      <AddCircleIcon onClick = {openAddClassDrawer} ></AddCircleIcon>
      </div>
      <ClassAddDrawerComponent openDrawer= {openDrawer} callBack={openAddClassDrawer}  noClassTeachers={noClassTeachers} ></ClassAddDrawerComponent>
      </ThemeProvider>
    </div>
  )
}

export default ClassActionComponent
