import React, { ReactElement, useEffect, useState} from 'react';
import {useDashboardPrimaryStyles} from '../../utils/dashboradstyles';
import { useDispatch, useSelector } from "react-redux";
import {getGradeTestList} from "../../actions/test-action";
import DoneIcon from '@material-ui/icons/Done';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';

import {
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";


interface Props {
  institution:any,
  grade:any,
  section: any,
  division:any
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 20px",
      color: "#6DA0E6",
      cursor: "pointer"
    },
    heading: {
      display: "flex",
      textAlign: "left",
      paddingLeft: 20,
      fontSize: 12,
      color: "#9C9BA4"
    },
    date: {
      flex:2
    },
    time: {
      flex:1
    },
    subject: {
      flex:4
    },
    testList: {
      display: "flex",
      marginTop: 10,
      textAlign: "left",
      padding: "10px 20px"
    },
    oddRow: {
      backgroundColor: "#FFF",
      borderRadius: 10
    },
    leftAling: {
      maringLeft: 7
    },
    dropDown: {
      listStyle: "none",
      position: "absolute",
      marginTop: 35,
      backgroundColor: "#3C4059",
      color: "#FFF",
      borderRadius: 10,
      padding: 20,
      textAlign: "left",
      minWidth: 250,
      maxWidth: 250,
      boxShadow: "0 0 4px 0 rgba(0,0,0,.1), 0 1px 20px 0 rgba(0,0,0,.2)",
      "&>li": {
        marginTop: 10
      }
    },
    listItems: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& > svg" : {
        fontSize: "1rem"
      }
    },
    testName: {
      display: "flex",
      alignItems: "center"
    }
  })
);

function ExamTimeTable({institution, grade, section, division}: Props): ReactElement {
  const dispatch = useDispatch();

  const [selectedTest, setSelectedTest] = useState('')

  const [testTimeTable, setTestTimeTable] = useState([]);

  const [availableTest, setAvailableTest] = useState([]);

  const [showTestSelector, setShowTestSelector] = useState(false);

  const [fetchList, setFetchList] = useState(true);

  const classes = useStyles();
  const {testList} = useSelector((store:any) => {
    return store.testReducer;
  });

  const setDefaultTest = () => {
    if(testList.length>0) {
      setSelectedTest(testList[0].testName);
      setTimeTableList(testList[0].testName);
      const tests:any = [];

      testList.forEach((test:any) => {
        tests.push(test.testName)
      });
  
      setAvailableTest(tests);
    }
  }

  const applySelectedTest = () => {
    setTimeTableList(selectedTest)
  }

  const setTimeTableList = (testName: any) => {
    const test = testList.filter((test:any) => {
      return test.testName === testName;
    });

    if(test.length > 0) {
      setTestTimeTable(test[0].schedule)
    }
  }

  const examSchedule = () => {
    return (
      testTimeTable.map((test:any, index:any) => {
        const classNames = classes.testList + ' ' + ((index%2 == 1) ? ' ' : classes.oddRow)
        return (
         <div className = {classNames} key={index}>
            <span className={classes.date}><span>{test.date}, 2020</span></span>
            <span className={classes.time}><span className={classes.leftAling}>{test.time}</span></span>
            <span className={classes.subject}><span className={classes.leftAling}>{test.subject}</span></span>
         </div>
        )
      })
    )
  }
  
  const testDropDown = () => {
    if(showTestSelector) {
      return (
        <Zoom in={showTestSelector} mountOnEnter unmountOnExit>
        <ul className={classes.dropDown}>
            {constructTestList()}
        </ul>
        </Zoom>
      ) 
    }
    
  }

  const setSelectedExamTimeTable = (testName:any) => {
    setSelectedTest(testName);
    showDropDown();
  }

  const constructTestList = () => {
    return (availableTest.map((test:any) => {
      return (<li onClick={()=>setSelectedExamTimeTable(test)}><div className={classes.listItems}>
          <span>{test}</span>
          {test == selectedTest ? <DoneIcon></DoneIcon> : ''}
        </div></li>)
    }))
  }

  const showDropDown = () => {
    if(showTestSelector) {
      setShowTestSelector(false);
    } else {
      setShowTestSelector(true);
    }
    
  }


  useEffect(()=>{
    if((division && testList.length < 1) || (testList.length > 1 && (grade !== testList[0].grade  && fetchList))) {
        dispatch(getGradeTestList(institution, division, grade));
        setFetchList(false);
    }

    if(testList.length > 0 && !selectedTest && (testList.length > 1 && grade === testList[0].grade)) {
      setDefaultTest();
    }

    if(selectedTest) {
      applySelectedTest()
    }

    testDropDown();
  },[division, testList.length, showTestSelector, selectedTest, grade])
  const dashboardClasses = useDashboardPrimaryStyles();
  return (
    <div className= {dashboardClasses.root}>
      <span>Exams</span>
      <div  className={classes.header}>
        <div onClick={showDropDown} className={classes.testName}>
          <span>{selectedTest}</span>
          <ExpandMoreIcon></ExpandMoreIcon>
        </div>
          {testDropDown()}
        <span>Edit</span>
      </div>
      <div className = {classes.heading}>
        <span className={classes.date}>DATE</span>
        <span className={classes.time}>TIME</span>
        <span className={classes.subject}>SUBJECT</span>
      </div>     
        <Grow
         in={testTimeTable.length > 1 }
         style={{ transformOrigin: '0 0 0' }}
         {...(testTimeTable.length > 1  ? { timeout: 1000 } : {})}
        >
        <div>
          {testTimeTable.length > 1 ? examSchedule(): ''}
        </div>
       </Grow>
     
    </div>
  )
}

export default ExamTimeTable
