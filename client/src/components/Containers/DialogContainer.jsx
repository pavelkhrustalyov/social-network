import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '../Dialog/Dialog.component';
import { getDialogs } from '../../redux/dialogs/dialogs.actions';
import Preloader from '../Preloader/Preloader.component';
import socket from '../../socket/socket.io';

const DialogContainer = ({ getDialogs, dialogs, loading, user }) => {
    useEffect(() => {

        getDialogs();
        socket.on('DIALOG_CREATED', getDialogs);
        socket.on('CREATE_MESSAGE', getDialogs);
        
        return () => {
            socket.removeListener('DIALOG_CREATED', getDialogs);
            socket.removeListener('CREATE_MESSAGE', getDialogs);
        };

    }, [getDialogs]);
    return (
        <>
            {
                user && dialogs
                ? <Dialog
                    dialogs={dialogs}
                    loading={loading}
                />
                : <Preloader />
            }
        </>
        
    );
}

const filteredDialogs = (arr, filteredName, user) => {
    if (filteredName === '') {
        return [...arr];
    }
    return arr.filter(item => {
        if (item.partner._id === user._id) {
            return item.author.fullName.toLowerCase().indexOf(filteredName.toLowerCase()) !== -1
        } else {
            return item.partner.fullName.toLowerCase().indexOf(filteredName.toLowerCase()) !== -1
        }
    });
};

const mapStateToProps = ({ dialogs: { dialogs, filter, loading }, auth: { user } }) => ({
    dialogs: user && dialogs ? filteredDialogs(dialogs, filter, user) : [],
    loading,
    filter,
    user
});

DialogContainer.propTypes = {
    dialogs: PropTypes.array,
}

export default connect(mapStateToProps, { getDialogs })(DialogContainer);