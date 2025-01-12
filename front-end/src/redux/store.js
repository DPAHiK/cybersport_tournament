import { createStore, applyMiddleware, combineReducers  } from 'redux';
import thunk from 'redux-thunk';
import teamReducer from './teamReducer.js';
import authReducer from './authReducers.js';
import errorReducer from './errorReducer.js';

const rootReducer = combineReducers({
    team: teamReducer,
    auth: authReducer,
    error: errorReducer
});

const getTokenFromSessionStorage = () => {
    return sessionStorage.getItem('token');
};

const initialState = {
    team:{
        
        teams: []
    },

    auth: {
        token: getTokenFromSessionStorage(),
    },

    error:{
        body: null
    }

};

const store = createStore(rootReducer, initialState,  applyMiddleware(thunk));

export default store;
