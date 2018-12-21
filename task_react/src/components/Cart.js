import React from "react";
import App from "./App";
import {isEmpty} from "lodash";

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {cart: this.props.cart};
    }

    deleteItemFromCart(event) {
        let target = event.target;
        let delta;
        if (target.getAttribute('data-action') === 'delete')
            delta = -1;
        else if (target.getAttribute('data-action') === 'deleteAll')
            delta = -Infinity;
        else
            return;
        let itemId = Number(target.getAttribute('id'));
        let updatedCart = this.state.cart;
        for (let i = 0; i < updatedCart.length; i++) {
            if (updatedCart[i].id === itemId) {
                updatedCart[i].number += delta;
                if (updatedCart[i].number <= 0)
                    updatedCart.splice(i, 1);
            }
        }
        this.setState({cart: updatedCart});
    }

    deleteCart() {
        this.setState({cart: []});
    };

    renderMainBlock = () => {
        return <div className="mainBlock">
            <table onClick={(e) => this.deleteItemFromCart(e)}>
                <thead>
                <tr>
                    <td> Название</td>
                    <td> Количество</td>
                    <td> Стоимость</td>
                    <td colSpan='2'></td>
                </tr>
                </thead>
                <tbody>
                {this.state.cart.map((cartItem) => {
                    let item = App.items.find((item) => cartItem.id === item.id);
                    return (
                        <tr key={cartItem.id}>
                            <td>{item.name}</td>
                            <td>{cartItem.number}</td>
                            <td>${cartItem.number * item.price} </td>
                            <td>
                                <button id={cartItem.id} data-action="delete"
                                        className="deleteButton" title="удалить"></button>
                            </td>
                            <td>
                                <button id={cartItem.id} data-action="deleteAll"
                                        className="deleteAllButton" title="удалить все"></button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <p className="infSum"> Всего ${this.state.cart.reduce(function (sum, cartItem) {
                let item = App.items.find((item) => cartItem.id === item.id);
                return sum + cartItem.number * item.price;
            }, 0)}</p>
        </div>;
    };

    render() {
        let isEmptyCart = isEmpty(this.state.cart);
        let showCart = false;
        return (
            <div>
                {isEmptyCart ? <p> Корзина пуста</p> : this.renderMainBlock()}
                <button className="commonButton"
                        onClick={() => {
                            this.props.updateData(this.state.cart, showCart)
                        }}> Продукты
                </button>
                <button className={isEmptyCart ? 'hiddenEl' : 'commonButton rightButton'}
                        onClick={() => this.deleteCart()}> Очистить корзину
                </button>
            </div>
        )
    }
}

export default Cart