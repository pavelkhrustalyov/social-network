import React, { useState } from 'react';
import './CreateDialog.styles.scss';
import CustomButton from '../CustomButton/CustomButton.component';
import CustomTextArea from '../CustomTextArea/CustomTextArea.component';
import { connect } from 'react-redux'; 
import { createDialog } from '../../redux/dialogs/dialogs.actions';
import { setShowModal } from '../../redux/others/other.actions';
import Modal from '../../components/Modal/Modal.component';

const CreateDialog = ({ userId, createDialog, setShowModal }) => {
    const [ text, setText ] = useState();

    const onTextHandler = (e) => {
        setText(e.target.value);
    };

    const createDialogHandler = (event) => {
        event.preventDefault();
        createDialog({ userId, text });
        setShowModal(null);
        setText('');
    };

    return (
        <>
            <Modal small>
                <div className="create-dialog">
                    <form onSubmit={createDialogHandler}>
                        <CustomTextArea 
                            onChange={onTextHandler}
                            value={text} />
                        <div className="create-dialog_controls">
                            <CustomButton type="submit">
                                Отправить
                            </CustomButton>
                            <i
                                onClick={() => setShowModal(null)}
                                className="fas fa-window-close">
                            </i>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default connect(null, { createDialog, setShowModal })(CreateDialog);