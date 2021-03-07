import {
    GET_ALL_STOCKS,
    ADD_STOCK_TO_WATCH_LIST,
    DELETE_STOCK_FROM_WATCH_LIST,
    GET_STOCK_DETAIL,
    GET_STOCK_GRAPH,
} from "./Types.js";
import { startLoading, stopLoading } from "./Loader";
import axios from "axios";
const stock_url = "https://api.coingecko.com/api";

export const getAllStocks = () => (dispatch) => {
    dispatch(startLoading());
    return axios
        .get(`${stock_url}/v3/coins/list?include_platform=false`)
        .then((res) => {
            dispatch(stopLoading());
            dispatch({
                type: GET_ALL_STOCKS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(stopLoading());
            console.log(err);
        });
};
export const getStockDetail = (id) => (dispatch) => {
    dispatch(startLoading());
    return axios
        .get(
            `${stock_url}/v3/coins/${id}?tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=false`
        )
        .then((res) => {
            dispatch(stopLoading());
            dispatch({
                type: GET_STOCK_DETAIL,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(stopLoading());
            console.log(err);
        });
};
export const getStockGraph = (id, days) => (dispatch) => {
    return axios
        .get(
            `${stock_url}/v3/coins/${id}/market_chart?vs_currency=inr&days=${days}`
        )
        .then((res) => {
            dispatch(stopLoading());
            dispatch({
                type: GET_STOCK_GRAPH,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(stopLoading());
            console.log(err);
        });
};

export const addStockToWatchList = (stock) => {
    return {
        type: ADD_STOCK_TO_WATCH_LIST,
        payload: stock,
    };
};
export const deleteStockFromWatchList = (stock) => {
    console.log("stock: ", stock);
    return {
        type: DELETE_STOCK_FROM_WATCH_LIST,
        payload: stock,
    };
};