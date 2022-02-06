import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//code của mình
import socket from "../../utils/socket/socket";
import { getUserId, getToken } from "../../store/modules/User/selectors";
import {
  readANotificationSaga,
  changeUnReadNotificationCount,
} from "../../store/modules/User/slice";
import showNotification from "../../utils/notification/showNotification";
import {
  addNotification,
  replaceAndMoveAnotificationToTop,
} from "../../store/modules/NotifyWindowList/slice";
import { readNotificationSaga } from "../../store/modules/NotifyWindowList/slice";
import { updateWallUser } from "../../store/modules/Wall/slice";

import { updateFriendsUser } from "../../store/modules/User/slice";
import { showError } from "../../utils/error/showError";
import {
  addOnlineUserSaga,
  fetchOnlineUsersSaga,
  offlineUser,
} from "../../store/modules/OnlineList/slice";

import {
  addConversation,
  updateConversation,
  deleteConversation,
  readConversation,
} from "../../store/modules/MessagesWindow/slice";

import { addUnread, deleteUnread } from "../../store/modules/User/slice";

import { addFriendRequest } from "../../store/modules/FriendRequestedList/slice";
import { deleteFriendSent } from "../../store/modules/FriendSentList/slice";
import { deleteFriendRequest } from "../../store/modules/FriendRequestedList/slice";
import { deleteFriend } from "../../store/modules/FriendList/slice";

//một socket hook dùng cho người dùng sau khi đăng nhập

