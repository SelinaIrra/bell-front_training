export function addProduct(id) {
    return {
        type: 'ADD_PRODUCT',
        payload: id
    }
}

export function deleteProduct(item) {
    return {
        type: 'DELETE_PRODUCT',
        payload: item
    }
}

export function deleteAllProducts() {
    return {
        type: 'DELETE_ALL_PRODUCTS'
    }
}
