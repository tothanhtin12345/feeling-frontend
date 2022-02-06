import axios from "axios";
import { REQUEST_HEADER } from "../../contants/axios";
import { getAccessToken } from "../auth/token";

const BASE_URL = process.env.REACT_APP_ENDPOINT;
const httpRequest = axios.create({
  baseURL: BASE_URL,
  headers: REQUEST_HEADER,
});

//thực hiện một số việc trước khi gửi request
httpRequest.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken() || "";
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
      // "Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Il9pZCI6IjYxMDRkYWJiYTA5NTlhM2Q0MDFhN2MyOCJ9LCJpYXQiOjE2Mjk2MzA1MTUsImV4cCI6MTYyOTYzNDExNX0.e0R5zDcw0u9zaKsl0oK2Od_3BrDnjHzoQEwfZncLMKU`,
      ...config.headers,
    };
    return config;
  },
  (error) => Promise.reject(error)
);

//thực hiện một số việc trước khi trả response
httpRequest.interceptors.response.use(
  (response) => {
    //response có nhiều thứ trong đó
    //ta quan tâm đến dữ liệu trực tiếp
    return response.data;
  },
  //nếu có lỗi khi response - thì lấy dữ liệu từ lỗi đó ra
  (error) => {
    console.log(error)
    console.log(error.message);

    const response = error.response || {
      data: {
        message: error.message || "ERROR_UNDEFINED",
        code: error.message || "ERROR_UNDEFINED",
      },
    };
    const data = response.data;
    const myError = { message: data.message, code: data.code };
    return Promise.reject(myError);
  }
);

export default httpRequest;
