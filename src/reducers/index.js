import { combineReducers } from "redux";
import stockReducer from "./StockReducer";
import newsReducer from "./NewsReducer";
import loadingReducer from "./LoadingReducer";

export default combineReducers({ stockReducer, loadingReducer, newsReducer });