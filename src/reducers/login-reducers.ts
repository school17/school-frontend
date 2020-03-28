export const initialState = {
  role: localStorage.getItem('role'),
  institution:  localStorage.getItem('institution')
}

export default (state = initialState, action: any = {}) => {
  switch(action.type) {
    case 'SET_LOGIN_DETAILS': {
      return {
        ...state,
        role: action.payload.role,
        institution: action.payload.institution
      }
    }
    default: {
      return state
    }
  }
}