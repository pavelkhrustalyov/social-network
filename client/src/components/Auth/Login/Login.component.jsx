import React, { useState } from 'react';
import './Login.styles.scss';
import CustomInput from '../../CustomInput/CustomInput.component';
import CustomButton from '../../CustomButton/CustomButton.component';
import { login } from '../../../redux/auth/auth.actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Login = ({ selectedAuth, history, login }) => {
    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    });

    const onChangeFormData = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const { email, password } = formData;

    const logIn = (e) => {
        e.preventDefault();
        login(formData, history);
    };

    return (
        <form onSubmit={logIn} className="login">
            <CustomInput
                name="email"
                type="email"
                placeholder="Ваш email"
                onChange={onChangeFormData}
                value={email}
            />
            <CustomInput
                name="password"
                type="password"
                placeholder="Ваш пароль"
                onChange={onChangeFormData}
                value={password}
            />
            <div className="account_question">Нет аккаунта? 
                <span onClick={() => selectedAuth('register')}>Регистрация</span>
            </div>
            <CustomButton>Войти</CustomButton>
        </form>
    );
}


export default connect(null, { login })(withRouter(Login));