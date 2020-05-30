const initialState = {
  names: [],
  dataLoading: true,
  attendance: {}
}

export default (state = initialState,  action:any = {}) => {

  switch(action.type){
    case "GET_STUDENT_ATTENDANCE_NAMES" :{
      const names:any =  [];
      if(action.payload.length > 0) {
        action.payload.forEach((value:any) => {
          names.push(value.name);
        })
      }
      return {
        names: names,
      }
    }

    case "GET_ATTENDANCE" : {
      return {
        ...state,
        attendance: action.payload,
        dataLoading: false
      }
    }
    case "LOADING" : {
      return initialState
      
    }
    default: {
      return initialState;
    }
  }
}
