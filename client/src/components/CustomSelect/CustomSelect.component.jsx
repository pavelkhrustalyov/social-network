import React from 'react';

import './CustomSelect.styles.scss';

const CustomSelect = ({ label, data, ...otherProps}) => {
    return (
        <div className="custom-select_field">
            <label className="custom-select_label">{label}</label>
            <select {...otherProps}  className="custom-select_select">
                {
                    data.map(({ value, name }) => <option key={value} value={value}>{name}</option>)
                }
            </select>
        </div>
    );
};

export default CustomSelect;