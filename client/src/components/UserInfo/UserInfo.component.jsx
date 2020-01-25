import React from 'react';
import './UserInfo.styles.scss';
import MainBg from '../MainBg/MainBg.component';
import { AgeFromDateString } from 'age-calculator';
import formatISO from 'date-fns/formatISO';
import numeralize from 'numeralize-ru';

const birthdayFormat = (date) => {
    return formatISO(new Date(date), 
    { representation: 'date'});
};

const UserInfo = ({ user }) => {
    const age = user.birthday && 
    new AgeFromDateString(birthdayFormat(user.birthday)).age;
    return (
        <MainBg>
            <div className="user-info">
                <div className="user-info__utils">
                <div className="user-info__about">О пользователе:</div>
                <span className="user-info__utils-status"></span>
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
                        Возраст:
                        <span>
                            { age } { numeralize.pluralize(age, 'год', 'года', 'лет') }
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