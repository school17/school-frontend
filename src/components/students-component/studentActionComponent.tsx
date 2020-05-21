import React, { ReactElement, useState, useEffect } from 'react'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FilterListIcon from '@material-ui/icons/FilterList';
import {searchStudents} from '../../actions/students-actions';
import StudentFilterDrawer from "./studentFilterDrawer";
import {
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {Chip} from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import StudentDrawerComponent from './studentAddComponent';

interface Props {
  searchQuery:any,
  institution: any
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

function StudentActionComponent({searchQuery, institution}: Props): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openDrawer, toggleOpenDrawer] = useState(false);
  const [openFilterDrawer, toggleFilterDrawer] = useState(false);
  const [filteredValues, setFilteredValues] = useState({
    name: "",
    email: "",
    grade: "",
    section: "",
    division: ""
  });
  let chips:any =[];
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
  });
  const clicked = () => {
    if(openDrawer) toggleOpenDrawer(false);
    else toggleOpenDrawer(true);
  }

  const toggleFilterDrawerCallback = (filterValues?: any) => {
    if(filterValues && openFilterDrawer) {
      setFilteredValues({
        ...filteredValues,
        name: filterValues.name,
        email: filterValues.email
      });
    }
    if(openFilterDrawer) toggleFilterDrawer(false);
    else toggleFilterDrawer(true);
  }
  const deleteChip = (value:any) => {
    setFilteredValues({
      ...filteredValues,
      [value]: ""
    });
    
  }
  const constructChips = (filterValues:any) => {
    return Object.keys(filterValues).map((value:any, index:any)=>{
      
      if(filterValues[value] !== ""){
        if(value !== 'subjects' && value !== 'grades'){
        const label = value.charAt(0).toUpperCase() + value.substring(1)
        const chip = `${label}: ${filterValues[value]}`
        return(<Chip label={chip}  key={index} onDelete={()=>{deleteChip(value)}} 
        style = {{marginLeft: '10px', marginTop: '10px'}}/>)
        }
      }
    });
  }
  useEffect(()=>{
    dispatch(searchStudents(institution, searchQuery, filteredValues));
  },[filteredValues])
  return (
    <div className={classes.root}>
    <ThemeProvider theme = {Theme}>
      <div className={classes.icon}>
        <PersonAddIcon onClick = {clicked} ></PersonAddIcon>
        <StudentDrawerComponent openDrawer = {openDrawer} callBack={clicked} />
        <FilterListIcon onClick = {toggleFilterDrawerCallback} ></FilterListIcon>
        <StudentFilterDrawer callBack ={toggleFilterDrawerCallback} filterValues={filteredValues} openFilterDrawer={openFilterDrawer}/>
      </div>
      {constructChips(filteredValues)}
      </ThemeProvider>
    </div>
  )
}

export default StudentActionComponent
