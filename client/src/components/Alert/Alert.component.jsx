import React from 'react';

import './Alert.styles.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

const Alert = ({ messages }) => {
    return (
        <>
            {
                messages && messages.length
                ?
                    messages.map((msg) => {
                        return ( <div key={msg.id} className={classNames("alert", {
                                'many': messages.length > 1,
                                'success': msg.type === 'success',
                                'error': msg.type === 'error'
                            })}>{msg.message}</div>)
                    })
                : null
            } 
        </>
    )
};

Alert.propTypes = {
    messages: PropTypes.array,
};

const mapStateToProps = (state) => ({
    messages: state.alert
})

export default connect(mapStateToProps)(Alert);