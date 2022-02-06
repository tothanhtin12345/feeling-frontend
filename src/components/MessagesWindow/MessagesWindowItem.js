import { Avatar } from "antd";
//code của mình
import ListTile from "../UI/ListTile";
import { SmallContentStyled, SmallTitleStyled } from "../Styled/Text";
import OnlineAvatar from "../UI/OnlineAvatar";
//Các item của cửa sổ tin nhắn (room)
const MessagesWindowItem = ({
  //isClick: có đang được chọn hay không ?
  isClick,
  avatar,
  title,
  subTitle,
  smallSubTitle,
  online,
  onClick,
  isRead,
}) => {
  return (
    <ListTile
      backgroundcolor={isClick ? "#dad9ff" : "undefined"}
      showAction={false}
      type="Messages"
      avatar={<OnlineAvatar newmess={isRead ? "false" : "true"} online={online} size={48} avatar={avatar} />}
      title={<SmallTitleStyled>{title}</SmallTitleStyled>}
      subTitle={
        <div
          style={{
            display: "flex",
            columnGap: "5px",
            alignItems: "center",
          }}
        >
          <SmallContentStyled
            color={!isRead ? "#615dfa" : "undefined"}
            className="text-responsive"
          >
            {subTitle}
          </SmallContentStyled>

          <SmallContentStyled style={{ whiteSpace: "nowrap" }}>
            {smallSubTitle}
          </SmallContentStyled>
        </div>
      }
     
      onClick={onClick}
    />
  );
};

export default MessagesWindowItem;
