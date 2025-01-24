import axios from 'axios';

const API_URL = 'http://localhost:5000/tournament/';

export const setTournaments = (tournaments) => ({
  type: 'SET_TOURNAMENTS',
  payload: tournaments,
});

export const setTournamentUnique = (tournament) => ({
  type: 'SET_TOURNAMENT_UNIQUE',
  payload: tournament,
});

export const setEngagedTeams = (engagedTeams) => ({
  type: 'SET_ENGAGED_TEAMS',
  payload: engagedTeams,
});

export const setMatches = (matches) => ({
  type: 'SET_MATCHES',
  payload: matches,
});

export const setResults = (results) => ({
  type: 'SET_TOURNMAENT_RESULTS',
  payload: results,
});

export const updateMatches = (match) => ({
  type: 'UPDATE_MATCH',
  payload: match,
});

export const addTournament = (tournament) => ({
  type: 'ADD_TOURNAMENT',
  payload: tournament,
});

export const deleteTournament = (id) => ({
  type: 'DELETE_TOURNAMENT',
  payload: id,
});

export const setError = (error) => ({
  type: "SET_ERROR",
  payload: error
})

export const fetchTournaments = () => {
  return async (dispatch) => {
    try{
      const response = await axios.get(API_URL);
      dispatch(setTournaments(response.data));
      dispatch(setError(null))
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
    }
  };
};

export const fetchTournamentById = (id) => {
  return async (dispatch) => {
    try{
  
      const response = await axios.get(`${API_URL}/${id}`);
      dispatch(setTournamentUnique(response.data));
      dispatch(setError(null))
  
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
    }
  };
};

export const fetchEngagedTeams = (id) => {
  return async (dispatch) => {
    try{
      let responseIds = await axios.get(`${API_URL}${id}/team`);
      const responseProfile = await axios.get(`${API_URL}${id}/team/profile`);
      
      for (let i = 0; i < responseIds.data.length; i++) responseIds.data[i].name = responseProfile.data[i].name
      
      dispatch(setEngagedTeams(responseIds.data));
      dispatch(setError(null))
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
    }
  };
};

export const fetchMatches = (id) => {
  return async (dispatch) => {
    try{
      const response = await axios.get(`${API_URL}${id}/match`);
      
      dispatch(setMatches(response.data));
      dispatch(setError(null))
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
    }
  };
};

export const fetchResults = (id) => {
  return async (dispatch) => {
    try{
      const response = await axios.get(`${API_URL}${id}/result`);
      
      dispatch(setResults(response.data));
      dispatch(setError(null))
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
    }
  };
};

export const generateGrid = (id) => {
  return async (dispatch, getState) => {
    try{
      const state = getState()
      const token = state.auth.token 
      const response = await axios.post(`${API_URL}${id}/generate`, {}, {
        headers: {
            'Authorization': token
        }
      });
      dispatch(setError(null))

      return response.data
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))

      return err.response.data
    }

  };
};

export const createTournament = (tournament) => {
  return async (dispatch, getState) => {
    try{
      const state = getState()
      const token = state.auth.token 
      const response = await axios.post(API_URL, tournament, {
        headers: {
            'Authorization': token
        }
      });
      dispatch(addTournament(response.data));
      dispatch(setError(null))

      return response.data
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))

      return err.response.data
    }

  };
};

export const removeTournament = (id) => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const token = state.auth.token 
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
            'Authorization': token
        }
      });
      dispatch(deleteTournament(id));
      dispatch(setError(null))
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
    }
  };
};

export const updateMatch = (id, match) => {
  return async (dispatch, getState) => {
    try{
      const state = getState()
      const token = state.auth.token 
      const response = await axios.put(`http://localhost:5000/match/${id}`, match, {
        headers: {
            'Authorization': token
        }
      });
      dispatch(updateMatches(match));
      dispatch(setError(null))

      return response.data
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))

      return err.response.data
    }

  };
};