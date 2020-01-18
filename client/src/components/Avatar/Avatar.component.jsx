import React from 'react';
import classNames from 'classnames';
import './Avatar.styles.scss';

const Avatar = ({ img, name, small, middle, large }) => {
    return (
        <div className="avatar">
            <img src={`/uploads/avatars/${img}`} alt={name} className={classNames("avatar__img", {
                'avatar__img-small': small,
                'avatar__img-middle': middle,
                'avatar__img-large': large
            })}/>
        </div>
    );
}

export default Avatar;