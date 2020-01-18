import React from 'react';
import './SearchPeople.styles.scss';
import CustomInput from '../CustomInput/CustomInput.component';
import { DebounceInput } from 'react-debounce-input';
import { getAllUsers } from '../../redux/users/users.actions';
import { connect } from 'react-redux';
import { setSearchVisible } from '../../redux/others/other.actions';

const SearchPeople = ({ getAllUsers, setSearchVisible }) => {

    return (
        <div className="search-users">
            <DebounceInput
                element={CustomInput}
                minLength={1}
                debounceTimeout={1200}
                onChange={(e) => getAllUsers(e.target.value.trim())}
                onFocus={() => setSearchVisible(true)}
                placeholder="Поиск пользователя..."
                type="search"
            >
            </DebounceInput>
        </div>
    );
}

export default connect(null, { getAllUsers, setSearchVisible })
(SearchPeople);