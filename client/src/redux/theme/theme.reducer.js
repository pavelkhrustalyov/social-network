import { CHANGE_THEME } from './theme.types';

const initial_state = {
    theme: localStorage.getItem("theme") || "dark"
};

export default (state = initial_state, { type, payload }) => {
    switch(type) {
        case CHANGE_THEME:
            return {
                ...state,
                theme: payload
            }
        default:
            return state
    }
}
