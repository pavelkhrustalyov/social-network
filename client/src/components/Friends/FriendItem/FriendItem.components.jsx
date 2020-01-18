import React from 'react';

import './FriendItem.styles.scss';
import Avatar from '../../Avatar/Avatar.component';
import { Link } from 'react-router-dom';

const FriendItem = ({ item }) => {
    return (
        <div className="friend-item">
            <Link to={`/user/${item._id}`}
                className="friend">
                <Avatar
                    middle
                    img={item.avatar}
                />
                <div>
                    {item.firstName}
                </div>
            </Link>
        </div>
    );
}

export default FriendItem;