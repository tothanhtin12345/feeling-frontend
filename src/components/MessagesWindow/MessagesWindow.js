import { useState, Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
//code của mình
import Window from "../UI/Window";
import { MediumSearchInputStyled } from "../Styled/Input";
import { SmallIconStyled } from "../Styled/Icon";
import MessagesWindowList from "./MessagesWindowList";
import MessagesWindowSearch from "./MessagesWindowSearch";
import socket from "../../utils/socket/socket";
import { setSingleConversationId } from "../../store/modules/MessagesWindow/slice";
import {
  addConversationId,
  wrapConversationId,
} from "../../store/modules/ChatTab/slice";
import { getPathByIndex } from "../../utils/url";

//cửa sổ các tin nhắn (room)
//expand nghĩa là có hiển thị chữ "Xem tất cả hay không"
const MessagesWindow = ({
  expand,
  id,
  className,
  scrollFollowWindow,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const currentPath = getPathByIndex(1);

  const isLgScreen = useMediaQuery({ query: "(min-width: 992px)" });

  //khi mà người dùng nhấn chọn một conversation từ kết quả search
  const handleSearchClick = ( conversationId ) => {
    setSearchValue("");

    if (currentPath === "messages") {
      dispatch(setSingleConversationId(conversationId));
    } else {
      if (isLgScreen) {
        dispatch(addConversationId(conversationId));
      } else {
        dispatch(wrapConversationId(conversationId));
      }
    }

    

    socket.emit("read-last-message", { conversationId });
  };

  //hiển thị dữ liệu messages hay dữ liệu tìm kiếm ?
  //nếu không có dữ liệu tìm kiếm thì hiện dữ messages
  //nếu có dữ liệu tìm kiếm thì hiện dữ liệu tìm kiếm bạn bè
  const listContent =
    searchValue.trim().length === 0 ? (
      <MessagesWindowList scrollId={id} />
    ) : (
      <MessagesWindowSearch
        onClick={handleSearchClick}
        searchValue={searchValue}
      />
    );
  return (
    <Fragment>
      <Window
        id={id}
        className={`${className}`}
        title="Tin nhắn"
        path="/messages"
        expand={expand}
        content={
          <div>
            {/* Thanh tìm kiếm cuộc trò chuyện */}
            <div style={{ padding: "5px" }}>
              <MediumSearchInputStyled
                prefix={
                  <SmallIconStyled className="fas fa-search"></SmallIconStyled>
                }
                placeholder="Tìm kiếm cuộc trò truyện"
                style={{ marginTop: "8px" }}
                onChange={(event) => setSearchValue(event.target.value)}
                value={searchValue}
              />
            </div>

            {listContent}
          </div>
        }
      />
    </Fragment>
  );
};

export default MessagesWindow;
