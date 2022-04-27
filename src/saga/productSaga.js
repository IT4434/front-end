import { takeEvery, put, call, takeLatest } from "redux-saga/effects";
import { userActions } from "src/redux/Guest/reducer";
import { GET_SINGLE_ITEM, WATCH_PRODUCT_LIST, WATCH_SINGLE_ITEM } from "src/redux/User/Products/actionTypes";
import { fetchProductApi } from "src/services/User/products";
import { fetchProducts, getSingleItem } from "src/redux/User/Products/actionTypes";
// function* getUserProfile({ payload }) {
//     const { user_id } = payload;
//     try {
//         const response = yield call(getUserInfo, user_id);
//         const body = response.data;
//         if (body.status == "success") {
//             yield put(userActions.getProfileSuccessful(body.data.user));
//         } else {
//             console.error(body);
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }
function* fetchProductsAsyn() {
    const productData = yield call(fetchProductApi);
    yield put(fetchProducts(productData.data));
    yield put(getSingleItem());
}

function* productSagas() {
    yield takeLatest(WATCH_PRODUCT_LIST, fetchProductsAsyn);
    yield takeLatest(WATCH_SINGLE_ITEM, fetchProductsAsyn);
}

export default productSagas;
