import React from 'react';
import classNames from 'classnames';
import './Avatar.styles.scss';

const Avatar = ({ isOnline, img, name, small, middle, large, vsmall }) => {
    return (
        <div className="avatar">
            <img src={`/uploads/avatars/${img}`} alt={name} className={classNames("avatar__img", {
                'avatar__img-small': small,
                'avatar__img-middle': middle,
                'avatar__img-large': large,
                'avatar__img-vsmall': vsmall
            })}/>
            {
                isOnline !== undefined && 
                <div className={classNames("status", {
                    'online': isOnline,
                    'offline': !isOnline,
                })}>
                </div>
            }
        </div>
    );
}

export default Avatar;