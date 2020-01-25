import React from 'react';

const Col = ({ xs, md, lg, children }) => {
    return (
        <div className={`col-xs-${xs} col-md-${md} col-lg-${lg}`}>
            { children }
        </div>
    );
}

export default Col;