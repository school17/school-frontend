const initialState = {
  Homework: {}
}

export default (state = initialState,  action:any = {}) => {
  switch(action.type) {
    case 'GET_HOME_WORK': {
      return {
        Homework: action.payload 
      }
    }

    case 'SAVE_HOME_WORK': {
      return {
        Homework:  action.payload
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