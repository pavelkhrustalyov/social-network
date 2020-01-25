import React from 'react';
import './DialogPage.styles.scss';

import DialogContainer from '../../components/Containers/DialogContainer';
import Container from '../../components/Grid/Container.component';
import Row from '../../components/Grid/Row.component';
import Col from '../../components/Grid/Col.component';
 
const DialogPage = () => {
    return (
        <div className="dialog-page">
            <Container>
                <Row center>
                    <Col xs={12} md={9} lg={9}>
                        <DialogContainer />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default DialogPage;