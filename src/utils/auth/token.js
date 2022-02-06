export const setAuthToken = (authToken) => localStorage.setItem("authToken",JSON.stringify(authToken));
export const getAuthToken = () => localStorage.getItem("authToken") || null;
export const clearAuthToken = () => localStorage.removeItem("authToken");

export const getAccessToken = () => {
    const authToken = getAuthToken() || null;
    const accessToken = authToken ? JSON.parse(authToken).access_token : null;
    return accessToken;
}

export const getRefreshToken = () => {
    const authToken = getAuthToken() || null;
    const refreshToken = authToken ? JSON.parse(authToken).refresh_token : null;
    return refreshToken;
}

export const getExpirationTime = () => {
    const authToken = getAuthToken() || null;
    const expirationTime = authToken ? JSON.parse(authToken).expirationTime : null;
    return expirationTime;
}