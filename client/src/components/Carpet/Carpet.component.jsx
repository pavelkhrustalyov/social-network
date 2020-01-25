import React from 'react';

import './Carpet.styles.scss';

const Carpet = ({ children, carpet }) => {
    return (
        <div className="carpet">
            <div className="carpet_overlay"></div>
            <img 
                className="carpet_img"
                src={`/uploads/carpets/${carpet}`}
                alt="carpet"
            />
            <div className="user-view">
                { children }
            </div>
        </div>
    );
}

export default Carpet;