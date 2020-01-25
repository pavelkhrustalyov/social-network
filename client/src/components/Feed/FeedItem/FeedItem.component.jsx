import React from 'react';
import './FeedItem.styles.scss';
import Avatar from '../../Avatar/Avatar.component';
import Moment from 'react-moment';
import LikesView from '../../LikesView/LikesView.component';
import Comments from '../../Comments/Comments.component';
import CreateComment from '../../Comments/CommentCreate/CommentCreate.component';
import { connect } from 'react-redux';

import {
    likeUnlikeFeed,
    showCommentFeed,
    createCommentFeed,
    deleteCommentFeed
} from '../../../redux/feed/feed.actions';

const FeedItem = ({
    createCommentFeed,
    feedItem,
    likeUnlikeFeed,
    showCommentFeed,
    deleteCommentFeed
}) => {
    return (
        <div className="feed-item">
            <div className="feed-item-author">
                <Avatar small img={feedItem.user.avatar} />
                <div className="feed-item-author_data">
                <div className="feed-item-author_name">
                    {feedItem.user.fullName}
                </div>
                    <div className="feed-item-author_date">
                        <Moment format="DD-MM-YYYY HH:mm">
                            { feedItem.createdAt }
                        </Moment>
                    </div>
                </div>
            </div>
            {
                feedItem.postImg ?
                    <div className="feed-item-img">
                        <img src={`/uploads/posts/${feedItem.postImg}`}
                        alt={feedItem._id} />
                    </div>
                : null
            }
           {
                feedItem.text ?
                    <p className="feed-item-text">{feedItem.text}</p>
                : null
           }
            <div className="feed-item-utils">
                <div className="feed-item-likes">
                    <div onClick={() => likeUnlikeFeed(feedItem._id)} 
                        className="fas fa-heart">
                        <LikesView likes={ feedItem.likes } />
                    </div>
                    <span>{feedItem.likes.length}</span>
                </div>
                <div
                    onClick={() => showCommentFeed(feedItem._id)}
                    className="feed-item-comments">
                    <i className="fas fa-comments"></i>
                    <span>{feedItem.comments.length}</span>
                </div>
            </div>
            {
                feedItem.showComments && feedItem.comments.length > 0
                ? <Comments
                    deleteComment={deleteCommentFeed}
                    comments={feedItem.comments}
                    />
                : null
            }
            <CreateComment
                createComment={createCommentFeed}
                postId={feedItem._id}
            />
        </div>
    );
}

export default connect(null, 
    {
        likeUnlikeFeed,
        showCommentFeed,
        createCommentFeed,
        deleteCommentFeed
    }
)(FeedItem);
