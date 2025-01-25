const initialState = {
    tournaments: [],
    tournamentUnique: null,
    engagedTeams: [],
    matches: [],
    results: [],
  };
  
  const tournamentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TOURNAMENTS':
        return { ...state, tournaments: action.payload };
      case 'SET_TOURNAMENT_UNIQUE':
        return { ...state, tournamentUnique: action.payload };
      case 'SET_TOURNMAENT_RESULTS':
        return { ...state, results: action.payload };
      case 'ADD_TOURNAMENT':
        return { ...state, tournaments: [...state.tournaments, action.payload] };
      case 'DELETE_TOURNAMENT':  
        return { ...state, tournaments: state.tournaments.filter(tournament => tournament.id !== action.payload) };
      case 'DELETE_MATCH':  
        return { ...state, matches: state.matches.filter(match => match.id !== action.payload) };
      case "SET_ENGAGED_TEAMS":
        return { ...state, engagedTeams: action.payload };
      case "SET_MATCHES":
        return { ...state, matches: action.payload };
      case "UPDATE_MATCH":
        return {
          ...state,
          matches: state.matches.map(match => (match.id === action.payload.id ? action.payload : match)),
        };
      default:
        return state;
    }
  };
  
  export default tournamentsReducer;
  