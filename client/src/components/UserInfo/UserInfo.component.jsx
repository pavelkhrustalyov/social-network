import React from 'react';
import './UserInfo.styles.scss';
import MainBg from '../MainBg/MainBg.component';
import { AgeFromDateString } from 'age-calculator';
import formatISO from 'date-fns/formatISO';

const birthdayFormat = (date) => {
    return formatISO(new Date(date), 
    { representation: 'date'});
};

const UserInfo = ({ user }) => {
    return (
        <MainBg>
            <div className="user-info">
                <div className="user-info__utils">
                    <h1 className="user-info__utils-heading">
                        {user.fullName}
                    </h1>
                <span className="user-info__utils-status">Offline</span>
                </div>
                <ul className="user-info__list">
                    { user.city ? 
                    <li
                        className="user-info__item">
                        Город: 
                        <span>{user.city}</span>
                    </li> : null }

                    { user.birthday ?
                    <li
                        className="user-info__item">
                        Дата рождения:
                        <span>
                            { birthdayFormat(user.birthday) }
                            {' '}
                            ({new AgeFromDateString(birthdayFormat(user.birthday)).age} лет)
                        </span>
                    </li> : null }

                    { user.sex ? 
                    <li 
                        className="user-info__item">
                        Пол: 
                        <span>{user.sex}</span>
                    </li> : null }

                    { user.about ? 
                    <li 
                        className="user-info__item">
                        О себе: 
                        <span>{user.about}</span>
                    </li> : null }
                </ul>
            </div>
        </MainBg>
    );
}

export default UserInfo;