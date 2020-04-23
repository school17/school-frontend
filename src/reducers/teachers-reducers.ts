
const initialState = {
  teachers: [],
  loading: false,
  error: null,
}

export default (state = initialState,  action:any = {}) => {
  switch(action.type) {
    case 'GET_TEACHERS': {
      return {
        ...state,
        teachers: action.payload
      }
    }
    default: {
      return initialState;
    }
  }
}