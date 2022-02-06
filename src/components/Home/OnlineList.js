import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
//code của mình
import ContactsList from "./ContactsList";
import GroupsChatList from "./GroupsChatList";
import { MediumTitleStyled } from "../Styled/Text";

import { DividerStyled } from "../Styled/Divider";
import { OnlineListStyled } from "../Styled/Home";
import socket from "../../utils/socket/socket";
import {
  addConversationId,
  wrapConversationId,
} from "../../store/modules/ChatTab/slice";

//chứa danh sách những users đang online - và những group chat mà người dùng đang tham gia
const OnlineList = () => {
  const dispatch = useDispatch();
  const isLgScreen = useMediaQuery({ query: "(min-width: 992px)" });


  //hàm xử lý khi click vào một thành phần trong danh sách bạn online hoặc group chat online
  //cụ thể là ta mở tab chat đó lên và bắn socket để thông báo rằng ta đã đọc tin nhắn của tab chat này
  const handleOnlineOnClick = (conversationId) => {
    //nếu kích thước màn hình là lg thì ta thực hiện cập nhật thông qua hàm add
    if (isLgScreen) {
      dispatch(addConversationId(conversationId));
    }
    //ngược lại là hàm wrap
    else {
      dispatch(wrapConversationId(conversationId));
    }
    socket.emit("read-last-message", { conversationId });
  };

  return (
    <OnlineListStyled>
      <div className="online-prefix">
        <div className="online-title">
          <MediumTitleStyled>Bạn</MediumTitleStyled>
        </div>
        {/* <div className="online-button">
          <IconButtonStyled
            icon={<SmallIconStyled className="fas fa-search"></SmallIconStyled>}
          />
        </div> */}
      </div>
      <ContactsList onClick={handleOnlineOnClick}/>
      <DividerStyled />
      <div className="online-prefix">
        <div className="online-title">
          <MediumTitleStyled>Nhóm</MediumTitleStyled>
        </div>
      </div>
      <GroupsChatList onClick={handleOnlineOnClick}/>
    </OnlineListStyled>
  );
};
export default OnlineList;
