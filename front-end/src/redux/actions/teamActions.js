import axios from 'axios';

const API_URL = 'http://localhost:5000/team/';

export const setTeams = (teams) => ({
  type: 'SET_TEAMS',
  payload: teams,
});

export const setTeamUnique = (team) => ({
  type: 'SET_TEAM_UNIQUE',
  payload: team,
});

export const setTeamMembers = (teamMembers) => ({
  type: 'SET_TEAM_MEMBERS',
  payload: teamMembers,
});


export const addTeam = (team) => ({
  type: 'ADD_TEAM',
  payload: team,
});

export const deleteTeam = (id) => ({
  type: 'DELETE_TEAM',
  payload: id,
});

export const deleteMember = (id) => ({
  type: 'DELETE_MEMBER',
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
    try{
      const response = await axios.get(API_URL);
      dispatch(setTeams(response.data));
      dispatch(setError(null))
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
    }
  };
};

export const fetchTeamById = (id) => {
  return async (dispatch) => {
    try{
      const response = await axios.get(`${API_URL}${id}`);
      dispatch(setTeamUnique(response.data));
      dispatch(setError(null))
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
    }
  };
};

export const fetchTeamMembers = (id) => {
  return async (dispatch) => {
    try{
      let responseIds = await axios.get(`${API_URL}${id}/member`);
      const responseProfile = await axios.get(`${API_URL}${id}/member/profile`);
      
      for (let i = 0; i < responseIds.data.length; i++) responseIds.data[i].name = responseProfile.data[i].name
      
      dispatch(setTeamMembers(responseIds.data));
      dispatch(setError(null))
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
    }
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

      return response.data
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))

      return err.response.data
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

export const removeMember = (id, teamId) => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const token = state.auth.token 
      await axios.delete(`${API_URL}${teamId}/member/${id}`, {
        headers: {
            'Authorization': token
        }
      });
      dispatch(deleteMember(id));
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

