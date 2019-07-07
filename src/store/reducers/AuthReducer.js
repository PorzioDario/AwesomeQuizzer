import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    idUser: null,
    username: null,
    isNewUser: false
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_AUTHENTICATION:
            return {
                ...state,
                token: action.payload.token,
                idUser: action.payload.idUser,
                username: action.payload.username
            };
        case ActionTypes.RESET_AUTHENTICATION:
            return initialState;
        case ActionTypes.SET_NEW_USER:
            return {
                ...state,
                isNewUser: true
            };
        case ActionTypes.REGISTRATION_COMPLETED:
            return {
                ...state,
                isNewUser: false
            }
        default: return state;
    }
}

export default AuthReducer;