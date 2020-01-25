import React from 'react';
import './DialogPage.styles.scss';

import DialogContainer from '../../components/Containers/DialogContainer';
import MessageContainer from '../../components/Containers/MessageContainer';
import Container from '../../components/Grid/Container.component';

const DialogPage = () => {
    return (
        <Container>
            <div className="dialog-page">
                <DialogContainer />
                <MessageContainer />
            </div>
        </Container>
    );
}

export default DialogPage;