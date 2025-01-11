import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers.js';

const getTokenFromSessionStorage = () => {
    return sessionStorage.getItem('token');
};

const initialState = {
        token: getTokenFromSessionStorage(),
        teams: [],
        error: null,
};

const store = createStore(rootReducer, initialState,  applyMiddleware(thunk));

export default store;
