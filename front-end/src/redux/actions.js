import axios from 'axios';

const API_URL = 'http://localhost:5000/';

export const setLoginToken = (token) => ({
  type: 'LOGIN',
  payload: token,
});

export const deleteLoginToken = () => ({
  type: 'LOGOUT'
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
    try {
      const response = await axios.post(API_URL + 'login', loginData);
      sessionStorage.setItem('token', response.data.accessToken);
      dispatch(setLoginToken(response.data.accessToken));
      dispatch(setError(null))
      
    } catch (err) {
      console.log(err.response);
      dispatch(setError(err.response))
      return true;
    }
  };
};

export const signup = (signupData) => {
  return async (dispatch) => {
    try {
      await axios.post(API_URL + 'signup', signupData);
      dispatch(setError(null))
    } catch (err) {
      console.log(err.response);
      dispatch(setError(err.response))
      return true;
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try{
      sessionStorage.removeItem('token');
      dispatch(deleteLoginToken());
      dispatch(setError(null))
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
    }
  };
};

export const fetchTeams = () => {
  return async (dispatch) => {
    const response = await axios.get(API_URL + 'team');
    dispatch(setTeams(response.data));
  };
};

export const createTeam = (team) => {
  return async (dispatch, getState) => {
    try{
      const state = getState()
      const token = state.auth.token 
      console.log(token)
      const response = await axios.post(API_URL + 'team', team, {
        headers: {
            'Authorization': token
        }
      });
      dispatch(addTeam(response.data));
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
