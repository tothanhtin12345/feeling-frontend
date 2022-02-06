import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import { showError } from "../utils/error/showError";
import { convertCodeToMessage } from "../utils/error/handleError";
import httpRequest from "../utils/http/httpRequest";
const useHttpRequestWithDebounce = (debounceTimeOut = 0) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [percentUpload, setPercentUpload] = useState(0);

  const sendRequest = useCallback(
    debounce(async ({ axiosConfig, successCallback, failedCallback }) => {
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
          const errMessage = convertCodeToMessage(err);
          setError(errMessage);
          setLoading(false);
          if (failedCallback) {
            failedCallback(errMessage);
          }
          showError({
            title: "Đã xảy ra lỗi",
            content: errMessage,
          });
        });
    }, debounceTimeOut),

    [debounceTimeOut]
  );

  return {
    loading,
    error,
    percentUpload,
    sendRequest,
  };
};

export default useHttpRequestWithDebounce;
