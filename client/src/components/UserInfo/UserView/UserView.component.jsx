import React, { useState } from 'react';

import './UserView.style.scss';

import CustomInput from '../../CustomInput/CustomInput.component';
import isFollow from '../../../utils/isFollow';
import CustomButton from '../../CustomButton/CustomButton.component';
import Avatar from '../../Avatar/Avatar.component';
import { setAvatar, getCarpets } from '../../../redux/users/users.actions';
import { connect } from 'react-redux';
import { setShowModal } from '../../../redux/others/other.actions';

const UserView = ({
    user,
    history,
    myUser,
    unfollowUser,
    followUser,
    follow,
    setShowModal,
    setAvatar,
    isOnline,
    getCarpets
}) => {

    const [ image, setImage ] = useState(null);

    const onChangeImage = (e) => {
        setImage(e.target.files[0]);
    };

    const onSubmitImage = (e) => {
        e.preventDefault();
        const form_data = new FormData();
        form_data.append('avatar', image, image.name);
        setAvatar(form_data);
        setImage(null);
    };

    return (
        <>
        <div className="home-page__user-view">
          <div className="avatar">
            <Avatar
              isOnline={isOnline}
              large
              img={user.avatar}
              name="avatar"
            />
            {
                user._id === myUser._id && 
                <form className="avatar_form" onSubmit={onSubmitImage}>
                    {
                        !image &&
                        <div className="avatar_button">
                            <CustomInput
                                type="file"
                                name="avatar"
                                onChange={onChangeImage}
                                icon="true"
                            />
                        </div>
                    }
                    <div className="avatar_form-actions">
                        {
                            image &&
                            <>
                                <CustomButton>Обновить</CustomButton>
                                <CustomButton 
                                    onClick={() => setImage(null)}>
                                    Отмена
                                </CustomButton>
                            </>
                        }
                    </div>
                </form>
            }
          </div>
          <div className="home-page__user-actions">
            <h1 className="user-info__utils-heading">
              {user.fullName}
            </h1>
            <div className="actions">
              {  
                (user._id !== myUser._id) ? (
                <>
                  {
                  isFollow(user, myUser) || follow ?
                      (<CustomButton 
                        onClick={() => unfollowUser(user._id)}
                        unfollow>Отписаться
                      </CustomButton>)
                    : (<CustomButton
                        onClick={() => followUser(user._id)}>
                        Подписаться
                      </CustomButton>)
                  }
                  <CustomButton
                    info
                    onClick={() => setShowModal('dialog')}>
                    Написать
                  </CustomButton>
                </>
              ) : (
                <>
                  <CustomButton
                    info
                    onClick={() => history.push('/edit-user')}
                  >Редактировать</CustomButton>
                  <CustomButton
                    info
                    onClick={getCarpets}
                  >Сменить коврик</CustomButton>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
}


export default connect(null, { setAvatar, setShowModal, getCarpets })(UserView);