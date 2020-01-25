import React from 'react';

import './FullFriends.styles.scss';
import Modal from '../../Modal/Modal.component';
import { connect } from 'react-redux';
import Avatar from '../../Avatar/Avatar.component';
import { Link } from 'react-router-dom';

const FullFriends = ({ friends }) => {
    return (
        <Modal big>
            <div className="full-friends">
                <h1>Все друзья:</h1>
                {
                   friends && friends.length > 0 ? friends.map(friend => {
                        return (
                            <div key={friend._id} className="full-friends_item">
                                <Link to={`/user/${friend._id}`}>
                                    <Avatar isOnline={friend.isOnline} middle img={friend.avatar} />
                                </Link>
                                <div className="name">{friend.fullName}</div>
                            </div>
                        )
                    })
                    : <p>Ничего не найдено!</p>
                }
            </div>
        </Modal>
    );
}

const mapStateToProps = ({ users }) => ({
    friends: users.friends,
});

export default connect(mapStateToProps)(FullFriends);