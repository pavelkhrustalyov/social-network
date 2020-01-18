import React, { useEffect } from 'react';

import './Message.styles.scss';
import MessageItem from '../MessageItem/MessageItem.component';
import MessageCreate from '../MessageItem/MessageCreate/MessageCreate';

const Message = ({
    dialogId,
    messages,
    messageRef,
    scroll,
    currentUser,
    setLimit,
    limit }) => {

    useEffect(() => {
        scroll();
    }, [scroll]);

    return (
        <div className="message_wrap">
            {
                messages && messages.count > limit ?
                (<span onClick={setLimit} className="messages-loadmore">
                    Загрузить еще 10 сообщений
                </span>) : null
            }
            <div ref={messageRef} className="messages">
                {
                    currentUser && messages ?
                    messages.messages.map(
                        item => {
                        return <MessageItem
                            key={ item._id }
                            isMe={currentUser._id === (item.user._id || item.user)}
                            { ...item }
                        /> }
                    )
                    : <p className="select_dialog">
                        <i className="fas fa-hand-point-left"></i>
                        <span>Выберите диалог</span>
                    </p>
                }
            </div>
            {
                dialogId ? <MessageCreate /> : null
            }
        </div>
    )
}

export default Message;