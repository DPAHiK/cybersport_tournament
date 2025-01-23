import axios from 'axios';

const API_URL = 'http://localhost:5000/tournament/';

export const setQueries = (queries) => ({
  type: 'SET_QUERIES',
  payload: queries,
});

export const setQueryTeams = (queryTeams) => ({
  type: 'SET_QUERY_TEAMS',
  payload: queryTeams,
});

export const updateQuery = (query) => ({
    type: 'UPDATE_QUERY',
    payload: query,
  });


export const setError = (error) => ({
  type: "SET_ERROR",
  payload: error
})

export const fetchQueries = (id) => {
  return async (dispatch, getState) => {
    try{
      const state = getState()
      const token = state.auth.token 
      const response = await axios.get(`${API_URL}${id}/query`, {
        headers: {
            'Authorization': token
        }
      });
      
      dispatch(setQueries(response.data));
      dispatch(setError(null))
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
    }
  };
};

export const fetchQueryTeams = (id) => {
  return async (dispatch, getState) => {
    try{
      const state = getState()
      const token = state.auth.token 
      const responseProfile = await axios.get(`${API_URL}${id}/query/team`, {
        headers: {
            'Authorization': token
        }
      });
      
      dispatch(setQueryTeams(responseProfile.data));
      dispatch(setError(null))
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
    }
  };
};

export const createQuery = (body) => {
  return async (dispatch, getState) => {
    try{
      const state = getState()
      const token = state.auth.token 
      const response = await axios.post(`http://localhost:5000/team/1/query`, body, {
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

export const editQuery = (id, body) => {
  return async (dispatch, getState) => {
    try{
      const state = getState()
      const token = state.auth.token 
      const response = await axios.put(`http://localhost:5000/team/1/query/${id}`, body, {
        headers: {
            'Authorization': token
        }
      });
      dispatch(updateQuery(body))
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

export const createQueryMember = (body) => {
  return async (dispatch, getState) => {
    try{
      const state = getState()
      const token = state.auth.token 
      const response = await axios.post(`http://localhost:5000/team/1/query`, body, {
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

export const deleteQueryMember = (id) => {
  return async (dispatch, getState) => {
    try{
      const state = getState()
      const token = state.auth.token 
      const response = await axios.put(`http://localhost:5000/team/1/query/${id}`, body, {
        headers: {
            'Authorization': token
        }
      });
      dispatch(updateQuery(body))
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