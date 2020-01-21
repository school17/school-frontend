import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {states} from '../../../constants/states';
import {grades} from '../../../constants/grades';
import {subjects} from '../../../constants/subjects';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {fetchSyllabus} from '../../../actions/syllabus-actions';
import {openModal, closeModal} from '../../../actions/syllabus-modal-actions';
import { connect } from 'react-redux';
import SyllabusCard from './syllabusCard';
import SyllabusModal from './syllabusModal';
interface Props {
  mode: String;
  classes:any;
  index:any;
  fetchSyllabus?: (mode:String, subject:String, grade:String, state?:String) => any;
  openModal?: () => any;
  closeModal?: () => any;
  syllabusList?:any;
  openSyllabusModal?:any;
  editMode:any;
  
}
interface State {
  stateName:String;
  stateCode: String;
  grade: String;
  subject: String;
}

const mapStateToProps = (state:any) =>{
    return {
      syllabusList: state.syllabusStore.syllabusList,
      openSyllabusModal: state.syllabusModalStore.openSyllabusModal,
      editMode: state.syllabusModalStore.editMode
    }
}

const styles = ((theme: Theme) => ({
    root:{
      flexGrow: 1,
    },
    formControl: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "50%"
    },
    selectEmpty: {
      marginTop: theme.spacing(5),
    },
    MuiPaperRoot: {
      maxHeight: 300
    },
    button: {
      marginTop: theme.spacing(6) + 10
    },
    Grid: {
      marginLeft: "auto"
    }
  }));

class SyllabusSearchForm extends Component<Props, State> {
  constructor(props:Props) {
    super(props)
    this.state = {
      stateName:'Tamil Nade',
      stateCode:'TN',
      grade:'10',
      subject: 'Social'
    }
  }

  setStateName = (event: React.ChangeEvent<{ value: any }>) => {
    this.setState({
      stateCode: event.target.value
    })
  }

  setGrade = (event: React.ChangeEvent<{ value: any }>) => {
    this.setState({
      grade: event.target.value
    })
  }

  setSubject = (event: React.ChangeEvent<{ value: any }>) => {
    this.setState({
      subject: event.target.value
    })
  }
  getSyllabus = (props: any, state: any) => {
    props.fetchSyllabus(props.mode, this.state.subject, this.state.grade, this.state.stateCode)
  }

  openModel = (props: any) =>{
    const syllabusData = {
      "mode": props.mode,
      "subject": this.state.subject,
      "grade": this.state.grade,
      "state": this.state.stateCode
    }
    props.openModal(true, syllabusData);
  }
  

  render() {
    const { classes } = this.props;
    const {syllabusList} = this.props;
    const {openSyllabusModal} = this.props;
    const statesDropDown = states.map((item, index)=>{
            return(<MenuItem value={item.code} key={index}>{item.stateName}</MenuItem>)
         });
          const classDropDown = grades.map((item:string, index) => {
            return (<MenuItem value={item} key={index}>{item}</MenuItem>)
        });
      
          const subjectDropDown = subjects.map((item:string, index) => {
            return (<MenuItem value={item} key={index}>{item}</MenuItem>)
          });
    return (
      <div>
        <Grid container>
        {this.props.mode==="metriculation" &&
          <Grid  item xs={12} md={3}>
          <FormControl className={classes.formControl}>
          <InputLabel>Select State</InputLabel>
          <Select
                value={this.state.stateCode}
                onChange={this.setStateName}
              >
                {statesDropDown}
          </Select>
          </FormControl>
          </Grid>
          }
          <Grid  item xs={12} md={3}>
          <FormControl className={classes.formControl}>
          <InputLabel>Select Class</InputLabel>
          <Select
                value={this.state.grade}
                onChange={this.setGrade}
              >
                {classDropDown}
          </Select>
          </FormControl>
          </Grid> 
          <Grid  item xs={12} md={3}>
          <FormControl className={classes.formControl}>
          <InputLabel>Select Subject</InputLabel>
          <Select
                value={this.state.subject}
                onChange={this.setSubject}
              >
                {subjectDropDown}
          </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12} md={3} className={classes.Grid}>
              <Button
                onClick={()=>this.getSyllabus(this.props, this.state)}
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>get_app</Icon>}
              >
              Get Syllabus
              </Button>
              <Button
                onClick={()=>this.openModel(this.props)}
                variant="contained"
                color="secondary"
                className={classes.button}
                endIcon={<Icon>get_app</Icon>}
              > 
              Add Syllabus
              </Button>
          </Grid>
          </Grid>
        <SyllabusCard syllabusList={syllabusList}></SyllabusCard>
        {/*(this.props.openSyllabusModal && !this.props.editMode) && <SyllabusModal></SyllabusModal>*/}
      </div>
    )
  }
}
export default connect(mapStateToProps,{ fetchSyllabus, openModal, closeModal })(withStyles(styles)(SyllabusSearchForm))
