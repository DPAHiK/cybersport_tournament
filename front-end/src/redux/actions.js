import axios from 'axios';

const API_URL = 'http://localhost:5000/';

export const setLoginToken = (token) => ({
  type: 'LOGIN',
  payload: token,
});

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

export const login = (loginData) => {
  return async (dispatch) => {
    const response = await axios.post(API_URL + 'login', loginData);
    sessionStorage.setItem('token', response.data.accessToken);
    dispatch(setLoginToken(response.data.accessToken));
  };
};

export const fetchTeams = () => {
  return async (dispatch) => {
    const response = await axios.get(API_URL + 'team');
    dispatch(setTeams(response.data));
  };
};

export const createTeam = (team) => {
  return async (dispatch) => {
    const response = await axios.post(API_URL + 'team', team);
    dispatch(addTeam(response.data));
  };
};

export const removeTeam = (id) => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const token = state.token 
      await axios.delete(`${API_URL + 'team'}/${id}`, {
        headers: {
            'Authorization': token
        }
      });
      dispatch(deleteTeam(id));
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
    }
  };
};

export const editTeam = (team) => {
  return async (dispatch) => {
    const response = await axios.put(`${API_URL + 'team'}/${team.id}`, team);
    dispatch(updateTeam(response.data));
  };
};
