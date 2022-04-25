import axios from "axios";
import { CORE_SERVICE_URL } from "src/constant/config";
import { getToken } from "src/utils/token";

// export async function getDApps(params) {
//     const response = await axios({
//         method: "GET",
//         url: `${CORE_SERVICE_URL}/dapps`,
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: getToken(),
//         },
//         timeout: 30000,
//     });
//     return response;
// }
