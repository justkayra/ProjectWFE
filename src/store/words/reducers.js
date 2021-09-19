import {GET_WORD, UPDATE_RATE_RESULT} from "./actions";

const defaultState = {
    wordId: null,
    wordType: null,
    associations: [],
    error: ''
}
export const wordReducer  = (state = defaultState, action) => {
    switch (action.type) {
        case GET_WORD: {
            return {
                wordId: action.serverPage.worddto.id,
                wordType: action.serverPage.worddto.type,
                associations: action.serverPage.worddto.associations
            }

        }
        case UPDATE_RATE_RESULT: {
            return {
                ...state,
                associations: action.serverPage.worddto.associations
            }

        }
        default:
            return state;
    }
}




