const initialState = {
    teams: [],
    error: null,
    token: ''
  };
  
  const teamsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TEAMS':
        return { ...state, teams: action.payload, error: null };
      case 'ADD_TEAM':
        return { ...state, teams: [...state.teams, action.payload] };
      case 'DELETE_TEAM':
        
        return { ...state, teams: state.teams.filter(team => team.id !== action.payload) };
      case 'UPDATE_TEAM':
        return {
          ...state,
          teams: state.teams.map(team => (team.id === action.payload.id ? action.payload : team)),
        };

      case 'SET_ERROR':
        return{...state, error: action.payload}

      case 'LOGIN':
        
        return { ...state, token: action.payload, error: null };
      case 'LOGOUT':
        return { ...state, token: '', error: null };
      case 'SIGNUP':
        return state;
      default:
        return state;
    }
  };
  
  export default teamsReducer;
  