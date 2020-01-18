import { SET_ALERT, REMOVE_ALERT } from './alertActionTypes';

const initial_state = [];

const reducer = (state = initial_state, { type, payload }) => {
    switch(type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(err => err.id !== payload);
        default:
            return state;
    }
};

export default reducer;