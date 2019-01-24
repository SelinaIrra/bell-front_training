const initialState = {
    productsInCart: []
};

export default function cart (state = initialState, action) {
    switch (action.type) {
        case 'ADD_PRODUCT': {
            let itemId = action.payload;
            let isFind = false;
            let updatedCart = state.productsInCart.map((cartItem) => {
                    if (itemId === cartItem.id) {
                        cartItem.number++;
                        isFind = true;
                    }
                    return cartItem;
                }
            );
            if (!isFind)
                updatedCart.push({id: itemId, number: 1});
            return {...state, productsInCart: updatedCart} }
        case 'DELETE_PRODUCT': {
            let itemId = action.payload.id;
            let updatedCart = state.productsInCart.map((x)=>{return x;});
            for (let i = 0; i < updatedCart.length; i++) {
                if (updatedCart[i].id === itemId) {
                    updatedCart[i].number +=  action.payload.delta;
                    if (updatedCart[i].number <= 0)
                        updatedCart.splice(i, 1);
                }
            }
            return {...state, productsInCart: updatedCart} }
        case 'DELETE_ALL_PRODUCTS':
            return {...state, productsInCart: []};
        default:
            return state;
    }
}