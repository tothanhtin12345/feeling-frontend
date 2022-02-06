import Moment from "react-moment";
import { Tooltip } from "antd";
import "moment/locale/vi";
//code của mình
import { SmallContentStyled } from "../Styled/Text";
import { MessageStyled } from "../Styled/Message";
import OnlineAvatar from "../UI/OnlineAvatar";
import MessageText from "./MessageText";
import { calendarStrings } from "../../contants/moment";

//một tin nhắn
//ofMe: có phải tin nhắn của mình không

const Message = ({
  messageList,
  ofMe,
  owner,
  type,
  timeText,
  text,
  onAfterDeleteMessage,
}) => {
  if (type === "time") {
    return (
      <div style={{ textAlign: "center" }}>
        <SmallContentStyled>
          <Moment local date={timeText} calendar={calendarStrings} />
        </SmallContentStyled>
      </div>
    );
  }

  if (type === "system") {
    return (
      <div style={{ textAlign: "center" }}>
        <SmallContentStyled>{text}</SmallContentStyled>
      </div>
    );
  }

  return (
    <MessageStyled ofMe={ofMe}>
      {ofMe === false ? (
        <Tooltip
          zIndex={100010}
          placement="left"
          title={owner.informations.displayName}
        >
          <div>
            {" "}
            <OnlineAvatar
              online={false}
              size={26}
              avatar={owner.avatar ? owner.avatar.files[0].fileUrl : null}
            />
          </div>
        </Tooltip>
      ) : (
        <div style={{ width: "24px", height: "24px" }}></div>
      )}

      <div className="message-wrapper">
        {messageList.map((item, index) => (
          <MessageText
            onAfterDeleteMessage={onAfterDeleteMessage}
            key={item._id}
            _id={item._id}
            text={item.text}
            type={item.type}
            createdAt={item.createdAt}
            loading={item.loading}
            error={item.error}
          />
        ))}
      </div>
    </MessageStyled>
  );
};
export default Message;
