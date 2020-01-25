import React from 'react';
import './Comments.styles.scss';
import CommentItem from './CommentItem/CommentItem.component';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const Comments = ({ comments, deleteComment }) => {
    return (
        <>
           {
                comments.length > 0 ?
                <CSSTransitionGroup
                    transitionName="comments"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {
                        comments.map(
                        comment => <CommentItem
                            deleteComment={deleteComment}
                            key={comment._id}
                            { ...comment }
                        />
                    )}
                </CSSTransitionGroup>
                
                : <p>Комментариев нет</p>
           }
        </>
    );
}
 
export default Comments;