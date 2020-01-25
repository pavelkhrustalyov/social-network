import React from 'react';
import './CommentItem.styles.scss';
import Avatar from '../../Avatar/Avatar.component';
import formatDate from '../../../utils/formatDate';
import { connect } from 'react-redux';

const CommentItem = ({
    text,
    _id,
    postId,
    createdAt,
    deleteComment,
    user,
    author }) => {
    return (
        <div className="comment_item">
            <Avatar small img={author.avatar} />
            <div className="comment_item-user">
            <div className="comment_item-data">
                <div className="comment_item-fullname">
                    {author.fullName}
                </div>
                <div className="comment_item-date">{formatDate(createdAt)}</div>
            </div>
                <div className="comment_item-text">{text}</div>
            </div>
            {
                user && user._id === author._id && (
                    <span className="comment_item-delete" 
                        onClick={() => deleteComment({ postId, _id })}>
                    Удалить</span>
                )
            }
        </div>
    );
}
const mapStateToProps = ({ auth: { user } }) => ({
    user
});
export default connect(mapStateToProps)(CommentItem);