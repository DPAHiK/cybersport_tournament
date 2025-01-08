import axios from 'axios';

const API_URL = 'http://localhost:5000/team';

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

export const fetchTeams = () => {
  return async (dispatch) => {
    const response = await axios.get(API_URL);
    dispatch(setTeams(response.data));
  };
};



export const createTeam = (team) => {
  return async (dispatch) => {
    const response = await axios.post(API_URL, team);
    dispatch(addTeam(response.data));
  };
};

export const removeTeam = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch(deleteTeam(id));
    }
    catch(err){
      console.log(err);
    }
  };
};

export const editTeam = (team) => {
  return async (dispatch) => {
    const response = await axios.put(`${API_URL}/${team.id}`, team);
    dispatch(updateTeam(response.data));
  };
};
