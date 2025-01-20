import { createStore, applyMiddleware, combineReducers  } from 'redux';
import thunk from 'redux-thunk';
import teamReducer from './reducers/teamReducer.js';
import authReducer from './reducers/authReducers.js';
import errorReducer from './reducers/errorReducer.js';
import tournamentReducer from './reducers/tournamentReducer.js'
import queryReducer from './reducers/queryReducer.js'

const rootReducer = combineReducers({
    team: teamReducer,
    auth: authReducer,
    error: errorReducer,
    tournament: tournamentReducer,
    query: queryReducer,
});

const getTokenFromSessionStorage = () => {
    return sessionStorage.getItem('token');
};

const initialState = {
    team:{
        teams: [],
        teamUnique: null,
    },

    auth: {
        token: getTokenFromSessionStorage(),
    },

    error:{
        body: null
    },

    tournament:{
        tournaments: [],
        tournamentUnique: null,
        engagedTeams: [],
        matches: [],
        queries: [],
    },

    query:{
        queries: [],
        queryTeams: [],
    }
};

const store = createStore(rootReducer, initialState,  applyMiddleware(thunk));

export default store;
