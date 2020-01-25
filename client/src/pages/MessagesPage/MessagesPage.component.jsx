import React from 'react';
import './MessagesPage.styles.scss';
import MessageContainer from '../../components/Containers/MessageContainer';
import Container from '../../components/Grid/Container.component';
import Row from '../../components/Grid/Row.component';
import Col from '../../components/Grid/Col.component';
import CustomButton from '../../components/CustomButton/CustomButton.component';


const MessagesPage = ({ match, history }) => {
    return (
        <div className="messages-page">
            <Container>
                <Row center>
                    <Col xs={12} md={9} lg={9}>
                        <CustomButton onClick={() => history.push('/dialogs')}>
                            К диалогам
                        </CustomButton>
                        <MessageContainer dialogId={match.params.dialogId} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default MessagesPage;