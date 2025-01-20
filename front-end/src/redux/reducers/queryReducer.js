const initialState = {
    queries: [],
    queryTeams: [],
  };
  
  const tournamentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_QUERIES":
        return { ...state, queries: action.payload };
      case "SET_QUERY_TEAMS":
        return { ...state, queryTeams: action.payload };
    case 'UPDATE_QUERY':
        return {
            ...state,
            queries: state.queries.map(query => (query.id === action.payload.id ? action.payload : query)),
        };
      default:
        return state;
    }
  };
  
  export default tournamentsReducer;
  