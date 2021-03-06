import React from 'react';

import './Post.styles.scss';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PostItem from '../PostItem/PostItem.component';

const Post = ({ posts }) => {
    const title = posts.length === 0 ? 
        `Здесь еще ничего нет 😟`
        : 'Всего постов: ' + posts.length
    return (
        <div className="post">
            <h3>{title}</h3>
            <CSSTransitionGroup
                transitionName="posts"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
            >
                { posts.map(item => <PostItem key={item._id} post={item} />) }
            </CSSTransitionGroup>
        </div>
    );
};

export default Post;