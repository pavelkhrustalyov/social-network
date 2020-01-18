import { 
    GET_DIALOGS, 
    SET_FILTER,
    SET_CURRENT_DIALOG_ID
} from './dialogs.actionTypes';

const initial_state = {
    dialogs: null,
    loading: false,
    currentDialogId: window.location.pathname.split('dialogs/')[1],
    filter: '',
    dialogOpened: false
};

const reducer = (state = initial_state, { type, payload }) => {
    switch(type) {
        case GET_DIALOGS:
            return {
                ...state,
                loading: false,
                dialogs: payload,
            }
        case SET_FILTER:
            return {
                ...state,
                filter: payload
            }
        case SET_CURRENT_DIALOG_ID:
            return {
                ...state,
                currentDialogId: payload,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;