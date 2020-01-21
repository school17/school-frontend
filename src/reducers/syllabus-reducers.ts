const initialState = {
  syllabusList: [],
  loading: false,
  error: null,
}

export default (state = initialState, action:any = {}) => {
  switch(action.type) {
    case 'FETCH_SYLLABUS_SUCCESS':{
      return {
        ...state,
        syllabusList: action.payload
      }
    }
    case 'SAVE_SYLLABUS_SUCCESS': {
      const newSyllabus:any = action.payload
      return {
        ...state,
        syllabusList: state.syllabusList.concat(newSyllabus)
      }
    }
    case 'UPDATE_SYLLABUS_SUCCESS' : {
      const newSyllabus:any = action.payload;
      let newSyllabusList = state.syllabusList.map((syllabus:any, index:any)=>{
        if(syllabus.id === newSyllabus.id){
          state.syllabusList.splice(index,1);
        }
      });
      return {
        ...state,
        syllabusList: state.syllabusList.concat(newSyllabus)
      }
    }
    default: {
      return state;
    }

  }
}
