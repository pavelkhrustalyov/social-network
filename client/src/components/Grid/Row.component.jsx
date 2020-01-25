import React from 'react';
import classNames from 'classnames';

const Row = ({ children, center }) => {
    return (
        <div className={classNames("row", {
            "justify-content-center": center
        })}>
            { children }
        </div>
    );
}

export default Row;