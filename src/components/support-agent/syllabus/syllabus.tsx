import React, { ReactElement } from 'react';
import Simplecard from '../../demo/simplecard';


interface Props {
  
}

function Syllabus({}: Props): ReactElement {
  return (
    <div>
      <h1>This is Syllabus</h1>
      <Simplecard></Simplecard>
    </div>
  )
}

export default Syllabus
