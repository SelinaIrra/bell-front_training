import React from "react";
import App from "./App";

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: this.props.cart,
            searchValue: '',
            filteredIndexes: null
        };
    }

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
        for (let i = 0; i < App.items.length; i++)
            if (reg.test(App.items[i].name))
                filteredIndexes.push(i);
        this.setState({filteredIndexes: filteredIndexes});
    }

    renderMainBlock = (filteredItems) => {
        return <div className="mainBlock">
            <table onClick={(e) => this.addItemToCart(e)}>
                <thead>
                <tr>
                    <td> Название</td>
                    <td> Цена</td>
                    <td> Количество</td>
                    <td></td>
                </tr>
                </thead>
                <tbody>{filteredItems.map((item) => {
                    let cartItem = this.state.cart.find((cartItem) => cartItem.id === item.id) || 0;
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
        let filteredItems;
        let showCart = true;
        if (this.state.filteredIndexes === null)
            filteredItems = App.items;
        else
            filteredItems = this.state.filteredIndexes.map((x) => App.items[x]);
        return (
            <div className="content">
                <div className="search">
                    <button className="searchButton" onClick={() => this.search()}></button>
                    <input className="searchInput" id="searchInput"
                           value={this.state.searchValue} onChange={(e) => this.setSearchValue(e)}
                           placeholder="введите часть названия товара" type="search"/>
                </div>
                {filteredItems.length === 0 ? <p>Товар не найден</p> : this.renderMainBlock(filteredItems)}
                <button className="commonButton"
                        onClick={() => {
                            this.props.updateData(this.state.cart, showCart)
                        }}> Корзина
                </button>
            </div>
        );
    }
}

export default ProductsList