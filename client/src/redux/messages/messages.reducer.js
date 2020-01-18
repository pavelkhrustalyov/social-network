import {
    LOADED_MESSAGES,
    CREATE_MESSAGE,
    SET_LIMIT_MESSAGES
} from './messages.actionTypes';

const initial_state = {
    messages: null,
    loading: true,
    limit: 8,
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
        default:
            return state;
    }
}

export default reducer;