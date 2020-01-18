import { CHANGE_THEME } from './theme.types';
import { applytheme } from './utils.theme';

export const changeTheme = (theme) => (dispatch) => {
    applytheme(theme);
    localStorage.setItem("theme", theme);
    dispatch({
        type: CHANGE_THEME,
        payload: theme
    })
};