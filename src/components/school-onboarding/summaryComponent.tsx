import React, { ReactElement } from 'react';
import {useSelector} from "react-redux";

interface Props {
  
}

export default function SummaryComponent({}: Props): ReactElement {
  const {name, branch,mode} = useSelector((store:any) => {
    return store.addressFormStore;
  })
  return (
    <div>
      <h4> This is the summary page </h4>
      <h5>School Name: {name} </h5>
      <h5>Branch Name: {branch} </h5>
      <h5>Mode Name: {mode} </h5>
    </div>
  )
}
