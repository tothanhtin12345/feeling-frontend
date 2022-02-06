//phần các tin nhắn ở dạng Window (lúc bấm vào một icon message)
import { Spin } from "antd";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";

//code của mình

import NotifyWindowItem from "./NotifyWindowItem";
import { getUserId } from "../../store/modules/User/selectors";
import {
  getNotifications,
  getNotifyWindowListCanLoad,
} from "../../store/modules/NotifyWindowList/selectors";
import { fetchNotificationsSaga } from "../../store/modules/NotifyWindowList/slice";

const commonkey = "notify-window-list";
//danh sách các item của cửa sổ thông báo

//scrollId: giá trị mà infinite scroll sẽ scroll theo - có thể null
const NotifyWindowList = ({ scrollId }) => {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  //sau này giá trị này sẽ được lưu trong store thay vì lưu ở đây
  const [hasMore, setHasMore] = useState(true);

  //dùng cho việc fetch thêm thông báo
  const userId = useSelector(getUserId);

  const notifications = useSelector(getNotifications);

  //có thể tiếp tục load không ?
  const canLoad = useSelector(getNotifyWindowListCanLoad);

  //fetch notifications data
  useEffect(() => {
    //nếu không thể load
    if (!canLoad) return;
    dispatch(fetchNotificationsSaga());
    return () => {};
  }, []);

  //hàm xử lý để lấy thêm dữ liệu
  //sau này giá trị hasMore hay việc fetch thêm dữ liệu sẽ được lưu trong store và thực hiện qua redux-saga
  const handleGetMore = () => {
    dispatch(fetchNotificationsSaga());
  };

  return (
    <div className="notify-window-list">
      {/* Thực hiện fetch dữ liệu tin nhắn ở đây */}

      <InfiniteScroll
        dataLength={notifications.length}
        next={handleGetMore}
        hasMore={canLoad}
        scrollableTarget={scrollId ? scrollId : null}
        loader={
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        }
      >
        {notifications.map((item, index) => (
          <NotifyWindowItem
            key={`${commonkey}-${pathname}-${item._id}-${index}`}
            _id={item._id}
            avatar={item.avatar}
            content={item.content}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
            read={item.read}
            url={item.url}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default NotifyWindowList;
