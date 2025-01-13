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
  return async (dispatch, getState) => {
    try{
      const state = getState()
      const token = state.auth.token 
  
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
            'Authorization': token
        }
      });
      dispatch(setTournamentUnique(response.data));
      dispatch(setError(null))
  
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
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