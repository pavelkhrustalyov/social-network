import React, { useState } from 'react';
import './Register.styles.scss';
import CustomInput from '../../CustomInput/CustomInput.component';
import CustomButton from '../../CustomButton/CustomButton.component';
import { registerSuccess } from '../../../redux/auth/auth.actions';
import { setAlert } from '../../../redux/alert/alert.actions';
import { connect } from 'react-redux';
import store from '../../../redux/store';
import { withRouter } from 'react-router-dom';

const Register = ({ selectedAuth, registerSuccess, history }) => {
    const [ formData, setFormData ] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        firstName: '',
        secondName: ''
    });

    const onChangeFormData = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const { email,
            password,
            repeatPassword,
            firstName,
            secondName } = formData;

    const register = (e) => {
        e.preventDefault();
        const { repeatPassword, ...data } = formData;
        if (password !== repeatPassword) {
            store.dispatch(setAlert('error', 'Пароли не совпадают'));  
            return;
        }
        registerSuccess(data, history);
    }

    return (
        <form onSubmit={register} className="register">
            <CustomInput
                name='email'
                type="email"
                placeholder="Ваш email"
                onChange={onChangeFormData}
                value={email}
            />
            <CustomInput
                name='firstName'
                type="text"
                placeholder="Ваше имя"
                onChange={onChangeFormData}
                value={firstName}
            />
            <CustomInput
                name='secondName'
                type="text"
                placeholder="Ваша фамилия"
                onChange={onChangeFormData}
                value={secondName}
            />
            <CustomInput
                name="password"
                type="password"
                placeholder="Ваш пароль"
                onChange={onChangeFormData}
                value={password}
            />
            <CustomInput
                name="repeatPassword"
                type="password"
                placeholder="Повторите пароль"
                onChange={onChangeFormData}
                value={repeatPassword}
            />
            <div className="account_question">
                Есть аккаунт? 
                <span onClick={() => selectedAuth('login')}>Войти</span>
            </div>
            <CustomButton>Регистрация</CustomButton>
        </form>
    );
};

export default connect(null, { registerSuccess })(withRouter(Register));