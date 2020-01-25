import React, { useState } from 'react';

import './MessageCreate.styles.scss';

import MainBg from '../../MainBg/MainBg.component';
import CustomButton from '../../CustomButton/CustomButton.component';
import CustomInput from '../../CustomInput/CustomInput.component';
import { connect } from 'react-redux';
import { sendMessageOnServer } from '../../../redux/messages/messages.actions';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { withRouter } from 'react-router-dom';

const MessageCreate = ({
    theme,
    sendMessageOnServer,
    match
    }) => {

    const [ message, setMessage ] = useState('');

    const [ activeSmiles, setActiveSmiles ] = useState(false);

    const messageData = {
        dialogId: match.params.dialogId,
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

const mapStateToProps = ({ theme, auth }) => ({
    theme: theme.theme,
    user: auth.user,
});

export default connect(mapStateToProps, 
    { sendMessageOnServer }
)(withRouter(MessageCreate));