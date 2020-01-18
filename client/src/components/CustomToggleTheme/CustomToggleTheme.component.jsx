import React from 'react';
import './CustomToggleTheme.styles.scss';
import { connect } from 'react-redux';
import { changeTheme } from '../../redux/theme/theme.actions';
import { applytheme } from '../../redux/theme/utils.theme';

const CustomToggleTheme = ({ theme, changeTheme, ...otherProps }) => {
    const tm = theme === "dark" ? "light" : "dark";

    React.useEffect(() => {
        applytheme(tm);
    }, [tm])

    return (
        <div onClick={() => changeTheme(tm)}
            className="custom-toggle-theme" {...otherProps}>
            {
                theme === 'dark'
                ? <i className="fas fa-sun"></i>
                : <i className="fas fa-moon"></i>
            }
        </div>
    )
}
const mapStateToProps = ({ theme }) => ({
    theme: theme.theme
});

export default connect(mapStateToProps, 
    { changeTheme }
)(CustomToggleTheme);