import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';

import './EditProfile.styles.scss';
import CustomInput from '../CustomInput/CustomInput.component';
import CustomButton from '../CustomButton/CustomButton.component';
import CustomTextArea from '../CustomTextArea/CustomTextArea.component';
import CustomSelect from '../CustomSelect/CustomSelect.component';
import Preloader from '../Preloader/Preloader.component';
import { editUser } from '../../redux/users/users.actions';
import { withRouter } from 'react-router-dom';

const EditProfile = ({ editUser, user, history }) => {
    const [ selectData ] = useState([
        { value: 'Мужской', name: 'Мужской'},
        { value: 'Женский', name: 'Женский'}
    ]);

    const [ formData, setFormData ] = useState({
        firstName: '',
        secondName: '',
        city: '',
        sex: '',
        birthday: '',
        about: ''
    });

  
    useEffect(() => {
        setFormData({
            firstName: user && user !== null ? user.firstName : '',
            secondName: user && user !== null ? user.secondName : '',
            city: user && user !== null ? user.city : '',
            sex: user && user !== null && user.sex ? user.sex : 'Мужской',
            birthday: user && user.birthday ? formatDate(user.birthday) : '',
            about: user && user !== null ? user.about : ''
        });
    }, [ user ]);
    const onChangeFormData = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        editUser(formData, history);
    };

    const { firstName,
            secondName,
            city,
            sex,
            birthday,
            about } = formData;

    return (
        <div className="edit-profile">
             {
                (!user && user === null) ? <Preloader/>
                :
                <>
                    <form onSubmit={onSubmitForm} className="editForm">
                        <CustomInput
                            name="firstName"
                            placeholder="Введите имя"
                            label="Ваше имя:"
                            onChange={onChangeFormData}
                            value={firstName || ''}
                        />

                        <CustomInput
                            name="secondName"
                            placeholder="Введите фамилию"
                            label="Ваша фамилия:"
                            onChange={onChangeFormData}
                            value={secondName || ''}
                            
                        />

                        <CustomInput
                            name="city"
                            placeholder="Введите город"
                            label="Ваш город:"
                            onChange={onChangeFormData}
                            value={city || ''}
                        />

                        <CustomSelect
                            name="sex"
                            label="Пол:"
                            data={selectData}
                            onChange={onChangeFormData}
                            value={sex || 'Мужской'}
                        />

                        <CustomInput
                            name="birthday"
                            type="date"
                            label="Дата рождения:"
                            onChange={onChangeFormData}
                            value={birthday}
                        />

                        <CustomTextArea 
                            name="about"
                            placeholder="Напишите о себе"
                            label="О себе:"
                            onChange={onChangeFormData}
                            value={about || ''}
                        >
                        </CustomTextArea>

                        <CustomButton>Обновить</CustomButton>
                    </form>
                </>
            }
        </div>
    );
}

EditProfile.propTypes = {
    setAlert: PropTypes.func,
}

const mapStateToProps = ({ auth }) => ({
    user: auth.user,
});

export default connect(mapStateToProps, { editUser })
(withRouter(EditProfile));