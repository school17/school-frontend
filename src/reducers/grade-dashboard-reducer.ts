const initialState = {
  gradeDetails:{},
  subjectTeacherAssociation: {}
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

    default: {
      return state;
    }
  }
}