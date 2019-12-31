import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router';
import Syllabus from './syllabus/syllabus';

interface Props {
  
}

function Base({}: Props): ReactElement {
  return (
    <div>
      <h1>This is support Base component</h1>
      <Switch>
        <Route path="/syllabus" component={Syllabus}></Route>
      </Switch>
    </div>
  )
}

export default Base
