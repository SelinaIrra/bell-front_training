import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter} from 'react-router-dom'
import {Switch} from 'react-router-dom'
import {Link} from 'react-router-dom'
import './style.css';

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        let cart = [];
        if (this.props.match.params.cart !== undefined)
            cart = JSON.parse(this.props.match.params.cart);
        this.state = {
            cart: cart,
            searchValue: '',
            filteredIndexes: null
        };
    }

    static items = [
        {id: 1, name: 'item1', price: 890},
        {id: 2, name: 'item2', price: 20},
        {id: 3, name: 'item3', price: 428},
        {id: 4, name: 'item4', price: 45}
    ];

    addItemToCart(event) {
        let target = event.target;
        if (target.getAttribute('data-action') === 'add') {
            let itemId = Number(target.getAttribute('id'));
            let isFind = false;
            let updatedCart = this.state.cart.map((cartItem) => {
                    if (itemId === cartItem.id) {
                        cartItem.number++;
                        isFind = true;
                    }
                    return cartItem;
                }
            );
            if (!isFind)
                updatedCart.push({id: itemId, number: 1});
            this.setState({cart: updatedCart});
        }
    };

    setSearchValue(event) {
        this.setState({searchValue: event.target.value});
    }

    search() {
        let reg = new RegExp(this.state.searchValue, 'i');
        let filteredIndexes = [];
        for (let i = 0; i < ProductsList.items.length; i++)
            if (reg.test(ProductsList.items[i].name))
                filteredIndexes.push(i);
        this.setState({filteredIndexes: filteredIndexes});
    }

    render() {
        let filteredItems;
        if (this.state.filteredIndexes === null)
            filteredItems = ProductsList.items;
        else
            filteredItems = this.state.filteredIndexes.map((x) => ProductsList.items[x]);
        let mainBlock, tbody;
        if (filteredItems.length === 0) {
            mainBlock = <p>Товар не найден</p>
        }
        else {
            tbody = filteredItems.map((item) => {
                let cartItem = this.state.cart.find((cartItem) => cartItem.id === item.id) || 0;
                return (
                    <tr key={item.id}>
                        <td> {item.name} </td>
                        <td> ${item.price} </td>
                        <td> {(cartItem) ? cartItem.number : 0} </td>
                        <td>
                            <button className="addButton" title="Добавить" id={item.id} data-action="add"></button>
                        </td>
                    </tr>
                );
            });
            mainBlock =
                <div className="mainBlock" >
                    <table onClick={(e) => this.addItemToCart(e)}>
                        <thead>
                        <tr>
                            <td> Название</td>
                            <td> Цена</td>
                            <td> Количество</td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>{tbody}</tbody>
                    </table>
                </div>;
        }
        return (
            <div className="content">
                <div className="search">
                    <button className="searchButton" onClick={() => this.search()}></button>
                    <input className="searchInput" id="searchInput"
                           value={this.state.searchValue} onChange={(e) => this.setSearchValue(e)}
                           placeholder="введите часть названия товара" type="search"/>
                </div>
                {mainBlock}
                <Link className="crossingButton" to={'/cart=' + JSON.stringify(this.state.cart)}> Корзина </Link>
            </div>
        );
    }
}

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {cart: JSON.parse(this.props.match.params.cart)};
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

    render() {
        let sum = this.state.cart.reduce(function (sum, cartItem) {
            let item = ProductsList.items.find((item) => cartItem.id === item.id);
            return sum + cartItem.number * item.price;
        }, 0);
        let mainBlock;
        let deleteCartButtonClass;
        if (sum !== 0) {
            deleteCartButtonClass = "deleteCartButton";
            mainBlock =
                <div className="mainBlock">
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
                            let item = ProductsList.items.find((item) => cartItem.id === item.id);
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
                    <p className="infSum"> Всего ${sum}</p>
                </div>;
        }
        else
        {
            deleteCartButtonClass =  "hiddenEl";
            mainBlock =
                <div className="emptyCart">
                    <p>Корзина пуста</p>
                </div>;
        }
        return (
            <div>
                {mainBlock}
                <Link className="crossingButton" to={'/' + JSON.stringify(this.state.cart)}> Продукты </Link>
                <button className={deleteCartButtonClass} onClick={() => this.deleteCart()}> Очистить корзину</button>
            </div>
        )
    }
}


ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route path="/cart=:cart" component={Cart}/>
            <Route path="/:cart" component={ProductsList}/>
            <Route path="/" component={ProductsList}/>
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));