import React from 'react';

import './Modal.styles.scss';
import { connect } from 'react-redux';
import { setShowModal } from '../../redux/others/other.actions';

import classNames from 'classnames';

const Modal = ({ children, small, big, middle, setShowModal }) => {
    return (
        <>
            <div className={classNames("modal", {
                'small': small,
                'big': big,
                'middle': middle
            })}>
                { children }
            </div>
            <div 
                onClick={() => setShowModal(null)} 
                className="modal_overlay">
            </div>
        </>
    );
}

export default connect(null, { setShowModal })(Modal);