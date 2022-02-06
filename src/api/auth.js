import httpRequest from "../utils/http/httpRequest";

//đăng ký
export const registerRequest = (data) => httpRequest.post("/auth/register",data);

//đăng nhập
export const loginRequest = (data) => httpRequest.post("/auth/login",data);

//đăng nhập = google
export const googleLoginRequest = (data) => httpRequest.post("/auth/login-google",data);



//refresh
export const refreshRequest = (data) => httpRequest.post("/auth/refresh",data,);

//verify - bằng access_token trên header
export const verifyRequest = () => httpRequest.get("/auth/verify");

//forgot-password
export const forgotPasswordRequest = (data) => httpRequest.post("/auth/forgot-password",data);

//send-verification-code
export const sendVerificationCodeRequest = (data) => httpRequest.post("/auth/send-verification-code",data);

//new password
export const newPasswordRequest = (data) => httpRequest.post("/auth/new-password",data);

//verify email
export const verifyEmailRequest = (data) => httpRequest.post("/auth/verify-email",data);

