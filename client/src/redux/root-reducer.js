import { combineReducers } from 'redux';

import alertReducer from './alert/alert.reducer';
import dialogsReducer from './dialogs/dialogs.reducer';
import messagesReducer from './messages/messages.reducer';
import authReducer from './auth/auth.reducer';
import usersReducer from './users/users.reducer';
import themeReducer from './theme/theme.reducer';
import othersReducer from './others/others.reducer';
import feedReducer from './feed/feed.reducer';

export default combineReducers({
    alert: alertReducer,
    dialogs: dialogsReducer,
    messages: messagesReducer,
    auth: authReducer,
    users: usersReducer,
    theme: themeReducer,
    others: othersReducer,
    feed: feedReducer,
});