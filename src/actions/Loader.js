import { LOADING_START, LOADING_STOP } from "./Types";

export const startLoading = () => {
    return {
        type: LOADING_START,
    };
};

export const stopLoading = () => {
    return {
        type: LOADING_STOP,
    };
};