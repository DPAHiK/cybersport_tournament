const initialState = {
    body: null
  };
  
  const errorReducer = (state = initialState, action) => {
    switch (action.type) {

      case 'SET_ERROR':
        return{...state, body: action.payload}

      default:
        return state;
    }
  };
  
  export default errorReducer;
  