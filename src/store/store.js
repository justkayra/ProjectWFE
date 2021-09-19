import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {createBrowserHistory} from "history";
import rootReducer from './reducers.js';

const middleware = [thunk];
export const history = createBrowserHistory()
const initialState = {};


const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
)

export default store





