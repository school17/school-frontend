
const initialState = {
  teachersPayload:{
    teachers: [],
    totalPages: 0,
    totalElements: 0
  },
  loading: false,
  error: null,
  saved: null
}

export default (state = initialState,  action:any = {}) => {
  switch(action.type) {
    case 'GET_TEACHERS': {
      return {
        ...state,
        teachersPayload: {
          teachers: action.payload.content,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements
        }
      }
    }

    case 'SAVE_TEACHER': {
      let teachers = [state.teachersPayload.teachers]
      let teacher  = action.payload[0];
      teachers.unshift(teacher)
      console.log(teachers);
      return {
        ...state,
        teachersPayload: {
         teachers: [...state.teachersPayload.teachers, action.payload]
         //teachers: teachers
        },
        saved: true
      }
    }

    case 'SAVING' : {
      return {
        ...state,
        loading: true
      }
    }
    default: {
      return initialState;
    }
  }
}