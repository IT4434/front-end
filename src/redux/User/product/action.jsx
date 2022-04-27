export const ADD_TO_CART = "ADD TO CART";
export const DISPLAY_CART = "DISPLAY_CART";
export const NUMBER_CART = "NUMBER_CART";
export const WATCH_PRODUCT_LIST = "WATCH_PRODUCT_LIST";
export const WATCH_SINGLE_ITEM = "WATCH_SINGLE_ITEM";
export const SEARCH_BY = "SEARCH_BY";
export const SORT_BY = "SORT_BY";
export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
// export const SEARCH_BY = "SEARCH_BY";
// export const SEARCH_BY = "SEARCH_BY";
export const GET_SINGLE_ITEM = "GET_SINGLE_ITEM";

export const GET_LIST = "GET_LIST";

export const watchfetchProducts = () => ({
    type: WATCH_PRODUCT_LIST,
});

export const watchfetchSingleProducts = () => ({
    type: WATCH_SINGLE_ITEM,
});

export const fetchProducts = (product) => ({
    type: GET_LIST,
    payload: product,
});

export const getSingleItem = () => ({
    type: GET_SINGLE_ITEM,
});

export const addToCart = (product, qty) => ({
    type: ADD_TO_CART,
    payload: { product, qty },
});

// export const decrementQty = (productId) => ({
//     type: DECREMENT_QTY,
//     productId,
// });
