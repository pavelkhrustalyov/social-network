import { SET_SEARCH_VISIBLE, OPEN_MODAL } from './other.types';

export const setSearchVisible = (bool) => (dispatch) =>{
    dispatch({
        type: SET_SEARCH_VISIBLE,
        payload: bool
    });
};

export const setShowModal = (type) => (dispatch) => {
    dispatch({
        type: OPEN_MODAL,
        payload: type
    });
}
