import { LOADING_START, LOADING_STOP } from "../actions/Types";

const initialState = {
    isLoading: false,
};

const LoadingReducer = function(state = initialState, action) {
    switch (action.type) {
        case LOADING_START:
            return {
                ...state,
                isLoading: true,
            };
        case LOADING_STOP:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default LoadingReducer;