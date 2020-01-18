import React from 'react';
import './DialogPage.styles.scss';

import DialogContainer from '../../components/Containers/DialogContainer';
import MessageContainer from '../../components/Containers/MessageContainer';

const DialogPage = () => {
    return (
        <div className="dialog-page">
            <DialogContainer />
            <MessageContainer />
        </div>
    );
}

export default DialogPage;