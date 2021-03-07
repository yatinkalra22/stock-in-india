import { GET_STOCK_NEWS } from "./Types.js";
import { startLoading, stopLoading } from "./Loader";
import axios from "axios";
const news_url =
    "http://newsapi.org/v2/everything?q=apple&from=2021-03-06&to=2021-03-06&sortBy=popularity&apiKey=889eca57732e49d784ab1d4cf013c3f5";

export const getStockNews = () => (dispatch) => {
    dispatch(startLoading());
    return axios
        .get(`${news_url}`)
        .then((res) => {
            dispatch(stopLoading());
            dispatch({
                type: GET_STOCK_NEWS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(stopLoading());
            console.log(err);
        });
};