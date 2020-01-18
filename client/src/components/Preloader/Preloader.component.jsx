import React from 'react';

import './Preloader.styles.scss'
const Preloader = () => {
    return (
        <div className="lds-ripple">
            <div></div>
            <div></div>
        </div>
    );
}
 
export default Preloader;