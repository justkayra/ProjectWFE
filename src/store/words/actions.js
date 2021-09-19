import axios from 'axios';

export const GET_WORD = "GET_WORD";
export const UPDATE_RATE_RESULT = "UPDATE_RATE_RESULT";

export const fetchWord = (wordValue) => dispatch => {
    const connectSession = axios.create({
        timeout: 10000,
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    });
    let URL = process.env.REACT_APP_REST_HOST + '/service/words/value/' + wordValue;
    connectSession.get(URL)
        .then(response => {
           // console.log('data', response.data.payloads);
            dispatch(fetchWordSuccess(response.data.payloads))
        })
        .catch(error => {
            console.log('error of ' + URL, error);
            if (error.response) {
                console.log('500');
                console.log(error.response);
            } else {
                console.log(error);
            }
        })
}

export const updateRate = (id, associatedWord, rateValue) => dispatch => {
    const connectSession = axios.create({
        timeout: 10000,
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        }
    });
    let URL = process.env.REACT_APP_REST_HOST + '/service/words/' + id + '/emphasis/' + associatedWord + '/' + rateValue;
    connectSession.put(URL)
        .then(response => {
          //  console.log('data', response.data.payloads);
            dispatch(updateSuccess(response.data.payloads))
        })
        .catch(error => {
            console.log('error of ' + URL, error);
            if (error.response) {
                console.log('500');
                console.log(error.response);
            } else {
                console.log(error);
            }
        })
}


export const fetchWordSuccess = serverPage => {
    return {
        type: GET_WORD,
        serverPage: serverPage
    }
}

export const updateSuccess = serverPage => {
    return {
        type: UPDATE_RATE_RESULT,
        serverPage: serverPage
    }
}

