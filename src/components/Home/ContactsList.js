import React from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
//code của mình
import ListTitle from "../UI/ListTile";
import OnlineAvatar from "../UI/OnlineAvatar";
import { SmallTitleStyled } from "../Styled/Text";
import { SmallContentStyled } from "../Styled/Text";
import { getOnlineUsres } from "../../store/modules/OnlineList/selectors";
//danh sách các nhóm đang tham gia - nằm ở sider bên phải ở trang home
const ContactsList = React.memo(({onClick}) => {
  //danh sách những người dùng đang online
  const users = useSelector(getOnlineUsres);
  return (
    <div>
      {users.map((user, index) => {
        const { informations, avatar, _id, status, timeOff, conversationId } = user;
        return (
          <ListTitle
            onClick={onClick.bind(null,conversationId)}
            key={`online-user-${_id}`}
            title={
              <SmallTitleStyled>{informations.displayName}</SmallTitleStyled>
            }
            subTitle={
              status === "offline" ? (
                <SmallContentStyled>
                  <Moment date={timeOff} fromNow={true} />
                </SmallContentStyled>
              ) : null
            }
            avatar={
              <OnlineAvatar
                size={26}
                online={status === "online"}
                onlineSize={8}
                avatar={avatar ? avatar.files[0].fileUrl : null}
              />
            }
            showAction={false}
          />
        );
      })}
    </div>
  );
});

export default ContactsList;
