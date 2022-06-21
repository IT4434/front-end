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
