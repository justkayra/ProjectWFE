import axios from 'axios';
import {loading, stopLoading} from "../progress/actions";

export const TRANSFORM = "TRANSFORM";
export const CLEAN = "CLEAN";
let source;

export const transform = (sourceText) => dispatch => {
    const CancelToken = axios.CancelToken;
    source = CancelToken.source();


    const connectSession = axios.create({
        timeout: 10000,
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        },
        cancelToken: source.token
    });
    dispatch(loading());
    const formData = {"sourceText": sourceText, "emphasisType": "RANDOM"};
    let URL = process.env.REACT_APP_REST_HOST + '/service/transform/mood';
    connectSession.post(URL, formData)
        .then(response => {
            console.log('data', response.data.payloads);
            dispatch(stopLoading());
            dispatch(transformSuccess(response.data.payloads))
        })
        .catch(error => {
            console.log('error of ' + URL, error);
            if (error.response) {
                console.log('500');
                console.log(error.response);
            } else {
                console.log(error);
            }
            dispatch(stopLoading());
        })
}


export const cancelRequest = () => dispatch => {
    source.cancel();
    dispatch(stopLoading());
}

export const clean = () => dispatch => {
    dispatch({type: CLEAN})

}

export const transformSuccess = serverPage => {
    return {
        type: TRANSFORM,
        serverPage: serverPage
    }
}


