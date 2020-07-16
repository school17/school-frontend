const initialState = {
  LogWork: {}
}

export default (state = initialState,  action:any = {}) => {
  switch(action.type) {
    case 'GET_LOG_WORK': {
      return {
        LogWork: action.payload
      }
    }

    case 'SAVE_LOG_WORK': {
      return {
        LogWork: action.payload
      }
    }
    default: {
      if(state){
        return state;
      }
      return initialState;
    
    }
  }
}