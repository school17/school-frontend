const initialState = {
  testList: [],
}


export default (state = initialState, action:any = {}) => {
  switch(action.type) {
    case 'GET_GRADE_TEST': {
      return {
        ...state,
        testList: action.payload,
      }
      
    }

    default: {
      return state;
    }
  }
}