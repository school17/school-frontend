const initialState = {
  notifications: []
}

export default (state = initialState,  action:any = {}) => {
  switch(action.type) {
    case 'GET_NOTIFICATIONS': {
      return {
        ...state,
        notifications: action.payload
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