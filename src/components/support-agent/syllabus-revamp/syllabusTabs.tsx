import React, { Component } from 'react'
import { withStyles, Theme, withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import SyllabusSearchForm from './syllabusSearchForm';
import { connect } from 'react-redux';

interface Props {
  classes?:any;
  theme?: any; 
  openSyllabusModal?: any;
  children?: React.ReactNode;
}
interface State {
  value:number;
}

const mapStateToProps = (state:any) =>{
  return {
    openSyllabusModal: state.syllabusModalStore.openSyllabusModal,
  }
}

const a11yProps = (index: any) =>{
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const styles = ((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
}));

class SyllabusTabs extends Component<Props, State> {
  constructor(props:any) {
    super(props)
  
    this.state = {
       value: 0
    }
  }
  handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({
      value:newValue
    })
  };

  handleChangeIndex = (index: number) => {
    this.setState({
      value:index
    })
  };

  render() {
    const { classes } = this.props;
    const { theme } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="MATRICULATION" {...a11yProps(0)} />
            <Tab label="CBSE" {...a11yProps(1)} />
            <Tab label="ICSE" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <SyllabusSearchForm mode="metriculation"  index={0} key={0}/>
          <SyllabusSearchForm mode="cbse" index={0}  key={1}/>
          <SyllabusSearchForm mode="icse" index={0}  key={2}/>
        </SwipeableViews>
      </div>
    );
  }
}

//export default withStyles(styles, { withTheme: true })(SyllabusTabs)
export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(SyllabusTabs))