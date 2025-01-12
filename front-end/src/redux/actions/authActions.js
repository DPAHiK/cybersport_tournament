import axios from 'axios';

const API_URL = 'http://localhost:5000/';

export const setLoginToken = (token) => ({
  type: 'LOGIN',
  payload: token,
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

