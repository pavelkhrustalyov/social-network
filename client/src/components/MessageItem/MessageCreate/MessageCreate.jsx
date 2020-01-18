import React, { useState } from 'react';

import './MessageCreate.styles.scss';

import MainBg from '../../MainBg/MainBg.component';
import CustomButton from '../../CustomButton/CustomButton.component';
import CustomInput from '../../CustomInput/CustomInput.component';
import { connect } from 'react-redux';
import { sendMessageOnServer } from '../../../redux/messages/messages.actions';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import socket from '../../../socket/socket.io';

const MessageCreate = ({ theme, currentId, sendMessageOnServer }) => {
    const [ message, setMessage ] = useState('');

    const [ activeSmiles, setActiveSmiles ] = useState(false);

    const messageData = {
        dialogId: currentId,
        text: message
    }

    const onChangeFormData = (e) => {
       setMessage(e.target.value);
    };

    const onSelectSmile = (smile) => {
        setMessage(message + smile.native);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (message.trim() === '') {
            return;
        }
        socket.emit('MESSAGE_CLIENT', messageData);
        sendMessageOnServer(messageData);
        setMessage('');
    };
    return (
        <MainBg>
            <div className="message-create">
                <form onSubmit={onSubmitForm} className="send-message_form">
                    <CustomInput
                        type="text"
                        name="message"
                        placeholder="Напишите сообщение"
                        onChange={onChangeFormData}
                        value={message}
                        onFocus={() => setActiveSmiles(false)}
                    />
                    <i className="fas fa-laugh-wink"
                        onClick={() => setActiveSmiles(true)}>
                            {
                               activeSmiles ? 
                               (<span className="message-create_picker">
                                    <Picker
                                        onSelect={onSelectSmile} 
                                        darkMode={theme === "light"}
                                        set="apple"
                                    />
                                </span>) : null
                            }
                    </i>
                    <CustomButton>Отправить</CustomButton>
                </form>
            </div>
        </MainBg>
    );
};

const mapStateToProps = ({ dialogs, theme }) => ({
    currentId: dialogs.currentDialogId,
    theme: theme.theme
});

export default connect(mapStateToProps, { sendMessageOnServer })(MessageCreate);