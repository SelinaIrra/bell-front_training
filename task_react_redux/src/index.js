import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {combineReducers, createStore} from 'redux';
import { Provider } from "react-redux";
import cartReducer from "./reducers/cart";
import productsReducer from "./reducers/filteredProducts";
import Cart from "./Cart";
import ProductsList from "./ProductsList";
import {Route} from "react-router";
import Switch from "react-router/es/Switch";
import BrowserRouter from "react-router-dom/es/BrowserRouter";
import {routerReducer} from "react-router-redux";

const rootReducer = combineReducers({
    cart: cartReducer,
    filteredProducts: productsReducer,
    routing: routerReducer
});
const store = createStore(rootReducer);


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/cart" component={Cart}/>
                <Route path="/" component={ProductsList}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

