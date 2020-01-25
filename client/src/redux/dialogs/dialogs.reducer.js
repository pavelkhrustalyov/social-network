import { 
    GET_DIALOGS, 
    SET_FILTER,
    SET_CURRENT_DIALOG_ID,
    UPDATE_REARED_STATUS
} from './dialogs.actionTypes';

const initial_state = {
    dialogs: [],
    loading: false,
    currentDialogId: null,
    filter: '',
    dialogOpened: false
};
const updateDialog = (dialogs, payload) => {
    return dialogs.map(dialog => {
        return dialog._id === payload.dialogId
        ? { ...dialog, lastMessage: dialog.lastMessage.map(msg => {
            return (msg.user || msg.user.id) !== payload.userId
            ? { ...msg, readed: true }
            : msg
        })}
        : dialog
    })
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
        case UPDATE_REARED_STATUS:
            return {
                ...state,
                dialogs: updateDialog(state.dialogs, payload)
            }
        default:
            return state;
    }
}



export default reducer;