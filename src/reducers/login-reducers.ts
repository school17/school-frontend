export const initialState = {
  role: localStorage.getItem('role'),
  institution:  localStorage.getItem('institution'),
  email: ''
}

export default (state = initialState, action: any = {}) => {
  switch(action.type) {
    case 'SET_LOGIN_DETAILS': {
      return {
        ...state,
        role: action.payload.role,
        institution: action.payload.institution,
        email: action.payload.email
      }
    }
    default: {
      return state
    }
  }
}