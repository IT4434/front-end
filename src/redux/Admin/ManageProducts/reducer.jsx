import { ADD_PRODUCT, ADD_PRODUCT_GENERAL, UPLOAD_IMG } from "./actionTypes";

const initial_state = {
    img_temp: null,
    product_id: null,
};
// eslint-disable-next-line
export default (state = initial_state, action) => {
    switch (action.type) {
        case UPLOAD_IMG:
            return { ...state, img_temp: action.payload };
        case ADD_PRODUCT_GENERAL:
            return { ...state, product_id: action.payload };
        default:
            return { ...state };
    }
};

export const manageProductActions = { addProductGeneral: (params) => ({ type: ADD_PRODUCT_GENERAL, payload: params }) };
