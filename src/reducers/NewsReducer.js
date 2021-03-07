import { GET_STOCK_NEWS } from "../actions/Types";

const initialState = {
    stockNews: [],
};

const NewsReducer = function(state = initialState, action) {
    switch (action.type) {
        case GET_STOCK_NEWS:
            return {...state, stockNews: action.payload.articles };

        default:
            return state;
    }
};
export default NewsReducer;