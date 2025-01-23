const initialState = {
    token: '',
    role: ''
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
      default:
        return state;
    }
  };
  
  export default authReducer;
  