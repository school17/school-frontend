export const initialState = {
  role: localStorage.getItem('role'),
  institution:  localStorage.getItem('institution'),
  email: localStorage.getItem('email')
}

export default (state = initialState, action: any = {}) => {
  switch(action.type) {
    case 'SET_LOGIN_DETAILS': {
      return {
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