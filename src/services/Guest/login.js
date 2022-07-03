import axios from "axios";
import { SERVICE_URL_USER } from "src/constant/config";
import { getToken } from "src/utils/token";

export async function loginUser(params) {
    const response = await axios({
        method: "post",
        url: `${SERVICE_URL_USER}/auth/login`,
        data: params,
        headers: {
            "Content-Type": "application/json",
        },
        timeout: 30000,
    });
    console.log(response.data);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response;
}
export async function loginAdmin(params) {
    const response = await axios({
        method: "post",
        url: `${SERVICE_URL_USER}/admin/auth/login`,
        data: params,
        headers: {
            "Content-Type": "application/json",
        },
        timeout: 30000,
    });
    // localStorage.setItem("user", JSON.stringify(response.data.data.user));
    return response;
}

export async function getUserInfo(user_id) {
    const response = await axios({
        method: "GET",
        url: `${SERVICE_URL_USER}/users/info`,
        headers: {
            "Content-Type": "application/json",
            Authorization: getToken(),
        },
        timeout: 30000,
    });
    return response;
}
