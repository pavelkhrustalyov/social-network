import React from 'react';

import './MessageItem.styles.scss';
import classNames from 'classnames';
import Moment from 'react-moment';

const MessageItem = ({ text, createdAt, isMe, readed }) => {
    return (
        <>
            <div className={classNames("message-item", {
                'my': isMe
            })}>
                {text}
                <div className="message-item_utils">
                    {
                        !readed && isMe ? <i className="fas fa-check"></i>
                        : readed && isMe ? <i className="fas fa-check-double"></i>
                        : null
                    }
                    <span className="message-item_date">
                        <Moment format="DD/MM | HH:mm">
                            {createdAt}
                        </Moment>
                    </span>
                </div>
            </div>
        </>
    );
}

export default MessageItem;