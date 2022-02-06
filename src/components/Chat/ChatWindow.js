import { useState, useRef, useEffect, useReducer } from "react";
import styled from "styled-components";
import { Avatar, Tooltip, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

//code của mình
import socket from "../../utils/socket/socket";
import OnlineAvatar from "../UI/OnlineAvatar";
import { SmallTitleStyled, SmallContentStyled } from "../Styled/Text";
import { MediumIconStyled } from "../Styled/Icon";
import { ChatWindowButtonStyled } from "../Styled/Button";
import Messages from "./Messages";
import ChatInput from "./ChatInput";

import { getAddMembersModalVisible } from "../../store/modules/Chat/selectors";
import { toggleAddMembersModalVisible } from "../../store/modules/Chat/slice";
import useHttpRequest from "../../hooks/useHttpRequest";
import { convertConversationToInformations } from "../../utils/conversation/conversation";
import { getUserId } from "../../store/modules/User/selectors";
import { getOnlineUsres } from "../../store/modules/OnlineList/selectors";
import InsideCenterSpin from "../UI/InsideCenterSpin";
import { getPathByIndex } from "../../utils/url";
import { setSingleConversationId } from "../../store/modules/MessagesWindow/slice";
import { deleteConversationId } from "../../store/modules/ChatTab/slice";
import { DropDownButtonStyled } from "../Styled/Button";
import DropdownMenuItem from "../UI/DropdownMenuItem";
import NewGroupModal from "./NewGroupModal/NewGroupModal";

import ConfirmModal from "../UI/ConfirmModal";

const ChatWindowStyled = styled.div`
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  & > * {
    padding: 10px 5px;
  }

  & {
    //định dạng cho phần header
    .chat-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 0;

      padding-top: 10px;
      padding-bottom: 10px;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

      .info {
        display: flex;
        column-gap: 10px;
        min-width: 0;
        .title {
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
        }
      }
      .action {
        display: flex;
        column-gap: 5px;
        align-items: center;
      }
    }
    .chat-body {
      //flex:1 giúp chiếm toàn bộ không gian  còn lại khi dùng flex
      flex: 1;

      max-height: 100%;

      overflow: scroll;
      overflow-y: scroll;
      overflow-x: unset;

      min-width: 0;
      //thêm dòng này để sử dụng được scroll top của InfiniteScroll
      display: flex;
      flex-direction: column-reverse;
    }
    .chat-bottom {
    }

    .seen-list {
      margin-top: 10px;
      padding: 0px 20px;
      text-align: end;
      .ant-avatar {
        vertical-align: initial;
      }
    }
  }
`;

const initialState = {
  conversation: null,
  messages: [],
  canLoad: true,
  skip: 0,
  limit: 15,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CONVERSATION":
      const conversation = action.payload;
      return {
        ...state,
        conversation,
      };
    case "FETCH_MESSAGES":
      const messagesData = action.payload;
      messagesData.reverse(); //đảo các tin nhắn lại để tin nhắn mới nằm ở cuối
      const messages = [...messagesData, ...state.messages];
      if (messagesData.length >= state.limit) {
        state.skip += state.limit;
      } else {
        state.canLoad = false;
      }
      //cập nhật state
      return {
        ...state,
        messages,
      };
    case "ADD_MESSAGE":
      const newMessage = action.payload;
      // console.log(newMessage);
      //nếu message có một giá trị id giả => tin nhắn này người dùng mới gửi
      //giờ ta phải tìm nó trong mảng messages để thay thế nó
      //vì ban đầu khi người dùng gửi tin nhắn - ta có tạo mọt message tạm thời có loading
      // h ta phải thay thế để tắt nó
      if (newMessage.fakeId) {
        const fakeMessageIndex = state.messages.findIndex(
          (item) => item.fakeId === newMessage.fakeId
        );
        if (fakeMessageIndex >= 0) {
          state.messages[fakeMessageIndex] = newMessage;
        } else {
          state.messages.push(newMessage);
        }
      }
      //ngược lại thì ta chỉ cần thêm trực tiếp vào mảng
      else {
        state.messages.push(newMessage);
      }

      //vì có tin nhắn mới nên ta sẽ reset lại mảng đã xem
      state.conversation.read = [];
      //tăng số lượng skip
      state.skip += 1;
      return {
        ...state,
      };

    case "DELETE_MESSAGE":
      const messageId = action.payload;
      state.messages = state.messages.filter((item) => item._id !== messageId);
      return {
        ...state,
      };

    //tạo một tin nhắn giả tạm thời khi đang chờ xử lý tin nhắn trên backend
    case "ADD_FAKE_MESSAGE":
      const fakeMessage = action.payload;
      state.messages.push(fakeMessage);
      return {
        ...state,
      };
    case "UPDATE_FAKE_MESSAGE":
      const editFakeMessage = action.payload;
      const fakeMessageIndex = state.messages.findIndex(
        (item) => item.fakeId === editFakeMessage.fakeId
      );

      if (fakeMessageIndex >= 0) {
        state.messages[fakeMessageIndex] = {
          ...state.messages[fakeMessageIndex],
          ...editFakeMessage,
        };
        return {
          ...state,
        };
      }

    //thêm người đã xem tin nhắn
    case "ADD_SEEN_USER":
      state.conversation.read.push(action.payload);
      return {
        ...state,
      };
    //thêm thành viên mới vào trong phòng
    case "ADD_USER":
      //giá trị action.payload là một mảng các user nên ta dùng dấu ... để phân tách thành phần tử riêng lẻ và thêm vào mảng hiện tại
      state.conversation.users.push(...action.payload);
      return {
        ...state,
      };
    //xóa 1 thành viên ra khỏi phòng (xảy ra khi một thành viên tự ý rời khỏi phòng)
    case "DELETE_USER":
      const userId = action.payload;
      state.conversation.users = state.conversation.users.filter(
        (item) => item._id !== userId
      );
      return {
        ...state,
      };

    case "SET_CAN_LOAD":
      const canLoad = action.payload;
      state.canLoad = canLoad;
      return {
        ...state,
      };
    case "CHANGE_SKIP":
      const skip = action.payload;
      state.skip += skip;
      return {
        ...state,
      };
    case "RESET":
      return { ...initialState };
    default:
      return { ...initialState };
  }
};

