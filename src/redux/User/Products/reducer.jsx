import { ADD_TO_CART, DISPLAY_CART, NUMBER_CART } from "./actionTypes";

const initial_state = {
    cart: null,
    display_cart: false,
    number: 0,
};

export default (state = initial_state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return { ...state, cart: action.payload };
        case DISPLAY_CART:
            return { ...state, display_cart: action.payload };
        case NUMBER_CART:
            return { ...state, number: action.payload };
        default:
            return { ...state };
    }
};

export const productActions = {};
