import getItems from '../data.js'

const initialState = {
    query: '',
    filteredId: null
};

export default function filteredProducts (state = initialState, action) {
    switch (action.type) {
        case 'FILTER_PRODUCTS':
            let reg = new RegExp(action.payload, 'i');
            return { ...state, query: action.payload,
                filteredId: getItems().filter(x => reg.test(x.name)).map(x => x.id - 1)};
        default:
            return state;
    }
}