import React, { ReactElement } from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import "./spinner.css";

interface Props {
  
}

function Spinner({}: Props): any {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div className="spinner">
        <Loader type="ThreeDots" color="#2BAD60" height={100} width={100} />
      </div>
    )
  )
}

export default Spinner

