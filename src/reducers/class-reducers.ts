const initialState = {
  noClassTeachers: [],
  teacher: {},
  gradesPayload:{
    grades: [],
    totalPages: 0,
    totalElements: 0
  },
}

export default (state = initialState,  action:any = {}) => {
  switch(action.type) {
    case 'GET_NON_CLASS_TEACHERS': {
      console.log("UPDATING GET_NON_CLASS_TEACHERS")
      return {
        ...state,
        noClassTeachers: action.payload
      }
    }

    case 'GET_GRADES': {
      return {
        ...state,
        gradesPayload: {
          grades: action.payload.content,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements
        }
      }
    }

    case 'SAVE_GRADE': {
      return {
        ...state,
      gradesPayload: {
      grades: [...state.gradesPayload.grades, action.payload]
      }
      }
    }

    case 'GET_TEACHER_INFO': {
      return {
        ...state,
        teacher: action.payload
      }
    }

    default: {
      return initialState;
    }
  }
}