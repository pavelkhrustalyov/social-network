import React from 'react';

import './CustomButton.styles.scss';
import classNames from 'classnames';

const CustomButton = ({ children, unfollow, ...otherProps }) => {
    return (
        <button {...otherProps} className={classNames("btn", {
            "unfollow": unfollow
        })}>{children}</button>
    );
}

export default CustomButton;