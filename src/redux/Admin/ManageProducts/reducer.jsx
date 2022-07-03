import { ADD_PRODUCT_DETAIL, ADD_PRODUCT_GENERAL, ADD_PRODUCT_GENERAL_SUCCESS, EDIT_PRODUCT, GET_PRODUCT_GENERAL, UPLOAD_IMG } from "./actionTypes";

const initial_state = {
    img_temp: null,
    product_new: null,
    product_general: null,
};
// eslint-disable-next-line
export default (state = initial_state, action) => {
    switch (action.type) {
        case UPLOAD_IMG:
            return { ...state, img_temp: action.payload };
        case ADD_PRODUCT_GENERAL_SUCCESS:
            return { ...state, product_new: action.payload };
        case GET_PRODUCT_GENERAL:
            return { ...state, product_general: action.payload };
        default:
            return { ...state };
    }
};

export const manageProductActions = {
    addProductGeneral: (params) => ({ type: ADD_PRODUCT_GENERAL, payload: params }),
    addProductGeneralSuccess: (params) => ({ type: ADD_PRODUCT_GENERAL_SUCCESS, payload: params }),
    addProductDetail: (params) => ({ type: ADD_PRODUCT_DETAIL, payload: params }),
    editProduct: (params) => ({ type: EDIT_PRODUCT, payload: params }),
};
