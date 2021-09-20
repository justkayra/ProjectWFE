import {CLEAN, TRANSFORM} from "./actions";

const placeholderText = 'Type or paste some text ...';
const defaultState = {
    ops: [
        {insert: 'Hi.', attributes: {bold: true}},
        {insert: 'By working with all major service operators and on a global basis, we can offer cost effective end-to-end television solutions and recommendations, or very bespoke services if required. These can be technical service recommendations, distribution or marketing focussed. Our business focus has been to successfully open and develop international marketplaces across many distribution platform for our clients. We recognise that any product is only as good as its distribution, whether it is a free-to-air channel. or pay-service channels and content.'},
    ],
    legend: [],
    placeholder: placeholderText,
    progressShown: false,
    error: ''
}
export const transformReducer = (state = defaultState, action) => {
    switch (action.type) {
        case TRANSFORM: {
            return {
                ops: action.serverPage.ops,
                legend: action.serverPage.legend,
                progressShown: false
            }

        }
        case CLEAN: {
            return {
                ops: [],
                legend: [],
                progressShown: false,
                error: '',
                placeholder: placeholderText
            }

        }
        default:
            return state;
    }
}




