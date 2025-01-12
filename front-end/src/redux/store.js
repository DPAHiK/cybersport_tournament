import { createStore, applyMiddleware, combineReducers  } from 'redux';
import thunk from 'redux-thunk';
import teamReducer from './teamReducer.js';
import authReducer from './authReducers.js';
import errorReducer from './errorReducer.js';
import tournamentReducer from './tournamentReducer.js'

const rootReducer = combineReducers({
    team: teamReducer,
    auth: authReducer,
    error: errorReducer,
    tournament: tournamentReducer
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
    },

    tournament:{
        tournaments: []
    }

};

const store = createStore(rootReducer, initialState,  applyMiddleware(thunk));

export default store;
