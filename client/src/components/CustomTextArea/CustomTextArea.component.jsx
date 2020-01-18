import React from 'react';
import './CustomTextArea.styles.scss';

const CustomTextArea = ({ label, ...otherProps }) => {
    return (
        <div className="customTextArea__field">
            {label && <label className="customTextArea__label">{label}</label>}
            <textarea 
                className="customTextArea__textarea"
                {...otherProps}
            >
            </textarea>
        </div>
    );
}
 
export default CustomTextArea;