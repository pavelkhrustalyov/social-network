import { 
    GET_DIALOGS, 
    SET_FILTER,
    SET_CURRENT_DIALOG_ID,
    UPDATE_REARED_STATUS
     } from './dialogs.actionTypes';
    
import { setAlert } from '../alert/alert.actions';
import axios from 'axios';
import socket from '../../socket/socket.io';

export const getDialogs = () => async (dispatch) => {
    try {
        const dialogs = await axios.get('/api/dialogs');
        
        dispatch({
            type: GET_DIALOGS,
            payload: dialogs.data
        })
    } catch (err) {
        dispatch(setAlert('error', err.response.data.error));
    }
};

export const setFilter = (filter) => dispatch => {
    dispatch({
        type: SET_FILTER,
        payload: filter
    })
};

export const setDialogId = (id) => async (dispatch) => {
    socket.emit('DIALOGS:JOIN', id);
    dispatch({
        type: SET_CURRENT_DIALOG_ID,
        payload: id,
    });
};


export const createDialog = (data) => async (dispatch) => {
    try {
        await axios.post(`/api/dialogs/create/${data.userId}`, 
            { text: data.text }
        );
    } catch (err) {
        dispatch(setAlert('error', err.response.data.error));
    }
};

export const updateReadedStatus = (data) => (dispatch) => {
    dispatch({ type: UPDATE_REARED_STATUS, payload: data })
};
