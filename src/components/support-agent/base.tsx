import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router';
import SyllabusBase from './syllabus-revamp/syllabusBase';

interface Props {
  
}

function Base({}: Props): ReactElement {
  return (
    <div>
      <Switch>
        <Route path="/syllabus" component={SyllabusBase}></Route>
      </Switch>
    </div>
  )
}

export default Base
