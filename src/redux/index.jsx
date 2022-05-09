import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import User from "src/redux/Guest/reducer";
import userSagas from "src/saga/userSagas";

import Setting from "src/redux/User/Settings/reducer";
import settingSagas from "src/saga/settingSagas";

import Alert from "src/redux/User/Alerts/reducer";

import Product from "src/redux/User/Products/reducer";
import productSagas from "src/saga/productSaga";

import filters from "src/redux/User/filter/reducer";

import manageProduct from "src/redux/Admin/ManageProducts/reducer";
import manageUser from "src/redux/Admin/ManageUsers/reducer";

export const reducers = combineReducers({
    User,
    Setting,
    Alert,
    Product,
    filters,
    manageProduct,
    manageUser,
});

export function* rootSaga() {
    yield all([userSagas(), settingSagas(), productSagas()]);
}
