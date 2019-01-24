export function filterProducts(str) {
    return {
        type: 'FILTER_PRODUCTS',
        payload: str
    }
}