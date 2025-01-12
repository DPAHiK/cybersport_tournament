import axios from 'axios';

const API_URL = 'http://localhost:5000/team/';

export const setTeams = (teams) => ({
  type: 'SET_TEAMS',
  payload: teams,
});

export const addTeam = (team) => ({
  type: 'ADD_TEAM',
  payload: team,
});

export const deleteTeam = (id) => ({
  type: 'DELETE_TEAM',
  payload: id,
});

export const updateTeam = (team) => ({
  type: 'UPDATE_TEAM',
  payload: team,
});

export const setError = (error) => ({
  type: "SET_ERROR",
  payload: error
})

export const fetchTeams = () => {
  return async (dispatch) => {
    const response = await axios.get(API_URL);
    dispatch(setTeams(response.data));
    dispatch(setError(null))
  };
};

export const createTeam = (team) => {
  return async (dispatch, getState) => {
    try{
      const state = getState()
      const token = state.auth.token 
      const response = await axios.post(API_URL, team, {
        headers: {
            'Authorization': token
        }
      });
      dispatch(addTeam(response.data));
      dispatch(setError(null))
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
    }

  };
};

export const removeTeam = (id) => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const token = state.auth.token 
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
            'Authorization': token
        }
      });
      dispatch(deleteTeam(id));
      dispatch(setError(null))
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
    }
  };
};

export const editTeam = (team) => {
  return async (dispatch) => {
    const response = await axios.put(`${API_URL}/${team.id}`, team);
    dispatch(updateTeam(response.data));
  };
};
