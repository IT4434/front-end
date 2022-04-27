export const FILTER_BRAND = "FILTER_BRAND";
export const FILTER_COLOR = "FILTER_COLOR";
export const FILTER_PRICE = "FILTER_PRICE";
export const SEARCH_BY = "SEARCH_BY";
export const SORT_BY = "SORT_BY";
export const filterBrand = (brand) => ({
    type: FILTER_BRAND,
    brand,
});
export const filterColor = (color) => ({
    type: FILTER_COLOR,
    color,
});
export const filterPrice = (value) => ({
    type: FILTER_PRICE,
    value,
});
