import React from "react";
import {isEmpty, reduce} from "lodash";
import connect from "react-redux/es/connect/connect";
import getItems from './data.js';
import { Link } from 'react-router-dom'
import {deleteAllProducts, deleteProduct} from "./actions/CartActions";
import bindActionCreators from "redux/src/bindActionCreators";

class Cart extends React.Component {
    onDeleteBtnClick(e, val) {
        this.props.deleteProduct({delta: val, id: Number(e.target.getAttribute('id'))});
    }
    onDeleteCartBtnClick() {
        this.props.deleteAllProducts();
    }
    renderMainBlock = () => {
        return <div className="mainBlock">
            <table>
                <thead>
                <tr>
                    <td> Название</td>
                    <td> Количество</td>
                    <td> Стоимость</td>
                    <td colSpan='2'></td>
                </tr>
                </thead>
                <tbody>
                {this.props.productsInCart.map((cartItem) => {
                    let item = getItems().find((item) => cartItem.id === item.id);
                    return (
                        <tr key={cartItem.id}>
                            <td>{item.name}</td>
                            <td>{cartItem.number}</td>
                            <td>${cartItem.number * item.price} </td>
                            <td>
                                <button id={cartItem.id} onClick={(e)=>this.onDeleteBtnClick(e, -1)}
                                        className="deleteButton" title="удалить"></button>
                            </td>
                            <td>
                                <button id={cartItem.id} onClick={(e)=>this.onDeleteBtnClick(e, -Infinity)}
                                        className="deleteAllButton" title="удалить все"></button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <p className="infSum"> Всего ${reduce(this.props.productsInCart, function (sum, cartItem) {
                let item = getItems().find((item) => cartItem.id === item.id);
                return sum + cartItem.number * item.price;
            }, 0)}</p>
        </div>;
    };

    render() {
        let isEmptyCart = isEmpty(this.props.productsInCart);
        return (
            <div>
                {isEmptyCart ? <p> Корзина пуста</p> : this.renderMainBlock()}
                <Link className="commonButton" to='/'>Продукты</Link>
                <button className={isEmptyCart ? 'hiddenEl' : 'commonButton rightButton'}
                        onClick={(e)=>this.onDeleteCartBtnClick(e)}> Очистить корзину
                </button>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        productsInCart: state.cart.productsInCart,
        ownProps
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteProduct: bindActionCreators(deleteProduct, dispatch),
        deleteAllProducts:  bindActionCreators(deleteAllProducts, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);