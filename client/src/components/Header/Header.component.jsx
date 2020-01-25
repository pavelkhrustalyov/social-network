import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.styles.scss';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth/auth.actions';
import CustomToggleTheme from '../CustomToggleTheme/CustomToggleTheme.component';
import SearchPeople from '../SearchPeople/SearchPeople.component';
import SearchedUsers from '../SearchedUsers/SearchedUsers.component';
import Avatar from '../Avatar/Avatar.component';
import UserUtils from '../UserInfo/UserUtils/UserUtils.component';

const Header = ({ 
    isAuthenticated,
    loading, 
    user, 
    logout,
    searchVisible
    }) => {

    const [ mobileLinksActive, setMobileLinksActive ] = useState(true);
    const [ utilsActive, setUtilsActive ] = useState(false);
    
    const privateLinks = (
        <>
            <li className="header__list-item user">
                <Link className="header__list-link" 
                        to={`/user/${user !== null && user._id}`}>
                        <Avatar
                            img={user && user.avatar} vsmall />
                </Link>
                <div
                    onClick={() => setUtilsActive(!utilsActive)}
                    className="data_user_list">
                    <span className="user">{user && user.firstName}</span>
                    <span className="caret"></span>
                </div>
                {
                   utilsActive ? <UserUtils/> : null
                }
            </li>
            <li className="header__list-item">
                <Link className="header__list-link" to="/feed">
                    <i className="fas fa-rss-square"></i>
                </Link>
            </li>
            <li className="header__list-item">
                <Link className="header__list-link" to="/dialogs">
                    <i className="fas fa-comments"></i>
                </Link>
            </li>
            <li className="header__list-item">
                <Link to="/" className="header__list-link" 
                    onClick={() => logout()}
                >
                    <i className="fas fa-sign-out-alt"></i>
                </Link>
            </li>
            <li className="header__list-item search">
                <SearchPeople />
                {
                    searchVisible ? <SearchedUsers /> : null
                }
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
            <div className="header__list-item">
                <i 
                    onClick={() => setMobileLinksActive(!mobileLinksActive)}
                    className="fas fa-bars burger">
                </i>
            </div>
            <div className="header__logo">
                <Link className="header__logo-link"
                    to={user && user !== null ? 
                    `/user/${user._id}` : '/'}
                >
                    <i className="fas fa-spinner"></i>
                </Link>
            </div>
            <CustomToggleTheme />
           {
                mobileLinksActive && 
                (<ul className="header__list">
                    {
                        isAuthenticated && !loading && user !== null
                        ? privateLinks : publicLinks
                    }
                </ul>)
           }
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