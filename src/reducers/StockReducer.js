import {
    GET_STOCK_DETAIL,
    GET_ALL_STOCKS,
    GET_WATCH_LIST_STOCK,
    ADD_STOCK_TO_WATCH_LIST,
    DELETE_STOCK_FROM_WATCH_LIST,
    GET_STOCK_GRAPH,
} from "../actions/Types";

const initialState = {
    stockList: [],
    watchListStock: [],
    stock: {},
    stockGraph: {},
};

const StockReducer = function(state = initialState, action) {
    console.log("action: ", action);
    switch (action.type) {
        case GET_ALL_STOCKS:
            return {...state, stockList: action.payload };
        case ADD_STOCK_TO_WATCH_LIST:
            return {
                ...state,
                watchListStock: state.watchListStock.findIndex(
                        (stock) => stock.id === action.payload.id
                    ) >= 0 ?
                    state.watchListStock :
                    [...state.watchListStock, action.payload],
            };
        case DELETE_STOCK_FROM_WATCH_LIST:
            return {
                ...state,
                watchListStock: state.watchListStock.filter((stock, index) => {
                    return action.payload.id !== stock.id;
                }),
            };
        case GET_WATCH_LIST_STOCK:
            return {...state, watchListStock: action.payload };
        case GET_STOCK_DETAIL:
            return {...state, stock: action.payload };
        case GET_STOCK_GRAPH:
            return {...state, stockGraph: action.payload };

        default:
            return state;
    }
};
export default StockReducer;