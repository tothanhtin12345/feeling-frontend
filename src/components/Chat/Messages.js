import styled from "styled-components";
import { useSelector } from "react-redux";
//code của mình
import Message from "./Message";
import { getUserId } from "../../store/modules/User/selectors";

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const commonkey = "messages-list";

//danh sách tin nhắn
const Messages = ({ messages,onAfterDeleteMessage }) => {
  const userId = useSelector(getUserId);
  let prevMessage;
  let messageListTmp = [];
  let messagesListMain = [];

  //gom nhóm tin nhắn
  messages.forEach((message, index) => {

    //nếu message đang xét là của hệ thống
    if (message.type === "system") {
      
      //nếu có tin nhắn trước đang xét
      //thì thêm tất cả tin nhắn trong mảng tạm vào
      if (prevMessage) {
        messagesListMain.push({
          owner: prevMessage.owner,
          messageList: messageListTmp,
        });
      }
      // thiết lập lại tin nhắn trước và mảng tạm = []
      prevMessage = null;
      messageListTmp = [];
      //thêm tin nhắn hệ thống vào mảng chính
      messagesListMain.push(message);
      return;
    }

    //nếu chưa có dữ liệu về tin nhắn trước thì nhét vào mảng tạm
    if (!prevMessage) {
      messageListTmp.push({
        _id: message._id,
        text: message.text,
        createdAt: message.createdAt,
        type: message.type,
        loading: message.loading,
        error: message.error,
      });
    } else {
      //nếu đã có preveMessage thì xét về chủ tin nhắn và thời gian cách 10 phút
      //nếu cùng chủ và < 30 phút thì tiếp tục đẩy vào mảng tạm
      if (
        message.owner._id === prevMessage.owner._id &&
        new Date(message.createdAt) - new Date(prevMessage.createdAt) <= 1800000
      ) {
        messageListTmp.push({
          _id: message._id,
          text: message.text,
          createdAt: message.createdAt,
          type: message.type,
          loading: message.loading,
          error: message.error,
        });
        //ngược lại nếu tin nhắn đang xét không trùng thông tin với tin nhắn trước thì
        // thêm tất cả tin nhắn ở mảng tạm vào mảng chính
        // reset mảng tạm và thêm tin nhắn đang xét vào mảng tạm
      } else {
        messagesListMain.push({
          owner: prevMessage.owner,
          messageList: messageListTmp,
        });
        messageListTmp = [];
        messageListTmp.push(message);
      }

      //nếu thời gian tin nhắn trước và sau chênh lệnh nhau 30 phút thì push vào mảng chính tin nhắn
      //dạng time - để đánh dấu cột mốc thời gian
      if (
        new Date(message.createdAt) - new Date(prevMessage.createdAt) >
        1800000
      ) {
        messagesListMain.push({
          _id: "",
          timeText: message.createdAt,
          type: "time",
        });
      }
    }

    prevMessage = message;
    //đến phần tử cuối cùng thì thêm những gì còn lại trong mảng tạm vào trong mảng chính
    if (index === messages.length - 1) {
      messagesListMain.push({
        owner: prevMessage.owner,
        messageList: messageListTmp,
      });
    }
    // console.log(messageListTmp)
  });

  // console.log(messagesListMain);

  const messagesContent = messagesListMain.map((item, index) => (
    <Message
      onAfterDeleteMessage={onAfterDeleteMessage}
      key={`${commonkey}-${index}`}
      {...item}
      ofMe={item.owner && item.owner._id === userId}
    />
  ));

  return <MessagesWrapper>{messagesContent}</MessagesWrapper>;
};

export default Messages;
