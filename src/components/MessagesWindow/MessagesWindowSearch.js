import { useEffect, useState } from "react";
import { Spin } from "antd";
//code của mình

import ListTile from "../UI/ListTile";
import { SmallTitleStyled } from "../Styled/Text";
import useHttpRequestWithDebounce from "../../hooks/useHttpRequestWithDebounce";
import OnlineAvatar from "../UI/OnlineAvatar";

//phần tìm kiếm của cửa sổ tin nhắn
//searchValue được nhập từ thanh tìm kiếm
//nếu nó bị trống sẽ không đến được đây
const MessagesWindowSearch = ({ searchValue, onClick }) => {
  const [individualConversations, setIndividualConversations] = useState([]);
  const [groupConversations, setGroupConversations] = useState([]);
  const { loading: searchLoading, sendRequest: sendSearchConversationRequest } =
    useHttpRequestWithDebounce(300);

  const handleSearchFriendsSuccess = ({ resData }) => {
    const {
      individualConversations: individualConversationsData,
      groupConversations: groupConversationsData,
    } = resData;

    setIndividualConversations(individualConversationsData);
    setGroupConversations(groupConversationsData);

    console.log(resData);
  };

  const handleSearchFriendsFailed = (message) => {
    console.log(message);
  };

  useEffect(() => {
    // if (searchValue.trim().length <= 0) {
    //   setIndividualConversations([]);
    //   setGroupConversations([]);
    //   return;
    // }

    sendSearchConversationRequest({
      axiosConfig: {
        url: "/conversation/search-by-value",
        method: "GET",
        params: {
          //2 giá trị này là dành riêng cho mỗi loại conversation riêng
          skip: 0,
          limit: 5,
          displayName: searchValue,
        },
      },
      successCallback: handleSearchFriendsSuccess,
      failedCallback: handleSearchFriendsFailed,
    });
    return () => {};
  }, [searchValue]);

  return (
    <div>
      {searchLoading === false &&
        individualConversations.length <= 0 &&
        groupConversations.length <= 0 && (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <SmallTitleStyled>Không tìm thấy kết quả phù hợp</SmallTitleStyled>
          </div>
        )}
      {searchLoading === true && (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      )}
      {individualConversations.length > 0 && (
        <div>
          <div style={{ padding: "10px 15px" }}>
            <SmallTitleStyled>Kết quả cho bạn bè</SmallTitleStyled>
          </div>
          {individualConversations.map((item, index) => (
            <ListTile
              onClick={onClick.bind(null, item.conversationId)}
              key={`search-friend-chat-${index}-${item.conversationId}`}
              showAction={false}
              avatar={
                <OnlineAvatar
                  online={false}
                  size={26}
                  avatar={item.avatar?.files[0].fileUrl}
                />
              }
              title={
                <div style={{ display: "flex" }}>
                  <SmallTitleStyled className="text-responsive">
                    {item.informations.displayName}
                  </SmallTitleStyled>
                </div>
              }
            />
          ))}
        </div>
      )}
      {groupConversations.length > 0 && (
        <div>
          <div style={{ padding: "10px 15px" }}>
            <SmallTitleStyled>Kết quả cho nhóm</SmallTitleStyled>
          </div>
          {groupConversations.map((item, index) => (
            <ListTile
              onClick={onClick.bind(null, item._id)}
              key={`search-group-chat-${index}-${item._id}`}
              showAction={false}
              avatar={
                <OnlineAvatar
                  online={false}
                  size={26}
                  avatar={
                    "https://firebasestorage.googleapis.com/v0/b/react-http-c3250.appspot.com/o/public%2F788858_group_512x512.png?alt=media&token=e3e6b4d4-d089-407b-81c3-5f6ef6cfb262"
                  }
                />
              }
              title={
                <div style={{ display: "flex" }}>
                  <SmallTitleStyled className="text-responsive">
                    {item.displayName}
                  </SmallTitleStyled>
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesWindowSearch;
