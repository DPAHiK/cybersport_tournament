const initialState = {
    tournaments: []
  };
  
  const teamsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TOURNAMENTS':
        return { ...state, tournaments: action.payload };

      default:
        return state;
    }
  };
  
  export default teamsReducer;
  