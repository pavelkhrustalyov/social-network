import React from 'react';

import './MainBg.styles.scss';
import classNames from 'classnames';

const MainBg = ({ children, noIndentation }) => {
    return (
        <div className={classNames("main-bg", {
            'indentation': noIndentation
        })}>
            {children}
        </div>
    );
}

export default MainBg;