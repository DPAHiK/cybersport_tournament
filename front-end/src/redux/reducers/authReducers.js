const initialState = {
    token: '',
    role: '',
    user: null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, token: action.payload };
      case 'LOGOUT':
        return { ...state, token: '', role: ''};
      case 'SIGNUP':
        return state;
      case 'SET_ROLE':
        return { ...state, role: action.payload };
      case 'SET_USER':
        return { ...state, user: action.payload };
      default:
        return state;
    }
  };
  
  export default authReducer;
  