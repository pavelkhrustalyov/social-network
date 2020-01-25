import React, { forwardRef } from 'react';

import './CustomInput.styles.scss';

const CustomInput = forwardRef((props, ref) => {
    return (
        props.type === 'file'
        ? ( <div className="upload-btn-wrapper">
                <button className="upload-btn">
                {
                    props.icon ? <i className="fas fa-paperclip"></i>
                    : <span>{props.text}</span>
                }
                </button>
                <input ref={ref} { ...props } type={props.type} />
            </div>)
        : ( <div className="custom-input__form-field">
                {props.label && <label
                    htmlFor={props.id}
                    className="custom-input__label">{props.label}
                    </label> }
                <input
                    {...props}
                    ref={ref}
                    type={props.type}
                    id={props.id}
                    className="custom-input__input"
                />
            </div>)
    );
});

export default CustomInput;