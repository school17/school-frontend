import React, { ReactElement, useState, useEffect } from 'react'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FilterListIcon from '@material-ui/icons/FilterList';
import {
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import TeacherModalComponent from './teacherModalComponent';
import TeacherFilterModal from './teacherFilterModal';
import {useDispatch} from "react-redux";
import {fetchTeacher} from '../../actions/teacher-action';
import {Chip, Typography} from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
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


function TeachersActionComponent({searchQuery, institution}: Props): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openModel, toggleOpenModel] = useState(false);
  const [openFilterModal, toggleFilterModal] = useState(false);
  let chips:any =[];

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

  const constructSubjectChips = (subjects:any) => {
    if(subjects && subjects.length > 0) {
      return subjects.map((value: any, index:any) => {
        const chip = `Subject: ${value}`
        return(<Chip label={chip}  key={index} onDelete={()=>{deleteSubjectChip(value)}} 
        style = {{marginLeft: '10px',  marginTop: '10px'}}/>)
      })
    }
  }

  const constructgradeChips = (grades:any) => {
    if(grades && grades.length > 0) {
      return grades.map((value: any, index:any) => {
        const chip = `Class: ${value}`
        return(<Chip label={chip}  key={index} onDelete={()=>{deleteGradeChip(value)}}
        style = {{marginLeft: '10px',  marginTop: '10px'}}/>)
      })
    }
  }

  const deleteChip = (value:any) => {
    setFilteredValues({
      ...filteredValues,
      [value]: ""
    });
    
  }

  const deleteSubjectChip = (subject:any) => {
    if(filteredValues.subjects.length === 1) {
      setFilteredValues({
        ...filteredValues,
        subjects: []
      });
    }else {
    let array: any = [];
    array = filteredValues.subjects;
    const index = array.indexOf(subject);
    filteredValues.subjects.splice(index, 1);
    setFilteredValues({
      ...filteredValues,
      subjects: filteredValues.subjects
    });
    }
  }

  const deleteGradeChip = (grade:any) => {
    if(filteredValues.grades.length === 1) {
      setFilteredValues({
        ...filteredValues,
        grades: []
      });
    }else {
    let array: any = [];
    array = filteredValues.grades;
    const index = array.indexOf(grade);
    filteredValues.grades.splice(index, 1);
    setFilteredValues({
      ...filteredValues,
      grades: filteredValues.grades
    });
    }
  }


  const clicked = () => {
    if(openModel) toggleOpenModel(false);
    else toggleOpenModel(true);
  }
  const [filteredValues, setFilteredValues] = useState({
    name: "",
    email: "",
    subjects: [],
    grades: []
  });
  const openFilter = (filterValues?: any) => {
    if(filterValues && openFilterModal) {
      const name = filterValues.name
      setFilteredValues({
        ...filteredValues,
        name: name,
        email: filterValues.email,
        subjects: filterValues.subjects,
        grades: filterValues.grades
      });
    }
    if(openFilterModal) toggleFilterModal(false);
    else toggleFilterModal(true);
  }

  useEffect(()=>{
    dispatch(fetchTeacher(institution, searchQuery, filteredValues));
  },[filteredValues])

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

  
  return (
    <div className={classes.root}>
    <ThemeProvider theme = {Theme}>
      <div className={classes.icon}>
        <PersonAddIcon onClick = {clicked} ></PersonAddIcon>
        {openModel? <TeacherModalComponent opeModel = {openModel} callBack={clicked} /> : ''}
        <FilterListIcon onClick = {openFilter}></FilterListIcon>
        {openFilterModal ? <TeacherFilterModal openFilterModal = {openFilterModal} 
        callBack={openFilter} filterValues={filteredValues}/>: ''}
        
      </div>
      {constructChips(filteredValues)}
      {constructSubjectChips(filteredValues.subjects)}
      {constructgradeChips(filteredValues.grades)}
      </ThemeProvider>
    </div>
  )
}

export default TeachersActionComponent
