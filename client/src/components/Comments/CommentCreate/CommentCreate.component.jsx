import React, { useState } from 'react';

import './CommentCreate.styles.scss';
import CustomInput from '../../CustomInput/CustomInput.component';
import CustomButton from '../../CustomButton/CustomButton.component';


const CommentCreate = ({ createComment, postId }) => {
    const [ comment, setComment ] = useState('');

    const onSubmitComment = (e) => {
        e.preventDefault();
        if (comment.trim() === '') {
            return;
        }
        createComment({ postId, text: comment });
        setComment('');
    };

    return (
        <div className="comment-create">
            <form 
                className="comment-create_form" 
                onSubmit={onSubmitComment}>
                <CustomInput
                    placeholder="Ваш комментарий"
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <CustomButton>Отправить</CustomButton>
            </form>
        </div>
    );
}

export default CommentCreate;