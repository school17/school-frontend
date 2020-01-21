const initialState = {
  openSyllabusModal: false,
  currentSyllabus: {},
  isNew: false,
  editMode: false
}

export default (state=initialState, action:any={}) =>{
  switch(action.type) {
    case 'OPEN_MODAL': {
      const payload= action.payload;
      const editMode = action.payload? true: false;
      return {...state, openSyllabusModal: true, isNew: action.isNew ,editMode:editMode, currentSyllabus: {...state.currentSyllabus,  payload}};
    }

    case 'CLOSE_MODAL':   {
      return {openSyllabusModal: false};
    }

    default:
      return state;
  }
}