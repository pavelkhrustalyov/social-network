import React from 'react';

import './DialogItem.styles.scss';
import Avatar from '../Avatar/Avatar.component';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { setDialogId } from '../../redux/dialogs/dialogs.actions';
import { connect } from 'react-redux';
import classNames from 'classnames';
import sliceStr from '../../utils/sliceStr';

const DialogItem = ({
    dialog,
    setDialogId,
    user,
    dialogId }) => {
    const partner = user._id === dialog.partner._id ? 
    dialog.author : dialog.partner;
    
    return (
        <Link className={classNames("dialog-item", {
            "selected": dialog._id === dialogId
        })}
            to={`/dialogs/${dialog._id}`}
            onClick={() => setDialogId(dialog._id)}>
            <div className="dialog-item_avatar">
                <Avatar small img={partner.avatar} />
            </div>
            <div className="dialog-item_userdata">
                <div className="dialog-item_userdata-name">
                    { sliceStr(partner.fullName) }
                <span>
                    <Moment format="DD/MM HH:mm">
                        { dialog.createdAt }
                    </Moment>
                </span>
                </div>
                <div className="dialog-item_userdata-text">
                {
                    user._id === dialog.lastMessage.user._id ?
                    "Вы: " + sliceStr(dialog.lastMessage.text)
                    : sliceStr(dialog.lastMessage.text)
                }
                </div>
            </div>
        </Link>
    );
}

const mapStateToProps = ({ auth, dialogs }) => ({
    user: auth.user,
    dialogId: dialogs.currentDialogId,
});
 
export default connect(mapStateToProps, { setDialogId })(DialogItem);