import {LOADING, STOP_LOADING} from "./actions";

const defaultState = {
    progressShown: false
}
export const loadingReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOADING: {
            return {
                progressShown: true
            }
        }
        case STOP_LOADING: {
            return {
                progressShown: false
            }

        }
        default:
            return state;
    }
}




