import React from 'react';

import './LikesView.styles.scss';
import Avatar from '../Avatar/Avatar.component';
import { Link } from 'react-router-dom';

const LikesView = ({ likes }) => {
    return (
        <div className="likes-view">
            {
                likes.length === 0 ? 
                <p className="empty_likes">Пусто</p>
                :
                likes.map(user => {
                    return (
                        <Link key={user._id} to={`/user/${user._id}`}>  
                            <Avatar small img={user.avatar} />
                        </Link>
                    )
                })
            }
        </div>
    );
}

export default LikesView;