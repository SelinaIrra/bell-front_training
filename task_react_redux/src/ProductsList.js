import React from "react";
import connect from "react-redux/es/connect/connect";
import {addProduct} from "./actions/CartActions";
import {filterProducts} from "./actions/FilterActions";
import { Link } from 'react-router-dom'
import getItems from './data.js'
import bindActionCreators from "redux/src/bindActionCreators";

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {queryStr: ''};
    }

    onAddBtnClick(e) {
        if (e.target.getAttribute('data-action') === 'add')
            this.props.addProduct(Number(e.target.getAttribute('id')))
    }

    onFilterBtnClick() {
        this.props.filterProducts(this.state.queryStr)
    }

    updateFilteredInput(e) {
        this.setState({queryStr: e.target.value});
    }

    renderMainBlock = (productsList) => {
        return <div className="mainBlock">
            <table onClick={(e)=>this.onAddBtnClick(e)}>
                <thead>
                <tr>
                    <td> Название</td>
                    <td> Цена</td>
                    <td> Количество</td>
                    <td></td>
                </tr>
                </thead>
                <tbody>{productsList.map((item) => {
                    let cartItem = this.props.productsInCart.find((cartItem) => cartItem.id === item.id) || 0;
                    return (
                        <tr key={item.id}>
                            <td>{item.name} </td>
                            <td>${item.price} </td>
                            <td>{(cartItem) ? cartItem.number : 0} </td>
                            <td>
                                <button className="addButton" title="Добавить" id={item.id}
                                        data-action="add"></button>
                            </td>
                        </tr>
                    );
                })}</tbody>
            </table>
        </div>;
    };

    render() {
        let productsList;
        if (this.props.filteredId === null)
            productsList = getItems();
        else
            productsList = this.props.filteredId.map((x) => getItems()[x]);
        return (
            <div className="content">
                <div className="search">
                    <button className="searchButton" onClick={(e)=>this.onFilterBtnClick(e)}></button>
                    <input className="searchInput" id="searchInput"
                           defaultValue={this.props.query}
                           onChange={(e)=>this.updateFilteredInput(e)}
                           placeholder="введите часть названия товара"
                           type="search"/>
                </div>
                {productsList.length === 0 ? <p>Товар не найден</p> : this.renderMainBlock(productsList)}
                <Link className="commonButton" to='/cart'>Корзина</Link>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        productsInCart: state.cart.productsInCart,
        filteredId: state.filteredProducts.filteredId,
        query: state.filteredProducts.query,
        ownProps
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addProduct: bindActionCreators(addProduct, dispatch),
        filterProducts: bindActionCreators(filterProducts, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);