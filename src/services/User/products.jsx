import axios from "axios";
import { CORE_SERVICE_URL, SERVICE_URL_ADMIN, SERVICE_URL_USER } from "src/constant/config";
import { getToken } from "src/utils/token";

export const getBrands = (products) => {
    var uniqueBrands = [];
    products.forEach((product, index) => {
        if (product.tags) {
            product.tags.forEach((tag) => {
                if (uniqueBrands.indexOf(tag) === -1) {
                    uniqueBrands.push(tag);
                }
            });
        }
    });
    return uniqueBrands;
};
export const getColors = (products) => {
    var uniqueColors = [];
    products.forEach((product, index) => {
        if (product.colors) {
            product.colors.forEach((color) => {
                if (uniqueColors.indexOf(color) === -1) {
                    uniqueColors.push(color);
                }
            });
        }
    });
    return uniqueColors;
};
export const getMinMaxPrice = (products) => {
    let min = 100,
        max = 1000;

    products.forEach((product, index) => {
        let v = product.price;
        min = v < min ? v : min;
        max = v > max ? v : max;
    });

    return { min: min, max: max };
};

export const fetchProductApi = () => {
    return axios.get(`http://localhost:3001/cuba/api/product.json`);
};
export const getVisibleproducts = (data, { brand, color, value, sortBy, searchBy }) => {
    return data
        .filter((product) => {
            let brandMatch;
            if (product.tags) brandMatch = product.tags.some((tag) => brand.includes(tag));
            else brandMatch = true;

            let colorMatch;
            if (color && product.colors) {
                colorMatch = product.colors.includes(color);
            } else {
                colorMatch = true;
            }

            const startPriceMatch = typeof value.min !== "number" || value.min <= product.price;
            const endPriceMatch = typeof value.max !== "number" || product.price <= value.max;

            const searchByName = product.name.toLowerCase().indexOf(searchBy) > -1;

            return brandMatch && colorMatch && startPriceMatch && endPriceMatch && searchByName;
        })
        .sort((product1, product2) => {
            if (sortBy === "HighestPrices") {
                return product2.price < product1.price ? -1 : 1;
            } else if (sortBy === "LowestPrices") {
                return product2.price > product1.price ? -1 : 1;
            } else {
                return product2.price !== product1.price ? 1 : 1;
            }
        });
};

export async function getAllProduct(payload) {
    const response = await axios({
        method: "GET",
        url: `${SERVICE_URL_USER}/products`,
        headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            type: "formData",
            Authorization: getToken(),
        },
        timeout: 30000,
    });
    return response;
}

export async function getCategories() {
    const response = await axios({
        method: "GET",
        url: `${SERVICE_URL_ADMIN}/categories`,
        headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            type: "formData",
            Authorization: getToken(),
        },
        timeout: 30000,
    });
    return response;
}

export async function getListFav() {
    const response = await axios({
        method: "GET",
        url: `${SERVICE_URL_USER}/favorite/list`,
        headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            type: "formData",
            Authorization: getToken(),
        },
        timeout: 30000,
    });
    return response;
}
export async function unFav(payload) {
    const response = await axios({
        method: "POST",
        url: `${SERVICE_URL_USER}/favorite/remove`,
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "multipart/form-data",
            Accept: "application/json",
            type: "formData",
            Authorization: getToken(),
        },
        data: payload,
        timeout: 30000,
    });
    return response;
}

export async function getCart() {
    const response = await axios({
        method: "GET",
        url: `${SERVICE_URL_USER}/carts`,
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "multipart/form-data",
            Accept: "application/json",
            type: "formData",
            Authorization: getToken(),
        },
        timeout: 30000,
    });
    return response;
}

export async function deleteCart(product_id) {
    const response = await axios({
        method: "DELETE",
        url: `${SERVICE_URL_USER}/carts/remove/${product_id}`,
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "multipart/form-data",
            Accept: "application/json",
            type: "formData",
            Authorization: getToken(),
        },
        timeout: 30000,
    });
    return response;
}
