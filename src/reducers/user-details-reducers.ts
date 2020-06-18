const initialState = {
  user: {}
}

export default (state = initialState,  action:any = {}) => {
  switch(action.type) {
    case 'GET_USER_DETAILS': {
      return {
      user: action.payload
      }
    }
    default: {
      return state;
    }
  }
}