import React, { ReactElement, useState, useEffect } from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { InputLabel, FormControl, TextField, Input, InputAdornment } from "@material-ui/core";
import { drawerTheme, useDrawerStyles } from '../../utils/drawerStyles';
import {formUseStyles, textFieldTheme} from '../../utils/formStyles';
import {getLogwork, saveLogwork} from "../../actions/logwork-actions";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useDispatch, useSelector } from "react-redux";
interface Props {
  dayTimeTable:any,
  institution:any,
  grade:any,
  section:any,
  selectedDay:any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logWorkHeader: {
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
      padding: "10px 10px"
    },
    work : {
      color: "#7E8285"
    },
    subject: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& > svg" : {
        fontSize: "1rem",
        color: "#6DA0E6"
      }
    },
    form: {
      display: "none",
      "& > div": {
        width: "100%",
        fontWeight: 800,
        fontSize: 14,
      }
    },

    saveIcon: {
      color: "limegreen",
      fontSize: "1.2rem",
      right: 0,
      position: "absolute"
    }
  })
);

function LogworklistComponent({dayTimeTable, institution, grade, section, selectedDay}: Props): ReactElement {
  const [logwork, setLogwork]:any = useState([]);

  const formClasses = formUseStyles();

  const classes = useStyles();

  const dispatch = useDispatch();

  const [desc, setDesc] = useState('');

  const {LogWork} = useSelector((store:any) => {
    return store.logworkReducer
  })

  const constructDefaultLogWork = () => {
    const logworkArray:any = [];
    dayTimeTable.forEach((period:any, index: any) => {
      const log = {
        subject: period.subject,
        work: '',
        period: index + 1
      }
      logworkArray.push(log)
    });
    setLogwork(logworkArray);
  }

  const constructLogWork = () => {
    const logworkArray:any = [];
    LogWork.logwork.forEach((period:any, index:any) => {
      const log = {
        subject: period.subject,
        work: period.work,
        period: index + 1
      }
      logworkArray.push(log);
    });
    setLogwork(logworkArray);
  }
  useEffect(() => {
    const date = `${selectedDay.day},${selectedDay.month},${selectedDay.year}`
    if(Object.keys(LogWork).length< 1 || (LogWork.grade !== grade || LogWork.section !== section || date !=LogWork.date)) {
      constructDefaultLogWork();
      dispatch(getLogwork(institution, grade, section, date));
    } else {
      constructLogWork();
    }
  }, [dayTimeTable, grade, section, LogWork,selectedDay]);

  const editLogwork = (period:any) => {
    const doc: any = document;
    const element:any  = doc.querySelector(`.log-work-list > div:nth-of-type(${period})`).children[1];
    const iconElement:any  = doc.querySelector(`.log-work-list > div:nth-of-type(${period})`).children[0];
    element.children[0].style.display="none"
    element.children[1].style.display="block"
    iconElement.children[1].style.display="none"
  } 

  const saveLogWork = (period:any) => {
    const doc: any = document;
    const element:any  = doc.querySelector(`.log-work-list > div:nth-of-type(${period})`).children[1];
    const iconElement:any  = doc.querySelector(`.log-work-list > div:nth-of-type(${period})`).children[0];
    element.children[0].style.display="block"
    element.children[1].style.display="none"
    iconElement.children[1].style.display="block"
    element.children[0].innerText = desc
    updateLogworkArray(period, desc);
    setDesc('');
    
  }

  const updateLogworkArray = (period:any, desc:any) => {
    const logworkArray = logwork.map((logwork:any, index:any)=> {
      if(logwork.period == period) {
        logwork.work = desc
      }
      return logwork;
    });
    setLogwork(logworkArray);
    dispatch(saveLogwork(institution, grade, section, 
      `${selectedDay.day},${selectedDay.month},${selectedDay.year}`, logworkArray));
    
  }

  const displayLog = () => {
    return logwork.map((log: any) => {
      return (
        <div className={classes.logWorkHeader}>
          <div className={classes.subject}>
          <span>
            {log.subject} 
          </span>
          <EditIcon onClick={(e:any) => editLogwork(log.period)}/>
          </div>
          <div>
            <span className={classes.work}>
              {log.work ? log.work : `---`}
            </span>
            <div className={classes.form}>
            <Input
            value={desc}
            onChange={(e)=>setDesc(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                >
                  <CheckCircleIcon onClick={(e:any)=>{saveLogWork(log.period)}} className={classes.saveIcon}/>
                </IconButton>
              </InputAdornment>
            }
          />
            </div>
          </div>
        </div>
      )
    })
  }
  return (
    <div className="log-work-list">
      {displayLog()}
    </div>
  )
}

export default LogworklistComponent