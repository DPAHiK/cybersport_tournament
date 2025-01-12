import { createStore, applyMiddleware, combineReducers  } from 'redux';
import thunk from 'redux-thunk';
import teamReducer from './reducers/teamReducer.js';
import authReducer from './reducers/authReducers.js';
import errorReducer from './reducers/errorReducer.js';
import tournamentReducer from './reducers/tournamentReducer.js'

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
