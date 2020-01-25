import React from 'react';

import './CarpetList.styles.scss';
import Modal from '../../Modal/Modal.component';
import { connect } from 'react-redux';
import CarpetItem from '../CarpetItem/CarpetItem.component';
import { setCarpet } from '../../../redux/users/users.actions';

const CarpetList = ({ carpets, setCarpet, userCarpet }) => {
    return (
        <Modal big>
            <div className="carpet-list">
                <h2 className="all_carpets">Все коврики</h2>
                {
                    carpets.length > 0 &&
                    carpets.map(carpet => {
                        return (
                            <CarpetItem
                                setCarpet={setCarpet}
                                key={carpet}
                                carpet={carpet}
                                userCarpet={userCarpet}
                            />
                        )
                    })
                }
            </div>
        </Modal>
    );
}

const mapStateToProps = ({ users }) => ({
    carpets: users.carpets
});

export default connect(mapStateToProps, { setCarpet })(CarpetList);