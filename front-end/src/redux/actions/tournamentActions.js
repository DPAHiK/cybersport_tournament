import axios from 'axios';

const API_URL = 'http://localhost:5000/tournament/';

export const setTournaments = (tournaments) => ({
  type: 'SET_TOURNAMENTS',
  payload: tournaments,
});

export const setError = (error) => ({
  type: "SET_ERROR",
  payload: error
})

export const fetchTournaments = () => {
  return async (dispatch) => {
    const response = await axios.get(API_URL);
    dispatch(setTournaments(response.data));
    dispatch(setError(null))
  };
};

