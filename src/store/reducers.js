import {combineReducers} from "redux";
import {wordReducer} from "./words/reducers";
import {transformReducer} from "./transformation/reducers";
import {loadingReducer} from "./progress/reducers";


export default combineReducers({
       loadingReducer,
       wordReducer,
       transformReducer
})

