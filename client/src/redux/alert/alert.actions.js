import { SET_ALERT, REMOVE_ALERT } from './alertActionTypes';
import { uuid } from 'uuidv4';

export const setAlert = (type, message) => (dispatch) => {
    const uid = uuid();
    const errorData = { id: uid, type, message };
    dispatch({
        type: SET_ALERT,
        payload: errorData
    });

    setTimeout(() => dispatch({
        type: REMOVE_ALERT,
        payload: uid
    }), 3000);
};