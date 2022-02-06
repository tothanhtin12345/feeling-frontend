import { useEffect } from "react";
import { useDispatch } from "react-redux";
//code của mình
import useHttpRequest from "../useHttpRequest";
import { fetchUnread } from "../../store/modules/User/slice";
const useGetUnread = () => {
  const { sendRequest } = useHttpRequest();

  const disaptch = useDispatch();

  const handleGetUnreadSuccess = ({ resData }) => {
    //cập nhật vào trong store
    const { unread } = resData;
    disaptch(fetchUnread(unread));
  };
  const handleGetUnreadFailed = (message) => {};

  const handleGetUnread = () => {
    sendRequest({
      axiosConfig: {
        method: "GET",
        url: "/conversation/unread",
      },
      successCallback: handleGetUnreadSuccess,
      failedCallback: handleGetUnreadFailed,
      showErrorModal: false,
    });
  };

  useEffect(() => {
    handleGetUnread();
  }, []);
};

export default useGetUnread;
