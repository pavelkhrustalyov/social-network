import React from 'react';
import './Friends.styles.scss';
import MainBg from '../MainBg/MainBg.component';
import FriendItem from '../Friends/FriendItem/FriendItem.components';
import { getFriends } from '../../redux/users/users.actions';
import { setShowModal } from '../../redux/others/other.actions';
import { connect } from 'react-redux';

const Friends = ({
    data,
    type,
    getFriends,
    setShowModal
}) => {

    const getAllfriends = () => {
        getFriends(data)
        setShowModal('friends');
    };

    return (
        <MainBg>
            <div className="friends">
                <div className="friends__heading">
                    <span>{type}: {data.length}</span>
                    {
                        data.length > 3 ?
                        ( <span className="friends__heading-all"
                            onClick={getAllfriends}>
                            Все
                        </span>) : null
                    }
                </div>
                <div className="friends__wrap">
                        {
                            data.slice(0, 3).map(item => {
                                return (
                                    <FriendItem key={item._id} item={item} />
                                );
                            })
                        }
                </div>
            </div>
        </MainBg>
    );
}

export default connect(null, { getFriends, setShowModal })(Friends);