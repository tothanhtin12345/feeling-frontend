//phần các tin nhắn ở dạng Window (lúc bấm vào một icon message)
import { Menu, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import {  useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { useMediaQuery } from "react-responsive";

//code của mình
import DropdownMenuItem from "../UI/DropdownMenuItem";
import { SmallIconStyled } from "../Styled/Icon";
import { SmallTitleStyled } from "../Styled/Text";
import MessagesWindowItem from "./MessagesWindowItem";
import { DropDownButtonStyled } from "../Styled/Button";
import { toggleHeaderActionButton } from "../../store/modules/Header/slice";
import {
  toggleNewMessageModalVisible,
  toggleNewGroupChatModalVisible,
} from "../../store/modules/Chat/slice";
import {
  getConversations,
  getMessagesWindowCanLoad,
  getMessagesWindowSkip,
  getSingleConversationId
} from "../../store/modules/MessagesWindow/selectors";
import {
  fetchConversationsSaga,
  setSingleConversationId,
} from "../../store/modules/MessagesWindow/slice";
import { getOnlineUsres } from "../../store/modules/OnlineList/selectors";
import { getUserId } from "../../store/modules/User/selectors";
import socket from "../../utils/socket/socket";
import { getPathByIndex } from "../../utils/url";
import {
  addConversationId,
  wrapConversationId,
} from "../../store/modules/ChatTab/slice";

import { convertConversationToInformations } from "../../utils/conversation/conversation";

const addMenu = (
  handleCloseMessagesWindowModal,
  handleOpenNewMessageModal,
  handleOpenNewGroupChatModal
) => {
  return (
    <Menu key="create-new-message-menu" style={{ width: 200 }}>
      <DropdownMenuItem
        key={`windows-list-new-message-1`}
        itemKey={`windows-list-new-message-1`}
        title={<SmallTitleStyled>Tin nhắn mới</SmallTitleStyled>}
        onClick={() => {
          handleCloseMessagesWindowModal();
          handleOpenNewMessageModal();
        }}
      />
      <DropdownMenuItem
        key={`windows-list-new-group-chat-2`}
        itemKey={`windows-list-new-group-chat-2`}
        title={<SmallTitleStyled>Nhóm chat mới</SmallTitleStyled>}
        onClick={() => {
          handleCloseMessagesWindowModal();
          handleOpenNewGroupChatModal();
        }}
      />
    </Menu>
  );
};

//danh sách các item của cửa sổ tin nhắn (room)
//scrollFollowWindow: thực hiện sự kiện scroll theo thanh srcoll của window (true - xảy ra ở cửa sổ bự)
//hoặc thanh scroll của list bên trong (false - xảy ra ở modal header nhỏ)
const MessagesWindowList = ({ scrollId }) => {
  const dispatch = useDispatch();


  const conversations = useSelector(getConversations);
  const canLoad = useSelector(getMessagesWindowCanLoad);
  const skip = useSelector(getMessagesWindowSkip);

  const onlineUsers = useSelector(getOnlineUsres);

  const userId = useSelector(getUserId);

  const currentPath = getPathByIndex(1);

  const isLgScreen = useMediaQuery({ query: "(min-width: 992px)" });

  //lấy ra conversation Id đã chọn để hiển thị thêm background-color lên cho item đã chọn
  const singleConversationId = useSelector(getSingleConversationId);

  //hàm xử lý để lấy thêm dữ liệu
  //sau này giá trị hasMore hay việc fetch thêm dữ liệu sẽ được lưu trong store và thực hiện qua redux-saga
  const handleGetMore = () => {
    dispatch(fetchConversationsSaga({ skip }));
  };

  //fetch dữ liệu conversations lần đầu
  useEffect(() => {
    if (canLoad === true) {
      dispatch(fetchConversationsSaga({ skip }));
    }
    return () => {};
  }, []);

  //lắng nghe socket
  useEffect(() => {
    return () => {};
  }, []);

  //hàm đóng modal khi nhấn vào một item tin nhắn hay nút thêm tin nhắn mới, nhóm chat mới
  const handleCloseMessagesWindowModal = () => {
    dispatch(toggleHeaderActionButton(null));
  };

  //hàm mở modal thêm tin nhắn mới
  const handleOpenNewMessageModal = () => {
    dispatch(toggleNewMessageModalVisible(true));
  };

  //hàm mở modal thêm nhóm chat mới
  const handleOpenNewGroupChatModal = () => {
    dispatch(toggleNewGroupChatModalVisible(true));
  };

  //hàm khi nhấn vào một conversation
  const handleOnClickConversation = (conversationId, isRead) => {
    //nếu vị trí hiện tại là ở trang messages thì ta sẽ push đến trang /messages/:conversationId
    if (currentPath === "messages") {
      //dùng cách push thì khi refresh trang sẽ không hiện lại cái conversation ta đã chọn
      dispatch(setSingleConversationId(conversationId));
      //còn dùng push khi khó xử lý ở vụ tắt cái conversation
      // history.push(`/messages/${conversationId}`)
    }
    //ngược lại thì set vào state của ChatTab
    else {
      //nếu kích thước màn hình là lg thì ta thực hiện cập nhật thông qua hàm add
      if (isLgScreen) {
        dispatch(addConversationId(conversationId));
      }
      //ngược lại là hàm wrap
      else {
        dispatch(wrapConversationId(conversationId));
      }
    }

    handleCloseMessagesWindowModal();
    //tiến hành đọc tin nhắn cuối cùng của conversation nếu chưa đọc
    if (isRead) return;
    socket.emit("read-last-message", { conversationId });
  };

  return (
    <div className="messages-window-list">
      {/* Nút thêm tin nhắn */}
      <div style={{ textAlign: "end" }}>
        <DropDownButtonStyled
          trigger={["click"]}
          overlayStyle={{ zIndex: "10002" }}
          overlay={addMenu(
            handleCloseMessagesWindowModal,
            handleOpenNewMessageModal,
            handleOpenNewGroupChatModal
          )}
          icon={<SmallIconStyled className="fas fa-plus"></SmallIconStyled>}
        />
      </div>
      {/* Thực hiện fetch dữ liệu tin nhắn ở đây */}
      <div className="messages-window-list">
        <InfiniteScroll
          dataLength={conversations.length}
          next={handleGetMore}
          hasMore={canLoad}
          scrollableTarget={scrollId ? scrollId : null}
          loader={
            <div style={{ textAlign: "center" }}>
              <Spin />
            </div>
          }
        >
          {conversations.map((conver, index) => {
            const { avatar, title, subTitle, online } =
              convertConversationToInformations({
                conver,
                onlineUsers,
                userId,
              });

            return (
              <MessagesWindowItem
                isClick={conver._id === singleConversationId}
                key={`message-window-list-item-${index}-${conver._id}-conversations-list`}
                avatar={avatar}
                isRead={conver.isRead}
                title={title}
                subTitle={subTitle + " - "}
                smallSubTitle={<Moment date={conver.lastMessage.createdAt} fromNow ago />}
                online={online}
                onClick={handleOnClickConversation.bind(
                  null,
                  conver._id,
                  conver.isRead
                )}
              />
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default MessagesWindowList;
