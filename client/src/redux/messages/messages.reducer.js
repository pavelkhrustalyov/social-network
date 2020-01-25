import {
    LOADED_MESSAGES,
    CREATE_MESSAGE,
    SET_LIMIT_MESSAGES,
    LOADING_MSG
} from './messages.actionTypes';

import { UPDATE_REARED_STATUS } from '../dialogs/dialogs.actionTypes';

const initial_state = {
    messages: [],
    loading: true,
    limit: 25,
}

const reducer = (state = initial_state, { type, payload }) => {
    switch(type) {
        case LOADED_MESSAGES:
            return {
                ...state,
                loading: false,
                messages: payload,
            }
        case CREATE_MESSAGE:
            return {
                ...state,
                loading: false,
                messages: { ...state.messages, messages: [ 
                    ...state.messages.messages, payload
                ]}
            }
        case SET_LIMIT_MESSAGES:
            return {
                ...state,
                limit: state.limit += payload,
            }
        case UPDATE_REARED_STATUS:
            return {
                ...state,
                loading: false,
                messages: {
                    ...state.messages, 
                    messages: state.messages.messages && 
                    state.messages.messages.map(msg => {
                        return msg.dialogId === payload.dialogId
                        && (msg.user || msg.user._id) !== payload.userId 
                        ?
                        { ...msg, readed: true }
                        : msg
                    })
                }
            }
        case LOADING_MSG:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default reducer;