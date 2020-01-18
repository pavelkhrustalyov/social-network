import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.styles.scss';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth/auth.actions';
import CustomToggleTheme from '../CustomToggleTheme/CustomToggleTheme.component';
import SearchPeople from '../SearchPeople/SearchPeople.component';
import Avatar from '../Avatar/Avatar.component';
import SearchedUsers from '../SearchedUsers/SearchedUsers.component';

const Header = ({ 
    isAuthenticated,
    loading, 
    user, 
    logout,
    searchVisible
    }) => {
    const privateLinks = (
        <>  
            <li className="header__list-item">
                <Avatar small img={ user && user.avatar } />
            </li>
            <li className="header__list-item">
                <SearchPeople />
                {
                    searchVisible ? <SearchedUsers /> : null
                }
            </li>
            <li className="header__list-item">
                <Link className="header__list-link" 
                    to={`/user/${user !== null && user._id}`}>
                    <i className="fas fa-user"></i>
                    Моя страница
                </Link>
            </li>
            <li className="header__list-item">
                <Link className="header__list-link" to="/dialogs">
                    <i className="fas fa-comments"></i>
                    Диалоги
                </Link>
            </li>
            <li className="header__list-item">
                <Link to="/" className="header__list-link" 
                    onClick={() => logout()}
                >
                    <i className="fas fa-sign-out-alt"></i>
                    Выйти
                </Link>
            </li>
        </>
    );

    const publicLinks = (
        <Link className="header__list-link" to="/">
            <i className="fas fa-sign-in-alt"></i>
            Вход
        </Link>
    );
    return (
        <div className="header">
            <div className="header__logo">
                <Link className="header__logo-link" to={user && user !== null ? 
                    `/user/${user._id}` : '/'}
                >
                    <i className="fas fa-spinner"></i>
                </Link>
            </div>
            <CustomToggleTheme />

            <ul className="header__list">
                {
                    isAuthenticated && !loading && user !== null
                    ? privateLinks : publicLinks
                }
            </ul>
        </div>
    );
};

const mapStateToProps = ({ auth, others }) => ({
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
    user: auth.user,
    searchVisible: others.searchVisible
});
export default connect(mapStateToProps, { logout })(withRouter(Header));