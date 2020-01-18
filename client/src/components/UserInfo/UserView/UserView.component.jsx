import React, { useState } from 'react';

import './UserView.style.scss';

import MainBg from '../../MainBg/MainBg.component';
import CustomInput from '../../CustomInput/CustomInput.component';
import isFollow from '../../../utils/isFollow';
import CustomButton from '../../CustomButton/CustomButton.component';
import Avatar from '../../Avatar/Avatar.component';
import { setAvatar } from '../../../redux/users/users.actions';
import { connect } from 'react-redux';

const UserView = ({
    user,
    history,
    myUser,
    unfollowUser,
    followUser,
    follow,
    setShowModal,
    setAvatar
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
        <MainBg>
        <div className="home-page__user-view">
          <div className="avatar">
            <Avatar
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
                                text="Изменить фото"
                                name="avatar"
                                onChange={onChangeImage}
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
                <CustomButton onClick={() => setShowModal('dialog')}>
                  Написать
                </CustomButton>
              </>
            ) : (
              <CustomButton
                onClick={() => history.push('/edit-user')}
              >Редактировать</CustomButton>
            )}
          </div>
        </div>
      </MainBg>
    );
}
 
export default connect(null, { setAvatar })(UserView);