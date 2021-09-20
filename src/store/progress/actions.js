export const LOADING = "LOADING";
export const STOP_LOADING = "STOP_LOADING";

export const loading = () => dispatch => {
    dispatch({
        type: LOADING
    })
}

export const stopLoading = () => dispatch => {
    dispatch({
        type: STOP_LOADING
    })

}



