const initialState = {
  gradeDetails:{},
  subjectTeacherAssociation: {},
  timetable: {},
  studentsList: {}
}

export default (state = initialState,  action:any = {}) => {
  switch(action.type) {
    case 'GET_GRADE_DETAILS': {
      return {
        ...state,
        gradeDetails: action.payload.content[0]
      }
    }

    case 'GET_SUBJECT_TEACHER_ASSOCIATION' : {
      return {
        ...state,
        subjectTeacherAssociation: action.payload
      }
    }

    case 'SAVE_SUBJECT_TEACHER_ASSOCIATION' : {
      return  {
        ...state, 
        subjectTeacherAssociation: action.payload
      }
    }

    case 'SAVE_TIME_TABLE': {
      return {
        ...state, 
        timetable: action.payload
      }
    }

    case 'GET_TIME_TABLE_FOR_GRADE' : {
      return {
        ...state, 
        timetable: action.payload
      }
    }

    case 'GET_GRADE_STUDENTS': {
      return {
        ...state,
        studentsList: action.payload
      }
    }

    default: {
      return state;
    }
  }
}