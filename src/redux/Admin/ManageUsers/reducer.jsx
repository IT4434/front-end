import { OPEN_MODAL_EDIT } from "./actionTypes";

const initial_state = {
    open_modal: false,
};
// eslint-disable-next-line
export default (state = initial_state, action) => {
    switch (action.type) {
        case OPEN_MODAL_EDIT:
            return { ...state, open_modal: action.payload };

        default:
            return { ...state };
    }
};

export const manageUserActions = {};
