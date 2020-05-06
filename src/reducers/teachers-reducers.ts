
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
      return {
        ...state,
        teachersPayload: {
         teachers: [...state.teachersPayload.teachers, action.payload]
        },
        saved: true
      }
    }

    case 'DELETE_TEACHER' : {
      const teachersList = state.teachersPayload.teachers.filter((teacher:any) => teacher.id !== action.payload);
      return {
        ...state,
        teachersPayload: {
          teachers: teachersList,
          totalPages: state.teachersPayload.totalPages,
          totalElements: state.teachersPayload.totalElements
        }
      }
    }

    case 'UPDATE_TEACHER' : {
      const teachersList = state.teachersPayload.teachers.map((teacher:any) => {
        if(teacher.id === action.payload['id']) {
          teacher = action.payload
        }
        return teacher;
      })
      return {
        ...state,
        teachersPayload: {
          teachers: teachersList,
          totalPages: state.teachersPayload.totalPages,
          totalElements: state.teachersPayload.totalElements
        }
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