const useCommonSocket = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const userId = useSelector(getUserId);

  const handleNewNotification = (notification) => {
    //thêm vào store chứa notifications (trong hàm này đã tăng skip lên 1 để tránh sai xót dữ liệu)
    dispatch(addNotification(notification));
    //tăng số lượng thông báo chưa đọc của người dùng
    dispatch(changeUnReadNotificationCount(1));
    //show thông báo
    showNotification({
      onClick: () => {
        //Khi nhấn vào thông báo thì tiến hành giảm số lượng thông báo đã đọc ở user
        dispatch(readANotificationSaga()); //dành cho giá trị unReadNotificationCount của user
        //và đánh dấu là thông báo đã đọc
        //trên server
        dispatch(readNotificationSaga(notification._id)); //dành cho 1 notification cụ thể
      },
      notificationValue: notification,
    });
  };

  //hàm xử lý khi nhận được một thông báo có liên quan đến post
  const handleNewPostNotification = (notification) => {
    //đây là một dạng thông báo liên quan đến post nên ta sẽ có cách xử lý riêng biệt
    dispatch(replaceAndMoveAnotificationToTop(notification));
    //tăng số lượng thông báo chưa đọc của người dùng
    dispatch(changeUnReadNotificationCount(1));
    //show thông báo
    showNotification({
      onClick: () => {
        //Khi nhấn vào thông báo thì tiến hành giảm số lượng thông báo đã đọc ở user
        dispatch(readANotificationSaga()); //dành cho giá trị unReadNotificationCount của user
        //và đánh dấu là thông báo đã đọc
        //trên server
        dispatch(readNotificationSaga(notification._id)); //dành cho 1 notification cụ thể
      },
      notificationValue: notification,
    });
  };

  useEffect(() => {
    if (!userId) return;

    const access_token = token.access_token;
    if (!access_token) return;
    //gắn access_token vào
    socket.auth = { access_token };
    //kết nối socket
    socket.connect();

    //sự kiện connect
    socket.on("connect", () => {
      // console.log("connect to socket server");
    });

    //sự kiện nhận danh sách người dùng đang online khi mới vừa mở app
    socket.on("online-users", (users) => {
      //thông qua saga để lấy thêm conversationId cho mỗi user
      dispatch(fetchOnlineUsersSaga(users));
    });

    //sự kiện nhận một user mới vừa online
    socket.on("new-online-user", (user) => {
      dispatch(addOnlineUserSaga(user));
    });

    //sự kiện khi một user offline (ra khỏi các tab luôn)
    socket.on("offline-user", (userId) => {
      dispatch(offlineUser({ userId, timeOff: new Date().toISOString() }));
    });

    //sự kiện nhận được lời mời kết bạn
    //fromid: id của người gửi - notification: một thông báo dùng để hiển thị và lưu vào store
    socket.on(
      `${userId}-friend-request`,
      ({ fromId, notification, requestedUser }) => {
        //cập nhật wallUser - phòng trường người dùng đăng xem cá nhân của chính người gửi
        //thì cập nhật để hiển thị cho đúng
        //có kiểm tra sự giống nhau giữa wallUserId
        const wallUserId = fromId;
        dispatch(updateWallUser({ wallUserId, isRequested: true }));
        //cập nhật User
        dispatch(updateFriendsUser({ wallUserId, isRequested: true }));
        //thêm vào danh sách yêu cầu
        dispatch(addFriendRequest({ requestedUser }));
        //xử lý thông báo
        handleNewNotification(notification);
      }
    );

    //khi mà một người hủy lời mời kết bạn của người ta đến mình
    socket.on(`${userId}-cancel-friend-sent`, ({ fromId, userRequestId }) => {
      //cập nhật wallUser - phòng trường người dùng đăng xem cá nhân của chính người gửi
      //thì cập nhật để hiển thị cho đúng
      //có kiểm tra sự giống nhau giữa wallUserId
      const wallUserId = fromId;
      dispatch(updateWallUser({ wallUserId, isRequested: false }));
      //cập nhật User
      dispatch(updateFriendsUser({ wallUserId, isRequested: false }));
      //xóa trong danh sách
      dispatch(deleteFriendRequest({ userRequestId }));
    });

    //khi mà một người hủy lời mời kết bạn của mình
    socket.on(`${userId}-cancel-friend-request`, ({ fromId, userSentId }) => {
      //cập nhật wallUser - phòng trường người dùng đăng xem cá nhân của chính người gửi
      //thì cập nhật để hiển thị cho đúng
      //có kiểm tra sự giống nhau giữa wallUserId
      const wallUserId = fromId;
      dispatch(updateWallUser({ wallUserId, isSent: false }));
      //cập nhật User
      dispatch(updateFriendsUser({ wallUserId, isSent: false }));
      //xóa trong danh sách đã gửi của mình
      dispatch(deleteFriendSent({ userSentId }));
    });

    //khi yêu cầu kết bạn được chấp nhận
    socket.on(`${userId}-friend-accept`, ({ fromId, notification }) => {
      //cập nhật wallUser - phòng trường hợp người dùng đang xem cá nhân của chính người gửi
      //thì cập nhật để hiển thị cho đúng
      //có kiểm tra sự giống nhau giữa wallUserId
      const wallUserId = fromId;
      dispatch(
        updateWallUser({
          wallUserId,
          isFriend: true,
          isRequested: false,
          isSent: false,
          isFollow: true,
        })
      );
      //cập nhật User
      dispatch(
        updateFriendsUser({
          wallUserId,
          isFriend: true,
          isRequested: false,
          isSent: false,
          isFollow: true,
        })
      );
      //xử lý thông báo
      handleNewNotification(notification);
    });

    //khi mà một người hủy kết bạn
    socket.on(`${userId}-cancel-friend`, ({ fromId, cancelUserId }) => {
      //cập nhật wallUser - phòng trường hợp người dùng đang xem cá nhân của chính người gửi
      //thì cập nhật để hiển thị cho đúng
      //có kiểm tra sự giống nhau giữa wallUserId
      const wallUserId = fromId;
      dispatch(
        updateWallUser({ wallUserId, isFriend: false, isFollow: false })
      );
      //cập nhật User
      dispatch(
        updateFriendsUser({ wallUserId, isFriend: false, isFollow: false })
      );
      //xóa trong danh sách
      dispatch(deleteFriend({ cancelUserId }));
    });

    //khi mà một quan hệ bạn bè mới giữa 2 người được thiết lập (do chức năng chấp nhận bạn bè trên socket emit tới)
    //khi sự kiện này xảy ra thì ta sẽ bắn lại trên server để thêm vào list bạn bè và online trên socket
    socket.on(`${userId}-new-friend-online`, (friendId) => {
      socket.emit("new-friend", friendId);
    });

    //khi có một cuộc hội thoại mới - có thể thông qua chức năng kết bạn (trường hợp chưa có cuộc hội thoại trước đó)
    //hay tạo nhóm mà có
    // socket.on(`${userId}-new-conversation`, (newConversation) => {
    //   dispatch(addConversation(newConversation));
    // });
    //nếu ta đã join socket là id của ta trên server nên ta không cần chỉ định id trong tên sự kiện
    socket.on(`new-conversation`, (newConversation) => {
      dispatch(addConversation(newConversation));
      //đánh dấu dữ liệu tin nhắn chưa đọc
      dispatch(addUnread(newConversation._id));
    });

    //update một conversation - nếu không có sẽ thực hiện thêm mới conversation
    //nếu socket có join vào room là _id người dùng thì sẽ nhận được
    socket.on(`update-conversation`, (editConversation) => {
      dispatch(updateConversation(editConversation));

      if (editConversation.isRead === false) {
        //thêm dữ liệu tin nhắn chưa đọc
        dispatch(addUnread(editConversation._id));
      }
    });

    //xóa một conversation - thường là khi người dùng out khỏi một conversation dạng group
    socket.on("delete-conversation", (conversationId) => {
      dispatch(deleteConversation(conversationId));
    });

    //khi mà một người gắn thẻ mình trong một bài viết
    socket.on(`${userId}-post-tag`, ({ fromId, notification }) => {
      //xử lý thông báo
      handleNewNotification(notification);
    });

    //xử lý nhận thông báo từ việc like bài viết
    socket.on(`${userId}-like-post-notification`, ({ notification }) => {
      handleNewPostNotification(notification);
    });

    //xử lý nhận thông báo từ việc bình luận bài viết
    socket.on(`${userId}-comment-post-notification`, ({ notification }) => {
      handleNewPostNotification(notification);
    });

    //xử lý nhận thông báo khi có một thông báo về báo cáo bài viết
    socket.on(`${userId}-new-post-report`, ({ notification }) => {
      handleNewPostNotification(notification);
    });

    //nhận lại phản hồi khi đọc tin nhắn cuối cùng của 1 hộp thoại
    socket.on("read-last-message", (editConversation) => {
      // console.log("read-last");
      // console.log(editConversation._id);
      dispatch(readConversation(editConversation));
      //xóa cái conversationId ra khỏi mảng unread nếu đã đọc tin nhắn của hộp thoại này rồi
      dispatch(deleteUnread(editConversation._id));
    });

    //thông báo từ group
    socket.on(`${userId}-group-notification`, ({ notification }) => {
      handleNewNotification(notification);
      
    });

    //xử lý khi có lỗi
    socket.on("error-chanel", ({ message, title }) => {
      showError({ title, content: message });
    });

    //sự kiện lỗi - thường xảy ra khi middlware thực hiện next(new Error())
    socket.on("connect_error", (err) => {
      console.log(err);
    });
    //clear socket
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [token, userId, dispatch]);
};

export default useCommonSocket;
