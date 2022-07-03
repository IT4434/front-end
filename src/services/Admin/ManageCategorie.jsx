import axios from "axios";
import { SERVICE_URL_ADMIN } from "src/constant/config";
import { getToken } from "src/utils/token";

export async function deleteCategory(payload) {
    const response = await axios({
        method: "DELETE",
        url: `${SERVICE_URL_ADMIN}/categories/${payload}`,
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

export async function addCategory(payload) {
    const response = await axios({
        method: "POST",
        url: `${SERVICE_URL_ADMIN}/categories`,
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

export async function editCategory(payload) {
    const response = await axios({
        method: "PUT",
        url: `${SERVICE_URL_ADMIN}/categories/${payload.id}`,
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
