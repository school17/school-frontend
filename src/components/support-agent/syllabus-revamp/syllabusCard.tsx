import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles, Theme, withTheme } from '@material-ui/core/styles';
import {Chip, Typography} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {openModal, closeModal} from '../../../actions/syllabus-modal-actions';
import {deleteSyllabus} from '../../../actions/syllabus-actions';
import { connect } from 'react-redux';
import SyllabusModal from './syllabusModal';
import { bindActionCreators } from 'redux';
interface Props {
  syllabusList: any;
  classes: any;
  openModal?: () => any;
  closeModal?: () => any;
  deleteSyllabus?: (subjecId:any) => any;
  currentSyllabus:any;
  openSyllabusModal:any;
  editMode:any;

}
interface State {

}

const mapStateToProps = (state:any) =>{
  return {
    openSyllabusModal: state.syllabusModalStore.openSyllabusModal,
    editMode: state.syllabusModalStore.editMode,
    currentSyllabus: state.syllabusModalStore.currentSyllabus !== undefined ?state.syllabusModalStore.currentSyllabus.payload: {}
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    openModal: bindActionCreators(openModal, dispatch),
    closeModal: bindActionCreators(closeModal, dispatch),
    deleteSyllabus: bindActionCreators(deleteSyllabus, dispatch),
  }
}


const styles = ((theme: Theme)=>({
  card: {
    minWidth: 275,
    margin: 5
  },
  bullet: {
    display: 'inline-block',
    margin: '5px 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  chapterName:{
    fontWeight: 900,
    marginLeft: 15,
    fontSize: 20
  },
  topic: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    padding: 10
  },
  chip:{
    padding: 10,
    margin: 10
  },
  cardheader:{
    display: 'flex',
    justifyContent: 'space-between'

  }
}));

const noSyllabusFound = () => {
  return (<h1>No Syllabus Found... Try adding one.</h1>)
}


const renderSyllabusTopics = (topics:any, classes:any) =>{
  return topics.map((topic:any, index:any)=>{
    return(<Chip label={topic.topic} className={classes.chip} key={index}/>)
  });
}

const editSyllabus = (props:any ,syllabus:any) =>{
  props.openModal(false,syllabus);
}

const deleteSubjectSyllabus = (props:any ,syllabus:any) => {
  props.deleteSyllabus(syllabus.id)

}

const syllabusCard = (syllabusList: any, classes:any, props:any) => {
  return syllabusList.map((syllabus: any) => {
    return (
        <Grid item xs={12} md={6} key={syllabus.id}>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.cardheader}>
                <Typography align="left" className={classes.chapterName}>
                  {syllabus.chapterName}
                </Typography>
                <div>
                <EditIcon onClick={()=>{editSyllabus(props, syllabus)}}></EditIcon>
                <DeleteIcon onClick={()=>{deleteSubjectSyllabus(props, syllabus)}}></DeleteIcon>
                </div>
              </div>
              <Grid className={classes.topic} wrap="wrap" container>
                {renderSyllabusTopics(syllabus.topics, classes)}
              </Grid>              
            </CardContent>
          </Card>
        </Grid>
    );
  });
}

class SyllabusCard extends Component<Props, State> {
  state = {}
  render() {
    const { syllabusList } = this.props;
    const { classes } = this.props;
    let card;
    if (syllabusList.length < 1) {
      card = noSyllabusFound();
    } else {
      card = syllabusCard(syllabusList, classes, this.props);
    }
    return (
      <div>
        <Grid container  direction="column"
              justify="center"
              alignItems="center">  
          {card}
        </Grid>
        {/*(this.props.openSyllabusModal && this.props.editMode) && <SyllabusModal></SyllabusModal>*/}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(SyllabusCard))

//export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(SyllabusCard))
