import React from 'react';

import './Dialog.styles.scss';
import DialogItem from '../DialogItem/DialogItem.component';
import DialogSearch from './DialogSearch/DialogSearch.component';
import MainBg from '../MainBg/MainBg.component';

const Dialog = ({ dialogs }) => {

    return (
        <div className="dialogs_wrap">
            <DialogSearch />
            <MainBg noIndentation>
                <div className="dialogs">
                    {
                        dialogs.length === 0 ? <p className="empty_dialogs">
                            <i className="fas fa-inbox"></i>
                        Диалогов нет</p>
                        : dialogs.map(dialog => (
                            <DialogItem 
                                key={dialog._id}
                                dialog={dialog}
                            />
                        ))
                    }
                </div>
            </MainBg>
        </div>
    );
}



export default Dialog;