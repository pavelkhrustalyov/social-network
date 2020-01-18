import React, { useState } from 'react';
import './AuthPage.styles.scss';

import Register from '../../components/Auth/Register/Register.component';
import Login from '../../components/Auth/Login/Login.component';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthPage = ({ user }) => {
    const [ selectedAuthType, setSelectedAuthType ] = useState('login');
    const selectedAuth = (type) => setSelectedAuthType(type);

    return (
        <>
            {
                user && user !== null
                ?
                    <Redirect to={`/user/${user._id}`} />
                :   (<div className="auth-page">
                        {
                            selectedAuthType === 'login' 
                            ? (<Login selectedAuth={selectedAuth} />)
                            : (<Register selectedAuth={selectedAuth} />)
                        }
                    </div>)
            }
        </>

    );
};

const mapStateToProps = ({ auth }) => ({
    user: auth.user
});

export default connect(mapStateToProps)(AuthPage);