import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
import { CLEAR_USER } from '../users/users.types';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from './auth.types';
import setAuthToken from './utils';

export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/users/user/me');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};

export const registerSuccess = (data, history) => async (dispatch) => {
    try {
        const res = await axios.post('/api/auth/register', data)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
        history.push('/');
        dispatch(setAlert('success', 'Вы успешно зарегистировались!'));
    } catch (err) {
        const errors = err.response.data.errors;
        const error = err.response.data.error;

        if (errors) {
            errors.forEach(error => dispatch(setAlert('error', error.msg)));
        } else if (error) {
            dispatch(setAlert('error', error));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

export const login = (data, history) => async (dispatch) =>{
    try {
        const res = await axios.post('/api/auth/login', data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
        dispatch(setAlert('success', 'Вы успешно авторизовались!'));
        history.push('/');
    } catch (err) {
        const errors = err.response.data.errors;
        const error = err.response.data.error;

        if (errors) {
            errors.forEach(error => dispatch(setAlert('error', error.msg)));
        } else if (error) {
            dispatch(setAlert('error', error));
        }
        dispatch({
            type: LOGIN_FAIL
        });

    }
}

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT
    });
    dispatch({
        type: CLEAR_USER
    });
};