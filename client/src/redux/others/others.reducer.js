import { SET_SEARCH_VISIBLE, OPEN_MODAL } from './other.types';

const initial_state = {
    searchVisible: false,
    showModal: null
};

export default (state = initial_state, { type, payload }) => {
    switch(type) {
        case SET_SEARCH_VISIBLE:
            return {
                ...state,
                searchVisible: payload
            }
        case OPEN_MODAL:
           return  {
                ...state,
                showModal: payload
            }
        default:
            return state;
    }
};