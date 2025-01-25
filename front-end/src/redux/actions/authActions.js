import axios from 'axios';

const API_URL = 'http://localhost:5000/';

export const setLoginToken = (token) => ({
  type: 'LOGIN',
  payload: token,
});

export const setRole = (role) => ({
  type: 'SET_ROLE',
  payload: role,
});

export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const deleteLoginToken = () => ({
  type: 'LOGOUT'
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
      sessionStorage.setItem('role', response.data.role);

      dispatch(setLoginToken(response.data.accessToken));
      dispatch(setRole(response.data.role));
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
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('user');
      
      dispatch(deleteLoginToken());
      dispatch(setError(null))
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
    }
  };
};

export const me = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const token = state.auth.token 
      const result = await axios.get(`http://localhost:5000/user/me`, {
        headers: {
            'Authorization': token
        }
      });

      sessionStorage.setItem('user', result.data.id)
      //dispatch(setUser(result.data));
      //dispatch(setError(null))
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
    }
  };
};

export const myProfile = () => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const token = state.auth.token 
      const result = await axios.get(`http://localhost:5000/user/me`, {
        headers: {
            'Authorization': token
        }
      });
      
      dispatch(setUser(result.data));
      dispatch(setError(null))
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
    }
  };
};

export const changePassword = (body) => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const token = state.auth.token 
      await axios.put(`http://localhost:5000/auth/changePassword`, body, {
        headers: {
            'Authorization': token
        }
      });
      
      dispatch(setError(null))
    }
    catch(err){
      console.log(err.response);
      dispatch(setError(err.response))
    }
  };
};