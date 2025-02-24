const initialState = {
    teams: [],
    teamUnique: null,
    teamMembers: []
  };
  
  const teamsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TEAMS':
        return { ...state, teams: action.payload };
      case 'SET_TEAM_UNIQUE':
        return { ...state, teamUnique: action.payload };
      case 'SET_TEAM_MEMBERS':
        return { ...state, teamMembers: action.payload };
      case 'ADD_TEAM':
        return { ...state, teams: [...state.teams, action.payload] };
      case 'DELETE_TEAM':
        return { ...state, teams: state.teams.filter(team => team.id !== action.payload) };
      case 'DELETE_MEMBER':
        return { ...state, teamMembers: state.teamMembers.filter(member => member.id !== action.payload) };
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
  