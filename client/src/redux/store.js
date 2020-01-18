import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

const middlewares = [thunk];
const initialState = {};

export default createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(...middlewares)
));