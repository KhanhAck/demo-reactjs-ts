import {
    LOAD_USERS_FAILURE,
    LOAD_USERS_REQUEST,
    LOAD_USERS_SUCCESS,
    ADD_USER_FAILURE,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    UsersActionTypes,
    UsersState,
    GET_USER_BY_ID_FAILURE,
    GET_USER_BY_ID_REQUEST,
    GET_USER_BY_ID_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
} from './types';

const initialState: UsersState = {
    items: [],
    loading: false,
    deletedCount: 0,
    error: null,
    editUser: null,
};

const usersReducer = (
    state: UsersState = initialState,
    action: UsersActionTypes
): UsersState => {
    switch (action.type) {
        case LOAD_USERS_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case LOAD_USERS_SUCCESS: {
            return {
                ...state,
                items: action.payload.items,
                loading: false,
                error: null,
            };
        }
        case LOAD_USERS_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        }
        case ADD_USER_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case ADD_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
            };
        }
        case ADD_USER_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        }
        case GET_USER_BY_ID_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case GET_USER_BY_ID_SUCCESS: {
            return {
                ...state,
                editUser: action.payload.user,
                loading: false,
                error: null,
            };
        }
        case GET_USER_BY_ID_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        }
        case UPDATE_USER_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
            };
        }
        case UPDATE_USER_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        }
        default:
            return state;
    }
};

export { usersReducer };