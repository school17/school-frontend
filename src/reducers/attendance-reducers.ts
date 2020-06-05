const initialState = {
  users: [],
  dataLoading: true,
  attendance: {}
}

export default (state = initialState,  action:any = {}) => {

  switch(action.type){
    case "GET_STUDENT_ATTENDANCE_NAMES" :{
      const users:any =  [];
      if(action.payload.length > 0) {
        action.payload.forEach((value:any) => {
          const user = {name: value.name, picture: value.picture}
          users.push(user);
        })
      }
      return {
        users: users,
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
