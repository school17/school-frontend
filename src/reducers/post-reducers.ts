
const initialState = {
  posts: [],
  loading: false,
  error: null
}

export default (state = initialState, action:any= {}) => {
  switch(action.type){
    case 'FETCH_POSTS_SUCCESS': {
      return {
        ...state,
        posts: action.payload
      }
    }
    default:
      return state
  }
}