//cửa sổ chat
//dùng cho cả chế độ tab và chế độ mở rộng

//closeable: có hiển thị nút tắt không ? - nút tắt sẽ xóa room được chọn trong store
const ChatWindow = ({
  closeable,
  className,
  scrollId,
  conversationId,
  ...props
}) => {
  const dispatch = useDispatch();

  const [state, localDispatch] = useReducer(reducer, initialState);

  const { canLoad, skip, limit, messages, conversation } = state;

  const [outConversationConfirm, setOutConversationConfirm] = useState(false);

  const chatBodyRef = useRef(null);

  const { loading, sendRequest, error } = useHttpRequest();
  const { loading: messagesLoading, sendRequest: fetchMessagesRequest } =
    useHttpRequest();

  //trạng thái loading khi xử lý rời khỏi phòng
  const [outLoading, setOutLoading] = useState(false);

  const userId = useSelector(getUserId);
  const onlineUsers = useSelector(getOnlineUsres);

  const addMembersModalVisible = useSelector(getAddMembersModalVisible);

  const currentPath = getPathByIndex(1);

  const getConversationDetailsSuccess = ({ resData }) => {
    //lấy ra conversation
    const { conversation } = resData;

    //cập nhật conversation
    localDispatch({ type: "SET_CONVERSATION", payload: conversation });

    //xóa  conversation ra khỏi resData
    delete resData["conversation"];
    // và gọi hàm fetchMessagesSuccess
    fetchMessagesSuccess({ resData });

    //dùng socket để join vào conversation trên backend - phải join mới nhận được thông tin
    socket.emit("join-conversation", { conversationId: conversation._id });
  };
  const getConversationDetailsFailed = (message) => {
    console.log(message);
  };

  const fetchMessagesSuccess = ({ resData }) => {
    const { messages: messagesData } = resData;
    // console.log(messagesData)
    // if (messagesData.length >= limit) {
    //   localDispatch({ type: "CHANGE_SKIP", payload: limit });
    // } else {
    //   localDispatch({ type: "SET_CAN_LOAD", payload: false });
    // }
    localDispatch({ type: "FETCH_MESSAGES", payload: messagesData });
  };
  const fetchMessagesFailed = (message) => {
    console.log(message);
  };

  //hàm xử lý để lấy thêm dữ liệu tin nhắn
  //sau này giá trị hasMore hay việc fetch thêm dữ liệu sẽ được lưu trong store và thực hiện qua redux-saga
  const handleGetMore = () => {
    fetchMessagesRequest({
      axiosConfig: {
        url: "/message",
        method: "GET",
        params: {
          skip: skip,
          limit: limit,
          conversationId,
        },
      },
      successCallback: fetchMessagesSuccess,
      failedCallback: fetchMessagesFailed,
    });
  };

  //tiến hành fetch dữ liệu của conversation này
  //ta sẽ fetch kèm theo 10 tin nhắn của conversation này
  useEffect(() => {
    if (conversationId) {
      sendRequest({
        axiosConfig: {
          url: "/conversation/details",
          method: "GET",
          params: {
            skip: 0,
            limit: limit,
            conversationId,
          },
        },
        successCallback: getConversationDetailsSuccess,
        failedCallback: getConversationDetailsFailed,
      });
    }
    //clear state
    return () => {
      localDispatch({ type: "RESET" });
    };
  }, [conversationId]);

  //xử lý socket
  useEffect(() => {
    if (!conversationId) return;
    socket.on(`${conversationId}-new-message`, (message) => {
      localDispatch({ type: "ADD_MESSAGE", payload: message });
      //nếu nhận được tin nhắn thì chứng tỏ là người dùng đang ở trong conversation => đọc tin nhắn
      socket.emit("read-last-message", { conversationId });
    });

    //nhận thông tin về người dùng đã xem tin nhắn - đây là kết quả của sự kiện read-last-message
    //đến từ việc người dùng đọc tin nhắn trong phòng
    socket.on(`${conversationId}-seen-message`, (user) => {
      localDispatch({ type: "ADD_SEEN_USER", payload: user });
    });

    //khi trong phòng có thêm thành viên mới - sẽ xảy ra khi ở trong conversation dạng group
    socket.on(`${conversationId}-new-members`, ({ users, lastMessage }) => {
      localDispatch({ type: "ADD_MESSAGE", payload: lastMessage });
      //cập nhật người dùng vào store
      localDispatch({ type: "ADD_USER", payload: users });
      //nếu nhận được tin nhắn thì chứng tỏ là người dùng đang ở trong conversation => đọc tin nhắn
      socket.emit("read-last-message", { conversationId });
    });

    //khi trong phòng có một thành viên out ra - sẽ xảy ra khi ở trong conversation dạng group
    socket.on(`${conversationId}-out-member`, ({ userId, lastMessage }) => {
      localDispatch({ type: "ADD_MESSAGE", payload: lastMessage });
      //cập nhật người dùng vào store
      localDispatch({ type: "DELETE_USER", payload: userId });
      //nếu nhận được tin nhắn thì chứng tỏ là người dùng đang ở trong conversation => đọc tin nhắn
      socket.emit("read-last-message", { conversationId });
    });

    return () => {
      //leave khỏi room conversationId mà ta đã dùng
      socket.emit("leave-conversation", { conversationId });
      socket.off(`${conversationId}-new-message`);
      socket.off(`${conversationId}-seen-message`);
      socket.off(`${conversationId}-new-members`);
      socket.off(`${conversationId}-out-member`);
    };
  }, [conversationId]);

  //khi nhấn tắt cái window chat
  const handleClickCancelChat = () => {
    if (currentPath === "messages") {
      dispatch(setSingleConversationId(null));
    } else {
      dispatch(deleteConversationId(conversationId));
    }
  };

  if (loading) {
    return <InsideCenterSpin />;
  }

  if (!conversation) {
    return <div></div>;
  }

  const { title, avatar, subTitle, online } = convertConversationToInformations(
    { conver: conversation, onlineUsers, getSubTitle: false, userId }
  );

  //hàm xử lý lỗi trong quá trình thực hiện gửi tin nhắn, gửi file, upload file,...
  //chung quy là upload fake image thành dạng lỗi để hiển thị
  const handleErrorWhenSendMessage = (editFakeMessage) => {
    localDispatch({ type: "UPDATE_FAKE_MESSAGE", payload: editFakeMessage });
  };

  //khi thực hiện nhắn tin
  const handleEnterChat = (text) => {
    if (text.trim().length <= 0) return;

    //tạo một fakeMessage để hiển thị tạm thời loading
    const fakeId = new Date() + `${Math.random().toString(36).substr(1, 5)}`;
    const fakeMessage = {
      text,
      loading: true,
      createdAt: new Date().toISOString(),
      fakeId: fakeId,
      _id: fakeId,
      type: "text",
      owner: { _id: userId },
    };

    //lưu vào local store để hiển thị trước cái tin nhắn giả
    localDispatch({ type: "ADD_FAKE_MESSAGE", payload: fakeMessage });

    //gắn tin nhắn lên server
    socket.emit(
      "send-message",
      {
        conversationId: conversation._id,
        text,

        type: "text",
        fakeId,
      },
      handleErrorWhenSendMessage
    );
  };

  const handleMemberOutSuccess = () => {
    //tắt group chat - vì mình đã rời khỏi phòng
    handleClickCancelChat();
  };

  const handleMemberOutFailed = (message) => {
    console.log(message);
  };

  //hàm nhận phản hồi từ socket - có thể là có lỗi hoặc không - do ta không thể truyền hai hàm lên socket
  // mà ta lại muốn nhận biết có lỗi hay không lỗi - nên ta tạo một hàm trung gian - nếu nhận được biến lỗi (errorMessage)
  //thì gọi hàm xử lý lỗi - còn không thì gọi hàm xử lý thành công
  const handleMemberOutCallback = ({ errorMessage }) => {
    setOutLoading(false);
    if (errorMessage) {
      handleMemberOutFailed(errorMessage);
      return;
    }
    handleMemberOutSuccess();
  };

  const handleMemberOut = () => {
    socket.emit("out-conversation", conversationId, handleMemberOutCallback);
  };

  //hàm xử lý khi mới bắt đầu upload một hình ảnh lên phần tin nhắn
  //uid: là một id của file khi mới được upload lên client (do antd tạo)
  const handleStartUploadFile = (fileUrl, uid) => {
    //tiến hành tạo một fake message và hiển thị lên view người dùng
    const fakeId = uid;
    const fakeMessage = {
      text: fileUrl,
      loading: true,
      createdAt: new Date().toISOString(),
      fakeId: fakeId,
      _id: fakeId,
      type: "url",
      owner: { _id: userId },
    };
    localDispatch({ type: "ADD_FAKE_MESSAGE", payload: fakeMessage });
  };

  //khi upload hoàn toàn thành công lên server - thì tiến hành gửi tin nhắn với
  //text là một url hình ảnh
  const handleFinishUploadFile = (fileUrl, uid) => {
    //gắn tin nhắn lên server
    socket.emit("send-message", {
      conversationId: conversation._id,
      text: fileUrl,
      type: "url",
      fakeId: uid,
    });
  };

  //hàm xử lý sau khi xóa (set unDisplay cho người dùng xóa) thành công trên server
  //hàm này sẽ được gọi từ file MessageText - sau khi nó thực hiện thành công việc xóa message từ backend
  const handleAfterDeleteMessage = (messageId) => {
    localDispatch({type:"DELETE_MESSAGE", payload: messageId});
  }

  //tạo ra một menu cho phần setting
  const SettingMenu = (
    <Menu
      key={`setting-chat-window-menu-${conversationId}`}
      style={{ width: 200 }}
    >
      <DropdownMenuItem
        key={`invite-members-${conversationId}`}
        itemKey={`invite-members-${conversationId}`}
        title={<SmallTitleStyled>Mời thêm thành viên</SmallTitleStyled>}
        onClick={() => {
          dispatch(toggleAddMembersModalVisible(true));
        }}
      />
      <DropdownMenuItem
        key={`out-group-chat-${conversationId}`}
        itemKey={`out-group-chat-${conversationId}`}
        title={
          <SmallTitleStyled>
             Rời khỏi cuộc trò chuyện
          </SmallTitleStyled>
        }
        onClick={()=>{setOutConversationConfirm(true)}}
      />
    </Menu>
  );

  return (
    <ChatWindowStyled className={`${className}`}>
      <div className="chat-header">
        <div className="info">
          <OnlineAvatar avatar={avatar} size={40} online={online} />

          <div className="title" style={{ justifyContent: "center" }}>
            <SmallTitleStyled className="text-responsive">
              {title}
            </SmallTitleStyled>

            <SmallContentStyled>
              {online ? "Đang hoạt động" : ""}
            </SmallContentStyled>
          </div>
        </div>
        <div className="action">
          {/* Một số chức năng liên quan đến thành viên */}
          {conversation.type === "group" && (
            <DropDownButtonStyled
              trigger={["click"]}
              overlayStyle={{ zIndex: "10002" }}
              overlay={SettingMenu}
              icon={
                <MediumIconStyled className="fas fa-cog"></MediumIconStyled>
              }
            />
          )}

          {/* Nút tắt */}
          <ChatWindowButtonStyled onClick={handleClickCancelChat}>
            <MediumIconStyled className="fas fa-times"></MediumIconStyled>
          </ChatWindowButtonStyled>
        </div>
      </div>
      <div ref={chatBodyRef} id={scrollId} className="chat-body">
        <div className="seen-list">
          <Avatar.Group
            maxCount={10}
            size={18}
            maxPopoverPlacement="top"
            style={{ verticalAlign: "initial" }}
          >
            {conversation.read.map((item) => {
              if (item._id === userId) return;
              return (
                <Tooltip
                  key={`${conversation._id}-${item._id}-seen`}
                  title={item.informations.displayName}
                  zIndex={100010}
                >
                  <div>
                    <OnlineAvatar
                      online={false}
                      size={18}
                      avatar={item.avatar ? item.avatar.files[0].fileUrl : null}
                    />
                  </div>
                </Tooltip>
              );
            })}
          </Avatar.Group>
        </div>
        <InfiniteScroll
          dataLength={messages.length}
          next={handleGetMore}
          hasMore={canLoad}
          scrollableTarget={scrollId}
          inverse={true}
          style={{ display: "flex", flexDirection: "column-reverse" }}
          
        >
          <Messages messages={messages} onAfterDeleteMessage={handleAfterDeleteMessage}/>
        </InfiniteScroll>
        <div className="bottom-position"></div>
      </div>
      <div className="chat-bottom">
        <ChatInput
          onStartUploadFile={handleStartUploadFile}
          onFinishUploadFile={handleFinishUploadFile}
          onFailedUploadFile={handleErrorWhenSendMessage}
          onEnterInput={handleEnterChat}
        />
      </div>

      {/* Modal để thêm thành viên mới - sẽ có nếu chat window thuộc nhóm chat */}
      {addMembersModalVisible && (
        <NewGroupModal
          conversationId={conversationId}
          onClose={() => dispatch(toggleAddMembersModalVisible(false))}
          type="invite"
          currentUsers={conversation.users}
          visible={addMembersModalVisible}
        />
      )}

      {/* Modal xác nhận rời khỏi phòng */}
      {outConversationConfirm && (
        <ConfirmModal
          title="Xác nhận rời khỏi cuộc trò chuyện"
          content="Bạn chắc muốn rời khỏi cuộc trò chuyện này chứ ?"
          loading={outLoading}
          onCancel={()=>setOutConversationConfirm(false)}
          onConfirm={handleMemberOut}
        />
      )}
    </ChatWindowStyled>
  );
};

export default ChatWindow;
