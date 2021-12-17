import {
    ADD_USER_FAILURE,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    IAddUserRequest,
    LOAD_USERS_FAILURE,
    LOAD_USERS_REQUEST,
    LOAD_USERS_SUCCESS,
    UsersActionTypes,
    GET_USER_BY_ID_FAILURE,
    GET_USER_BY_ID_REQUEST,
    GET_USER_BY_ID_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    IUpdateUserRequest,
    DELETE_USERS_FAILURE,
    DELETE_USERS_REQUEST,
    DELETE_USERS_SUCCESS,
} from './types';

import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { UrlConstants } from '../../constants';
import { history } from '../../helpers';
import { userService } from '../../services';

import { alertError, alertSuccess, clearAlert } from '../alert/actions';

import { AlertActionTypes } from './../alert/types';

export const loadUsers = (search: string) => {
    return async (dispatch: Dispatch<UsersActionTypes>) => {
        try {
            dispatch({
                type: LOAD_USERS_REQUEST,
            });

            const res = await userService.getUsers(search);

            dispatch({
                type: LOAD_USERS_SUCCESS,
                payload: {
                    items: res
                },
            });
        } catch (error: any) {
            dispatch({
                type: LOAD_USERS_FAILURE,
                payload: { error: error.toString() },
            });
        }
    };
};

export const addUser = (user: IAddUserRequest) => {
    return async (dispatch: Dispatch<UsersActionTypes | AlertActionTypes>) => {
        try {
            dispatch({
                type: ADD_USER_REQUEST,
            });

            await userService.addUser(user);

            dispatch({
                type: ADD_USER_SUCCESS,
            });

            dispatch(alertSuccess('Add new user success'));

            history.push(UrlConstants.USERS_LIST);
        } catch (error: any) {
            dispatch({
                type: ADD_USER_FAILURE,
                payload: { error: error.toString() },
            });

            dispatch(alertError('Add new user error'));
        }

        setTimeout(() => {
            dispatch(clearAlert());
        }, 3000);
    };
};

export const updateUser = (id: string, user: IUpdateUserRequest) => {
    return async (dispatch: Dispatch<UsersActionTypes | AlertActionTypes>) => {
        try {
            dispatch({
                type: UPDATE_USER_REQUEST,
            });

            await userService.updateUser(id, user);

            dispatch({
                type: UPDATE_USER_SUCCESS,
            });

            dispatch(alertSuccess('Update user success'));

            history.push(UrlConstants.USERS_LIST);
        } catch (error: any) {
            dispatch({
                type: UPDATE_USER_FAILURE,
                payload: { error: error.toString() },
            });
            dispatch(alertError('Update user error'));
        }
        setTimeout(() => {
            dispatch(clearAlert());
        }, 3000);
    };
};

export const getUserById = (id: string) => {
    return async (dispatch: Dispatch<UsersActionTypes>) => {
        try {
            dispatch({
                type: GET_USER_BY_ID_REQUEST,
            });

            const res = await userService.getUserById(id);

            dispatch({
                type: GET_USER_BY_ID_SUCCESS,
                payload: {
                    user: res,
                },
            });
        } catch (error: any) {
            dispatch({
                type: GET_USER_BY_ID_FAILURE,
                payload: { error: error.toString() },
            });
        }
    };
};

export const deleteUsers = (userIds: string) => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        try {
            dispatch({
                type: DELETE_USERS_REQUEST,
            });

            await userService.deleteUsers(userIds);

            dispatch({
                type: DELETE_USERS_SUCCESS,
            });

            dispatch(alertSuccess('Delete user success'));

            dispatch(loadUsers(''));
        } catch (error: any) {
            dispatch({
                type: DELETE_USERS_FAILURE,
                payload: { error: error.toString() },
            });

            dispatch(alertError('Delete user error'));
        }

        setTimeout(() => {
            dispatch(clearAlert());
        }, 3000);
    };
};