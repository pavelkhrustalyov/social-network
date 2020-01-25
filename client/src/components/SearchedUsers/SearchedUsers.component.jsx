import React from 'react';
import './SearchedUsers.styles.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar.component';
import { setSearchVisible } from '../../redux/others/other.actions';

const SearchedUsers = ({ users, setSearchVisible }) => {

    const content = users && users !== null && users.length > 0 
        && users.map((user) => {
        return (
            <ul key={user._id} className="searched-users_list">
                <Link 
                    className="searched-users_item"
                    to={`/user/${user._id}`}>
                    <Avatar isOnline={user.isOnline} small img={user.avatar} />
                    {user.fullName}
                </Link>
            </ul>
        )
    });

    const empty = users && users !== null
        && users.length === 0 && (
            <p className="empty_users">
                <i className="fas fa-inbox"></i>
                Введите имя пользователя
            </p>
        );


    const error = users == null && (
        <p className="empty_users">
            <i className="fas fa-inbox"></i>
            Не найдено
        </p>
    );

    

    return (
        <div className="searched-users">
             <div className="searched-users_options">
                <h3 className="searched-users_heading">Люди:</h3>
                <p className="searched-users_close" 
                    onClick={() => setSearchVisible(false)}>Закрыть</p>
             </div>
            { content || (empty || error) }
        </div>
    );
}
const mapStateToProps = ({ users: { users, loading } }) => ({
    users,
    loading
});

export default connect(mapStateToProps, { setSearchVisible })(SearchedUsers);