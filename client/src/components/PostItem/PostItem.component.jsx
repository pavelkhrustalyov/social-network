import React from 'react';

import './PostItem.styles.scss';
import Avatar from '../Avatar/Avatar.component';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { likeUnlike, deletePost, showComments } from '../../redux/users/users.actions';
import LikesView from '../LikesView/LikesView.component';
import CreateComment from '../Comments/CommentCreate/CommentCreate.component';
import Comments from '../Comments/Comments.component';

const PostItem = ({
    user,
    post,
    likeUnlike,
    deletePost,
    showComments
    }) => {
        
    return (
        <div className="post_item">
            <div className="post_item-author">
                <Avatar small img={post.user.avatar} />
                <div className="post_item-author_data">
                <div className="post_item-author_name">
                    {post.user.fullName}
                </div>
                    <div className="post_item-author_date">
                        <Moment format="DD-MM-YYYY HH:mm">
                            { post.createdAt }
                        </Moment>
                    </div>
                </div>
            </div>
            {
                post.postImg ?  
                    <div className="post_item-img">
                        <img src={`/uploads/posts/${post.postImg}`} alt={post._id} />
                    </div>
                : null
            }
           {
                post.text ? 
                    <p className="post_item-text">{post.text}</p>
                : null
           }
            <div className="post_item-utils">
                <div className="post_item-likes">
                    <div onClick={() => likeUnlike(post._id)} 
                        className="fas fa-heart">
                        <LikesView likes={ post.likes } />
                    </div>
                    <span>{post.likes.length}</span>
                </div>
                <div 
                    onClick={() => showComments(post._id)}
                    className="post_item-comments">
                    <i className="fas fa-comments"></i>
                    <span>{post.comments.length}</span>
                </div>
                {
                    user._id === post.user._id
                    ?<div className="post_item-delete">
                        <i onClick={() => deletePost(post._id)}
                            className="fas fa-trash-alt">
                        </i>
                    </div>
                    : null
                }
            </div>
            {
                post.showComments && post.comments.length > 0 
                ? <Comments comments={post.comments} />
                : null
            }
            <CreateComment postId={post._id} />
        </div>
    );
}
const mapStateToProps = ({ auth: { user }}) => ({
    user,
});

export default connect(mapStateToProps, {
    likeUnlike,
    deletePost,
    showComments
})(PostItem);