import axios from "axios";
import { SERVICE_URL_ADMIN } from "src/constant/config";
import { getToken } from "src/utils/token";

export async function addProductGeneralSV(payload) {
    const response = await axios({
        method: "POST",
        url: `${SERVICE_URL_ADMIN}/products`,
        headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            type: "formData",
            Authorization: getToken(),
        },
        data: payload,
        timeout: 30000,
    });
    return response;
}

export async function addProductDetailSV(payload) {
    const response = await axios({
        method: "POST",
        url: `${SERVICE_URL_ADMIN}/products/details`,
        headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            type: "formData",
            Authorization: getToken(),
        },
        data: payload,
        timeout: 30000,
    });
    return response;
}

export async function editProductSV(payload) {
    const response = await axios({
        method: "POST",
        url: `${SERVICE_URL_ADMIN}/products/details/${payload.get("id")}`,
        headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            type: "formData",
            Authorization: getToken(),
        },
        data: payload,
        timeout: 30000,
    });
    return response;
}

export async function deleteDetailProduct(payload) {
    const response = await axios({
        method: "DELETE",
        url: `${SERVICE_URL_ADMIN}/products/details/${payload}`,
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

export async function deleteGeneralProduct(payload) {
    const response = await axios({
        method: "DELETE",
        url: `${SERVICE_URL_ADMIN}/products/${payload}`,
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

export async function editGeneralProductSV(payload) {
    const response = await axios({
        method: "PUT",
        url: `${SERVICE_URL_ADMIN}/products/${payload.id}`,
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
