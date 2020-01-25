import {
    LOADED_MESSAGES,
    CREATE_MESSAGE,
    SET_LIMIT_MESSAGES,
} from './messages.actionTypes';

import { setAlert } from '../alert/alert.actions';
import axios from 'axios';

export const loadedMessages = (id, limit = 25) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/dialogs/messages/${id}?limit=${limit}`);
        dispatch({
            type: LOADED_MESSAGES,
            payload: { messages: res.data.messages, count: res.data.count }
        })
    } catch (err) {
        setAlert('error', err.response.data.error);
    }
};

export const createMessage = (message, dialogId) => async (dispatch) => {

    try {
        
        if (message.dialogId === dialogId) {
            dispatch({
                type: CREATE_MESSAGE,
                payload: message
            })
        }

    } catch (err) {
        setAlert('error', err.response.data.error);
    }
};

export const sendMessageOnServer = ({ text, dialogId }) => async () => {
    return await axios.post(`/api/dialogs/create-message/${dialogId}`, {
        text
    });
};

export const setLimitMessages = (limit) => (dispatch) => {
    dispatch({
        type: SET_LIMIT_MESSAGES,
        payload: limit
    })
}