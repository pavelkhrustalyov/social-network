import { darkTheme, lightTheme } from './themes';

export const applytheme = (nextTheme) => {
    const theme = nextTheme === "light" ? lightTheme : darkTheme;
    Object.keys(theme).map(key => {
        const value = theme[key];
        return document.documentElement.style.setProperty(key, value);
    });
};