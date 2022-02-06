import { useSelector } from "react-redux";
//code của mình
import { ChatTabStyled } from "../Styled/Tab";
import ChatWindow from "./ChatWindow";
import {getFirstConversation,getSecondConversation} from "../../store/modules/ChatTab/selectors";

//tab chat được mở ở góc phải thì bấm vào một room ở trên messages window
const ChatTab = () => {
  //phòng được chọn để hiển thị
  const firstConversationId = useSelector(getFirstConversation);
  const secondConversationId = useSelector(getSecondConversation);
  return (
    <ChatTabStyled>
      {/* Mai mốt kiểm tra thêm xem là location đang ở /messages hay không - nếu có mới hiển thị 2 thằng dưới */}
      {secondConversationId && (
        <div className="tab-chat second-tab">
          <ChatWindow conversationId={secondConversationId} scrollId="chat-tab-scroll-2" />
        </div>
      )}
      {firstConversationId && (
        <div className="tab-chat first-tab">
          <ChatWindow conversationId={firstConversationId} scrollId="chat-tab-scroll-1" />
        </div>
      )}
    </ChatTabStyled>
  );
};

export default ChatTab;
