import * as types from './actionTypes';

var reducer = function (state = {}, action) {
    console.log(action.type);
    switch (action.type) {
        case "SET_STATE": {
            return Object.assign({}, state, action.state);
        }
        case types.SET_TOKEN_SUCCESS: {
            return Object.assign({}, state, { token: action.payload });
        }

        case types.SET_TOKEN_FAILED: {
            return state;
        }
    }
    return state;
}

module.exports = reducer;