
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
      const teacher: any = [];
      teacher.push(action.payload);
      return {
        ...state,
        teachersPayload: {
         teachers: [...teacher, ...state.teachersPayload.teachers]
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

    case 'UPDATE_TEACHER_TIME_TABLE_ON_DELETE' : {
      const teachersList = state.teachersPayload.teachers.map((teacher:any) => {
        if(teacher.name === action.payload['name']) {
          let timeTable = teacher.timeTable;
          timeTable[getDayIndex(action.payload['day'])][action.payload['day']][action.payload['period']] = ''
          teacher.timeTable = timeTable
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

    default: {
      if(state){
        return state
      }
      return initialState;
    }
  }
}

const getDayIndex = (day:any) => {
  let index = 0;
  switch(day) {
    case "Monday":
      index=0; break;
    case "Tuesday":
      index=1; break;
    case "Wednesday":
      index=2; break;
    case "Thursday":
      index=3; break;
    case "Friday":
      index=4; break;
    case "Saturday":
      index=5;break;
    
  }
  return index;
}