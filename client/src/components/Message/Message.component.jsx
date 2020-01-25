import React from 'react';

import './Message.styles.scss';
import MessageItem from '../MessageItem/MessageItem.component';
import MessageCreate from '../MessageItem/MessageCreate/MessageCreate';
import Preloader from '../Preloader/Preloader.component';

const Message = ({
    dialogId,
    messages,
    currentUser,
    setLimit,
    limit,
    messagesEndRef }) => {

    return (
        <div className="message_wrap">
            {
                messages && messages.count > limit ?
                (<span onClick={setLimit} className="messages-loadmore">
                    Загрузить предыдущие 10 сообщений
                </span>) : null
            }
            <div ref={messagesEndRef} className="messages">
                {
                    currentUser && messages.messages &&
                    messages.messages !== null ?
                    messages.messages.map(
                        item => {
                        return <MessageItem
                            key={ item._id }
                            isMe={currentUser._id === (item.user._id || item.user)}
                            { ...item }
                        /> }
                    )
                    : <Preloader />
                }
            </div>
            {
                dialogId ? <MessageCreate /> : null
            }
        </div>
    )
}

export default Message;