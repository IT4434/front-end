import { takeEvery, put, call } from "redux-saga/effects";
import { userActions } from "src/redux/Guest/reducer";

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

function* productSagas() {
    // yield takeEvery(GET_PROFILE, getUserProfile);
}

export default productSagas;
