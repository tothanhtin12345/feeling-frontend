
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
//code của mình
import MessagesWindow from "../components/MessagesWindow/MessagesWindow";
import ChatWindow from "../components/Chat/ChatWindow";
import { breakpoint } from "../components/Styled/mixin";
import { getSingleConversationId } from "../store/modules/MessagesWindow/selectors";
import { setSingleConversationId } from "../store/modules/MessagesWindow/slice";

const MessagesPageStyled = styled.div`
  background-color: #ffffff;
  height: calc(100vh - 66px);
  overflow: hidden;
  position: relative;
  & {
    .messages-row {
      display: flex;

      .messages-left-col {
        border-right: 1px solid #ccced2;
        width: 100%;
        min-height: calc(100vh - 66px);
        max-height: calc(100vh - 66px);
        overflow: scroll;
        overflow-y: auto;
        overflow-x: hidden;
        //kích thước của toàn bộ thanh scrollbar (thanh chứa cục scroll và cả cục scroll)
        ::-webkit-scrollbar {
          width: 10px;
        }
        //màu của thanh scrollbar (nằm dưới cục scroll)
        ::-webkit-scrollbar-track {
          background: #ffffff;
          border-radius: 8px;
        }
        //cái cục scroll
        ::-webkit-scrollbar-thumb {
          background: #ffffff;
        }
        //đổi màu cục scroll khi scroll vào
        :hover::-webkit-scrollbar-thumb {
          background: #ccced2;
        }
      }
      .messages-right-col {
        width: 100%;
        max-height: calc(100vh - 66px);

        position: absolute;
        left: 0;
        top: 0;

        .messages-chat-window-wrapper {
          height: calc(100vh - 66px);
        }
      }

      ${breakpoint.md`
        .messages-left-col{
          width:40%;
        }
        .messages-right-col{
          width:60%;
          position:unset;
        }
      `}
      ${breakpoint.lg`
        .messages-left-col{
          width:35%;
        }
        .messages-right-col{
          width:65%;
        }
      `}
    }
  }
`;

const Messages = ({ children }) => {

  const dispatch = useDispatch();
  useEffect(()=>{

    //clear cái message đang mở
    return () => {
      dispatch(setSingleConversationId(null));
    }
  },[])

  // const { conversationId } = useParams();
  const conversationId = useSelector(getSingleConversationId);
  return (
    <MessagesPageStyled>
      <div className="messages-row">
        <div id="messages-scroll" className="messages-left-col">
          <MessagesWindow
            id="messages-scroll"
            className="messages-page-child"
            expand={false}
          />
        </div>
        <div className="messages-right-col">
          {/* <Route path="/messages/:conversationId">
            <ChatWindow
              conversationId={conversationId}
              scrollId="big-chat-window"
              className="messages-chat-window-wrapper"
            />
          </Route> */}
          {conversationId && (
            <ChatWindow
              scrollId="big-chat-window"
              className="messages-chat-window-wrapper"
              conversationId={conversationId}
            />
          )}
        </div>
      </div>
    </MessagesPageStyled>
  );
};

export default Messages;
