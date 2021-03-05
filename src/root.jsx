import React from "react";
import store from "./store";
import { Provider } from "react-redux";

const Store = (props) => {
    return <Provider store = { store }
    children = { props.children }
    />;
};

export default Store;