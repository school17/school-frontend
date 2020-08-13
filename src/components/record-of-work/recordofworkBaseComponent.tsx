import React, { ReactElement, useState, useEffect } from 'react'
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {monthlyRecordOfWork} from "../../constants/monthlyRecordOfWork";
import RecordOfWorkTableComponent from "./recordOfWorkTableComponent";
import RecordOfWorkSelector from "./recordOfWorkSelector";
import { useDispatch, useSelector } from "react-redux";
import {saveRecordOfWork} from "../../actions/record-of-work-action";
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
  const dispatch = useDispatch();
  const [months, setMonths] = useState(monthlyRecordOfWork);
  const [selector, setSelector] = useState({});
  const [save, setSave] = useState(false);
  const [isValidSelector, setIsValidSelector] = useState(false);
  const constructAndSaveRecordOfWork = () => {
    const recordOfWork : any = Object.assign(selector, {"recordOfWorks": months}, {"institutionId": institution});
    dispatch(saveRecordOfWork(recordOfWork));
    setSave(false);
  }

  const {institution} = useSelector((store:any) => {
    return store.loginReducer
  });

  const {recordOfWork} = useSelector((store:any) => {
    return store.recordOfWorkReducer
  });

  const constructTableData = () => {
    setMonths(recordOfWork.recordOfWorks);
  }

  const showTable = () => {
    if(isValidSelector) {
      return (<RecordOfWorkTableComponent months={months} setMonths={setMonths} saveRecordOfWork={saveRecordOfWork} setSave={setSave} constructAndSaveRecordOfWork={constructAndSaveRecordOfWork}></RecordOfWorkTableComponent>)
    }
  }

  useEffect(()=>{
    if(Object.keys(recordOfWork).length > 1) {
      constructTableData()
    } else {
      setMonths(monthlyRecordOfWork);
    }
  },[months, recordOfWork])
    return (
      <div className={classes.root}>
      <Grid container>
      <Grid xs={12} md={2}>
      <RecordOfWorkSelector selector={selector} setSelector={setSelector} institution={institution} setIsValidSelector={setIsValidSelector}></RecordOfWorkSelector>
      
      </Grid>
      <Grid xs={12} md={10}>
          {showTable()}
      </Grid>
      </Grid>
      </div>
    )
}

export default RecordofworkBaseComponent
