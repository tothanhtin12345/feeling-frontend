import { useState, useCallback } from "react";

import httpRequest from "../utils/http/httpRequest";
import { convertCodeToMessage } from "../utils/error/handleError";
import { showError } from "../utils/error/showError";


//sử dụng http request mà không cần debounce
const useHttpRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [percentUpload, setPercentUpload] = useState(0);

  const sendRequest = useCallback(
    async ({ axiosConfig, successCallback, failedCallback, showErrorModal = true }) => {
      setLoading(true);
      
      httpRequest
        .request({
          ...axiosConfig,
          //sự kiện thực hiện trong quá trình upload lên server
          onUploadProgress: (progressEvent) => {
            //tính phần trăm upload
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setPercentUpload(percentCompleted);
          },
          //sự kiện thực hiện quá trình lấy dữ liệu
          onDownloadProgress: (progressEvent) => {
            //tính phần trăm download
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            
          },
        })
        .then((resData) => {
          if (successCallback) {
            successCallback({ resData });
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err)
          const errMessage = convertCodeToMessage(err);
          setError(errMessage);
          setLoading(false);
          if (failedCallback) {
            failedCallback(errMessage);
          }
          if(showErrorModal === false){return;}
          showError({
            title: "Đã xảy ra lỗi",
            content: errMessage,
           
          });
        });
    },
    [httpRequest]
  );

  return {
    loading,
    error,
    percentUpload,
    sendRequest,
  };
};

export default useHttpRequest;
