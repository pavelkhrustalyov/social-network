import React from 'react';

import './DialogSearch.styles.scss';
import CustomInput from '../../CustomInput/CustomInput.component';
import MainBg from '../../MainBg/MainBg.component';
import { connect } from 'react-redux';
import { setFilter } from '../../../redux/dialogs/dialogs.actions';

const DialogSearch = ({ setFilter }) => {
    const filteredDialogs = (e) => {
        e.preventDefault();
        setFilter(e.target.value);
    };

    return (
        <MainBg>
            <form className="dialog_search">
                    <CustomInput
                        placeholder="Поиск пользователя"
                        onChange={filteredDialogs}
                        type="search"
                    />
            </form>
        </MainBg>
    );
}


export default connect(null, { setFilter })(DialogSearch);