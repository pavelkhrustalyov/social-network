import React from 'react';
import './EditUserPage.styles.scss';
import EditProfile from '../../components/EditProfile/EditProfile.component';

const EditUserPage = () => {
    return (
        <div className="edit-user-page">
            <div className="edit-user-page__heading">
                Редактировать профиль
            </div>
            <EditProfile />
        </div>
    );
}
 
export default EditUserPage;