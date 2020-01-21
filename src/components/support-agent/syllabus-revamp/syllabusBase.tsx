import React, { Component } from 'react'
import SyllabusTabs from './syllabusTabs';
import SyllabusModal from './syllabusModal';
interface Props {
  openSyllabusModal?:any;
}
interface State {
  
}
const mapStateToProps = (state:any) =>{
  return {
    openSyllabusModal: state.syllabusModalStore.openSyllabusModal,
  }
}
class SyllabusBase extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div>
        <SyllabusTabs></SyllabusTabs>
        <SyllabusModal></SyllabusModal>
      </div>
    )
  }
}

export default SyllabusBase
