

import axios from 'axios';
import {getCsrfTokenFromCookie} from "../../../utils/csrf.mjs";

export async function refreshAccessToken() {
    const csrfToken = getCsrfTokenFromCookie();
    const response = await axios.post(
        'http://localhost:8080/api/auth/refreshToken',
        {},
        {
            withCredentials: true,
            headers: { 'X-CSRF-Token': csrfToken }
        }
    );

    return response.data.accessToken;
}
