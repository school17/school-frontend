const initialState = {
  recordOfWork: [],
}


export default (state = initialState, action:any = {}) => {
  switch(action.type) {
    case 'GET_RECORD_OF_WORK': {
      return {
        ...state,
        recordOfWork: action.payload ? action.payload : initialState,
      }
      
    }

    default: {
      return state;
    }
  }
}