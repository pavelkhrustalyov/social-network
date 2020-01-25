import React, { useEffect, useRef } from 'react';
import Message from '../Message/Message.component';
import { connect } from 'react-redux';
import {
    loadedMessages,
    createMessage,
    setLimitMessages,
} from '../../redux/messages/messages.actions';
import socket from '../../socket/socket.io';


const MessageContainer = ({
    messages,
    loadedMessages,
    dialogId,
    user,
    createMessage,
    limit,
    setLimitMessages,
}) => {

    const messagesEndRef = useRef()

    const scrollToBottom = () => {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const setLimit = () => {
        setLimitMessages(10);
    };
    
    useEffect(() => {
        const getMessage = (data) => {
            createMessage(data, dialogId);
        }
        loadedMessages(dialogId, limit);
        socket.on('CREATE_MESSAGE', getMessage);
        socket.emit('DIALOGS:JOIN', dialogId);

        return () => {
            socket.removeListener('CREATE_MESSAGE', getMessage);
        }

    }, [ dialogId, limit ]);

    return (
        <Message
            messagesEndRef={messagesEndRef}
            messages={messages}
            currentUser={user}
            dialogId={dialogId}
            limit={limit}
            setLimit={setLimit}
        />
    );
};

const mapStateToProps = ({ messages, auth }) => ({
    messages: messages.messages,
    user: auth.user,
    limit: messages.limit,
});

export default connect(mapStateToProps, {
    setLimitMessages,
    loadedMessages,
    createMessage,
})
(MessageContainer);