const initialState = {
    teams: []
  };
  
  const teamsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TEAMS':
        return { ...state, teams: action.payload };
      case 'ADD_TEAM':
        return { ...state, teams: [...state.teams, action.payload] };
      case 'DELETE_TEAM':
        
        return { ...state, teams: state.teams.filter(team => team.id !== action.payload) };
      case 'UPDATE_TEAM':
        return {
          ...state,
          teams: state.teams.map(team => (team.id === action.payload.id ? action.payload : team)),
        };


      default:
        return state;
    }
  };
  
  export default teamsReducer;
  