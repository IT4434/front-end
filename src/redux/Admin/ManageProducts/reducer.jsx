import { UPLOAD_IMG } from "./actionTypes";

const initial_state = {
    img_temp: null,
};
// eslint-disable-next-line
export default (state = initial_state, action) => {
    switch (action.type) {
        case UPLOAD_IMG:
            return { ...state, img_temp: action.payload };

        default:
            return { ...state };
    }
};

export const manageProductActions = {};
