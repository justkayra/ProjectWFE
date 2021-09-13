import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from "./reducers";


const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
   /* compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )*/

   applyMiddleware(...middleware)

);

window.store = store;

export default store;