import React, { useState, useEffect } from 'react';

import './MessageCreate.styles.scss';

import MainBg from '../../MainBg/MainBg.component';
import CustomButton from '../../CustomButton/CustomButton.component';
import CustomInput from '../../CustomInput/CustomInput.component';
import { connect } from 'react-redux';
import { sendMessageOnServer } from '../../../redux/messages/messages.actions';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
const MessageCreate = ({
    theme,
    currentId,
    sendMessageOnServer
    }) => {
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

    const onInput = () => {
        
    };

    useEffect(() => {
        onInput();
    }, []);

    
    const onSubmitForm = (e) => {
        e.preventDefault();
        if (message.trim() === '') {
            return;
        }
        sendMessageOnServer(messageData);
        setMessage('');
        setActiveSmiles(false);
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
                        onFocus={onInput}
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

const mapStateToProps = ({ dialogs, theme, auth }) => ({
    currentId: dialogs.currentDialogId,
    theme: theme.theme,
    user: auth.user,
});

export default connect(mapStateToProps, 
    { sendMessageOnServer }
)(MessageCreate);