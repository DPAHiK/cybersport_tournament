const initialState = {
    token: '',
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, token: action.payload };
      case 'LOGOUT':
        return { ...state, token: '' };
      case 'SIGNUP':
        return state;
      default:
        return state;
    }
  };
  
  export default authReducer;
  