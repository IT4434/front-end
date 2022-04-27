import { ADD_TO_CART, DISPLAY_CART, GET_LIST, GET_SINGLE_ITEM, NUMBER_CART, WATCH_PRODUCT_LIST } from "./actionTypes";

const initial_state = {
    cart: null,
    display_cart: false,
    number: 0,
    productItems: [],
};
// eslint-disable-next-line
export default (state = initial_state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return { ...state, cart: action.payload };
        case DISPLAY_CART:
            return { ...state, display_cart: action.payload };
        case NUMBER_CART:
            return { ...state, number: action.payload };
        case GET_LIST:
            return { ...state, productItems: action.payload };
        case GET_SINGLE_ITEM:
            const selectedItem = state.productItems;
            return { ...state, singleItem: selectedItem[0] };

        default:
            return { ...state };
    }
};

export const productActions = {
    watchfetchProducts: (params) => ({ type: WATCH_PRODUCT_LIST, payload: params }),
};
