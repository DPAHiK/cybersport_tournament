const initialState = {
    tournaments: []
  };
  
  const tournamentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TOURNAMENTS':
        return { ...state, tournaments: action.payload };
      case 'ADD_TOURNAMENT':
        return { ...state, tournaments: [...state.tournaments, action.payload] };
      case 'DELETE_TOURNAMENT':  
        return { ...state, tournaments: state.tournaments.filter(tournament => tournament.id !== action.payload) };
      default:
        return state;
    }
  };
  
  export default tournamentsReducer;
  