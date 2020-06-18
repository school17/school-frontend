
const initialState = {
  updateSuccess: false,
  studentsPayload:{
    students: [],
    totalPages: 0,
    totalElements: 0
  },
}


export default (state = initialState,  action:any = {}) => {
  switch(action.type) {
    case 'SEACH_STUDENTS': {
      return {
        ...state,
        studentsPayload: {
          students: action.payload.content,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements
        }
      }
    }

    case 'CREATE_STUDENT': {
      const student:any =  [];
      student.push(action.payload)
      return {
        ...state,
        studentsPayload: {
          students: [...student, ...state.studentsPayload.students]
        }
      }
    }

    case 'UPDATE_STUDENT': {
      const studentsList = state.studentsPayload.students.map((student:any) => {
        if(student.id === action.payload['id']) {
          student = action.payload
        }
        return student;
      })
      return {
        ...state,
        updateSuccess: true,
        studentsPayload: {
          students: studentsList,
          totalPages: state.studentsPayload.totalPages,
          totalElements: state.studentsPayload.totalElements
        }
      }
    }
    default: {
      if(state){
        return state;
      }
      return initialState;
    
    }
  }
}