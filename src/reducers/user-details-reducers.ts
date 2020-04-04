const initialState = {
  user: {}
}

export default (state = initialState,  action:any = {}) => {
  switch(action.type) {
    case 'GET_USER_DETAILS': {
      return {
        ...state,
      user: action.payload
      }
    }
    default: {
      return initialState;
    }
  }
}