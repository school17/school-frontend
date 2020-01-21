import React, { Component } from 'react';
import { withStyles, Theme, withTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { openModal, closeModal } from '../../../actions/syllabus-modal-actions';
import {saveSyllabus, updateSyllabus} from '../../../actions/syllabus-actions';
import { connect } from 'react-redux';
import { InputLabel, Input, FormControl, Icon, Button, Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ChipInput from 'material-ui-chip-input';
import { bindActionCreators } from 'redux';
interface Props {
  classes: any;
  openSyllabusModal: any
  openModal?: () => any;
  closeModal?: () => any;
  currentSyllabus?: any;
  isNew?:any;
  saveSyllabus?: (Syllabus:any) => any;
  updateSyllabus?: (Syllabus:any) => any;
}
interface State {
  topicsChip: any;
  chapterName:String;
}

const mapStateToProps = (state: any) => { 
  return {
    openSyllabusModal: state.syllabusModalStore.openSyllabusModal,
    currentSyllabus: state.syllabusModalStore.currentSyllabus !== undefined ?state.syllabusModalStore.currentSyllabus.payload: {},
    isNew: state.syllabusModalStore.isNew,
    closeModal: closeModal
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    saveSyllabus: bindActionCreators(saveSyllabus, dispatch),
    updateSyllabus: bindActionCreators(updateSyllabus, dispatch),
    closeModal: bindActionCreators(closeModal,dispatch)
  }
}


const styles = ((theme: Theme) => (
  {
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      border: '2px solid #000',
    },
    card: {
      minWidth: 800,
      maxWidth: 800,
      minHeight: 350
    },
    formControl: {
      width: "100%",
      padding: 30,
    },
    inputLabel: {
      padding: 38,
      top: "-8px"
    },
    buttomGroup: {
      display: "flex",
    },
    button: {
      margin: 5
    }
  }
)
);

class SyllabusModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      topicsChip: [],
      chapterName: ''
    }
  }


  handleClose = (props: any) => {
    props.closeModal();
  }

  removeTopic = (index: any) => {
    const topicsChip = this.state.topicsChip.slice();
    topicsChip.splice(index, 1);
    this.setState({ topicsChip });
    return this.state.topicsChip;
  }

  addChip = (value: any) => {
    const topicsChip = this.state.topicsChip.slice();
    topicsChip.push(value);
    this.setState({ topicsChip });
  };

  handleChange = (chip: any) => {
    this.setState({ topicsChip:chip });
  };

  fillModal = (props:any) => {
    if(!props.isNew){
      const chips = props.currentSyllabus.topics.map((topic:any)=>{
        return topic.topic;
      });
      this.setState({
        topicsChip: chips,
        chapterName: props.currentSyllabus.chapterName
      })
    }else {
      this.setState({
        topicsChip: [],
        chapterName: ''
      })
    }
  }

  updateChapterName = (event:any) =>{
    this.setState({
      chapterName: event.target.value
    })
  }

  saveSyllabus = (props:any) =>{
   const syllabus = {
      "state": props.currentSyllabus.state,
      "mode": props.currentSyllabus.mode,
      "grade": props.currentSyllabus.grade,
      "subject": props.currentSyllabus.subject,
      "chapterName": this.state.chapterName,
      "topics": this.state.topicsChip,
      "chapterNumber": "7",
      "id": props.currentSyllabus.id
    }
    if(props.isNew) {
      props.saveSyllabus(syllabus);
    }else {
      props.updateSyllabus(syllabus)
    }
   

  }
  
  render() {
    const { classes } = this.props;
    const { openSyllabusModal } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openSyllabusModal}
          closeAfterTransition
          onRendered={()=> {this.fillModal(this.props)}}
          onClose={() => { this.handleClose(this.props) }}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openSyllabusModal}>
            <div className={classes.paper}>
              <Card className={classes.card}>
                <CardContent>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="chapter-name-input" className={classes.inputLabel}>Enter Chapter Name</InputLabel>
                    <Input id="chapter-name-input" aria-describedby="chapter-name-input" value = {this.state.chapterName} onChange={this.updateChapterName}/>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <ChipInput
                      defaultValue={this.state.topicsChip}
                      onChange={(chips: any) => this.handleChange(chips)}
                    ></ChipInput>
                  </FormControl>
                  <Grid
                    justify="flex-end"
                    container
                    spacing={2}
                  >
                    <Grid className={classes.button}>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick = {()=>{this.saveSyllabus(this.props)}}
                        endIcon={<Icon>get_app</Icon>}
                      >
                        Save Syllabus
                      </Button>
                    </Grid>
                    <Grid className={classes.button}> 
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        endIcon={<Icon>get_app</Icon>}
                        onClick={() => { this.handleClose(this.props) }}
                      >
                        Cancel
                      </Button>
                    </Grid>


                  </Grid>
                </CardContent>
              </Card>

            </div>
          </Fade>

        </Modal>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SyllabusModal))
