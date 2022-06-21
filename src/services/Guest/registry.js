import axios from "axios";
import { SERVICE_URL_USER } from "src/constant/config";

export async function registry(params) {
    const response = await axios({
        method: "post",
        url: `${SERVICE_URL_USER}/auth/register`,
        data: params,
        headers: {
            "Content-Type": "application/json",
        },
        timeout: 30000,
    });
    return response;
}
