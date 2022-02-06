import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//code của mình
import ListTitle from "../UI/ListTile";
import OnlineAvatar from "../UI/OnlineAvatar";
import { SmallTitleStyled } from "../Styled/Text";

import { getOnlineGroups } from "../../store/modules/OnlineList/selectors";

//danh sách các nhóm đang tham gia - nằm ở sider bên phải ở trang home
const GroupsChatList = React.memo(({onClick}) => {
  const dispatch = useDispatch();

  //dữ liệu này sẽ được fetch ở main layout thông qua một hook
  const groups = useSelector(getOnlineGroups);



 
  return (
    <div>
      {groups.map((item, index) => (
        <ListTitle
          onClick={onClick.bind(null,item._id)}
          key={`${item._id}-${index}-group-chat-online`}
          title={<SmallTitleStyled>{item.displayName}</SmallTitleStyled>}
          avatar={
            <OnlineAvatar
              size={26}
              online={true}
              onlineSize={8}
              avatar={
                "https://firebasestorage.googleapis.com/v0/b/react-http-c3250.appspot.com/o/public%2F788858_group_512x512.png?alt=media&token=e3e6b4d4-d089-407b-81c3-5f6ef6cfb262"
              }
            />
          }
          showAction={false}
        />
      ))}
    </div>
  );
});

export default GroupsChatList;
