const initialState = {
  loggedInUser: {}
}

export default (state = initialState,  action:any = {}) => {
  switch(action.type) {
    case 'SET_LOGGEDIN_USER_DETAILS': {
      return {
        loggedInUser: action.payload
      }
    }
    default: {
      return state;
    }
  }
}