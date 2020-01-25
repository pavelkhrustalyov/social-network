import React from 'react';

import './CustomButton.styles.scss';
import classNames from 'classnames';

const CustomButton = ({ children, unfollow, info, disabled, ...otherProps }) => {
    return (
        <button 
            disabled={disabled} {...otherProps} 
            className={classNames("btn", {
            "unfollow": unfollow,
            "user-info": info,
            "disabled": disabled
        })}>{children}</button>
    );
}

export default CustomButton;