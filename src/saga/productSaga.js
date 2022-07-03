import { takeEvery, put, call, takeLatest } from "redux-saga/effects";
import { userActions } from "src/redux/Guest/reducer";
import { GET_SINGLE_ITEM, WATCH_PRODUCT_LIST, WATCH_SINGLE_ITEM } from "src/redux/User/Products/actionTypes";
import { fetchProductApi } from "src/services/User/products";
import { fetchProducts, getSingleItem } from "src/redux/User/Products/actionTypes";
import { addProductDetailSV, addProductGeneralSV, editProductSV } from "src/services/Admin/ManageProduct";
import { ADD_PRODUCT_DETAIL, ADD_PRODUCT_GENERAL, EDIT_PRODUCT } from "src/redux/Admin/ManageProducts/actionTypes";
import { manageProductActions } from "src/redux/Admin/ManageProducts/reducer";
function* addProductGeneral({ payload }) {
    try {
        const response = yield call(addProductGeneralSV, payload);
        const body = response.data;
        console.log(response);
        if (response.status === 201) {
            yield put(manageProductActions.addProductGeneralSuccess(body));
        } else {
            console.error(body);
        }
    } catch (error) {
        console.error(error);
    }
}
function* addProductDetail({ payload }) {
    try {
        const response = yield call(addProductDetailSV, payload);
        const body = response.data;
        if (response.status === 201) {
            // yield put(manageProductActions.addProductGeneralSuccess(body));
        } else {
            console.error(body);
        }
    } catch (error) {
        console.error(error);
    }
}
function* editProduct({ payload }) {
    try {
        const response = yield call(editProductSV, payload);
        const body = response.data;
        if (response.status === 201) {
            // yield put(manageProductActions.addProductGeneralSuccess(body));
        } else {
            console.error(body);
        }
    } catch (error) {
        console.error(error);
    }
}

function* fetchProductsAsyn() {
    const productData = yield call(fetchProductApi);
    yield put(fetchProducts(productData.data));
    yield put(getSingleItem());
}

function* productSagas() {
    yield takeLatest(WATCH_PRODUCT_LIST, fetchProductsAsyn);
    yield takeLatest(WATCH_SINGLE_ITEM, fetchProductsAsyn);
    yield takeEvery(ADD_PRODUCT_GENERAL, addProductGeneral);
    yield takeEvery(ADD_PRODUCT_DETAIL, addProductDetail);
    yield takeEvery(EDIT_PRODUCT, editProduct);
}

export default productSagas;
