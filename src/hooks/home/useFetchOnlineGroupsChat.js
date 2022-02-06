import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//code của mình
import { fetchOnlineGroupsChatSaga ,resetOnlineGroups } from "../../store/modules/OnlineList/slice";

const useFetchOnlineGroupsChat = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOnlineGroupsChatSaga());
    return () => {
      //mỗi lần render lại component thì nên reset và cập nhật lại online groups
      dispatch(resetOnlineGroups())
    };
  }, [dispatch, fetchOnlineGroupsChatSaga]);
};

export default useFetchOnlineGroupsChat;
