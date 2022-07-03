import { BRAND, CATEGORY, FILTER_BRAND, FILTER_CATEGORY, FILTER_COLOR, FILTER_PRICE, SEARCH_BY, SORT_BY } from "./action";
const filtersReducerDefaultState = {
    brand: [],
    category: [],
    filter_brand: [],
    filter_category: [],
    value: { min: 0, max: 10000 },
    sortBy: "",
    searchBy: "",
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case FILTER_BRAND:
            return {
                ...state,
                filter_brand: action.filter_brand,
            };
        case BRAND:
            return {
                ...state,
                brand: action.brand,
            };
        case CATEGORY:
            return {
                ...state,
                category: action.category,
            };
        case FILTER_CATEGORY:
            return {
                ...state,
                filter_category: action.filter_category,
            };
        case FILTER_COLOR:
            return {
                ...state,
                color: action.color,
            };
        case FILTER_PRICE:
            return {
                ...state,
                value: action.payload,
            };
        case SORT_BY:
            return {
                ...state,
                sortBy: action.sort_by,
            };
        case SEARCH_BY:
            return {
                ...state,
                searchBy: action.search,
            };
        default:
            return state;
    }
};

export default filtersReducer;
