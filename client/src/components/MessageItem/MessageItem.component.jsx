import React from 'react';

import './MessageItem.styles.scss';
import classNames from 'classnames';
import Moment from 'react-moment';

const MessageItem = ({ text, createdAt, isMe }) => {
    return (
        <>
            <div className={classNames("message-item", {
                'my': isMe
            })}>
                {text}
                <span className="message-item_date">
                    <Moment format="DD/MM | HH:mm">
                        {createdAt}
                    </Moment>
                </span>
            </div>
        </>
    );
}

export default MessageItem;