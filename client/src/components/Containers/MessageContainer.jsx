import React, { useEffect, useRef } from 'react';
import Message from '../Message/Message.component';
import { connect } from 'react-redux';
import {
    loadedMessages,
    createMessage,
    setLimitMessages
} from '../../redux/messages/messages.actions';
import socket from '../../socket/socket.io';

const MessageContainer = ({
    messages,
    loadedMessages,
    dialogId,
    user,
    createMessage,
    limit,
    setLimitMessages
}) => {
    const messageRef = useRef(null);

    let scrollToLastMessage = () => {
        const scrollHeight = messageRef.current.scrollHeight;
        const clientHeight = messageRef.current.clientHeight;
        const maxScrollTop = scrollHeight - clientHeight;
        messageRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    const setLimit = () => {
        setLimitMessages(10);
    };
    
    useEffect(() => {
        const getMessage = (data) => {
            createMessage(data, dialogId);
        }

        loadedMessages(dialogId, limit);

        socket.on('CREATE_MESSAGE', getMessage);

        return () => socket.removeListener('CREATE_MESSAGE', getMessage);

    }, [ dialogId, limit ]);


    return (
        <Message
            scroll={scrollToLastMessage}
            messageRef={messageRef}
            messages={messages}
            currentUser={user}
            dialogId={dialogId}
            limit={limit}
            setLimit={setLimit}
        />
    );
};

const mapStateToProps = ({ messages, dialogs, auth }) => ({
    messages: messages.messages,
    dialogId: dialogs.currentDialogId,
    user: auth.user,
    limit: messages.limit,
});

export default connect(mapStateToProps, {
    setLimitMessages,
    loadedMessages,
    createMessage })
(MessageContainer);