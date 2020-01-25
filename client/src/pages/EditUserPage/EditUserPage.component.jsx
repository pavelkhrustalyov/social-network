import React from 'react';
import './EditUserPage.styles.scss';
import EditProfile from '../../components/EditProfile/EditProfile.component';
import Container from '../../components/Grid/Container.component';
import Row from '../../components/Grid/Row.component';
import Col from '../../components/Grid/Col.component';

const EditUserPage = () => {
    return (
        <Container>
            <Row center>
                <Col xs={12} md={9} lg={12}>
                    <div className="edit-user-page">
                        <div className="edit-user-page__heading">
                            Редактировать профиль
                        </div>
                        <EditProfile />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
 
export default EditUserPage;