import React from "react";
import Cart from "./Cart";
import ProductsList from "./ProductsList";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCart: false,
            cart: []
        }
    }

    updateData = (value1, value2) => {
        this.setState({cart: value1});
        this.setState({showCart: value2})
    };

    static items = [
        {id: 1, name: 'item1', price: 890},
        {id: 2, name: 'item2', price: 20},
        {id: 3, name: 'item3', price: 428},
        {id: 4, name: 'item4', price: 45}
    ];

    render() {
        if (this.state.showCart)
            return <Cart updateData={this.updateData} cart={this.state.cart}/>;
        else
            return <ProductsList updateData={this.updateData} cart={this.state.cart}/>
    }
}

export default App