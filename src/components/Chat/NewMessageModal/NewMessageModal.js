import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
//code của mình
import { ModalStyled } from "../../Styled/Modal";
import { MediumTitleStyled, SmallTitleStyled } from "../../Styled/Text";
import { MediumSearchInputStyled } from "../../Styled/Input";
import { SmallIconStyled } from "../../Styled/Icon";

import ListTile from "../../UI/ListTile";
import OnlineAvatar from "../../UI/OnlineAvatar";
import { getPathByIndex } from "../../../utils/url";
import { toggleNewMessageModalVisible } from "../../../store/modules/Chat/slice";
import useHttpRequestWithDebounce from "../../../hooks/useHttpRequestWithDebounce";
import { setSingleConversationId } from "../../../store/modules/MessagesWindow/slice";
import {
  addConversationId,
  wrapConversationId,
} from "../../../store/modules/ChatTab/slice";
import socket from "../../../utils/socket/socket";

const NewMessageSearchResultStyled = styled.div`
  margin-top: 16px;

  &&& {
    .ant-radio-group {
      width: 100%;
    }
  }
  .result-wrapper {
    max-height: 250px;
    overflow: scroll;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .item-search {
    .list-tile-wrapper {
      width: 100%;
    }
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .list-tile:hover {
      .prefix {
        align-items: center;
      }
    }
    .list-tile {
      .prefix {
        align-items: center;
      }
    }
  }
`;

const NewMessageModal = ({ visible }) => {
  const dispatch = useDispatch();
  const [friends, setFriends] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const {
    loading: searchLoading,
    sendRequest: searchFriendsWithConversationRequest,
  } = useHttpRequestWithDebounce(300);

  const currentPath = getPathByIndex(1);

  const isLgScreen = useMediaQuery({ query: "(min-width: 992px)" });

  //khi search
  const handleSearchFriends = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchFriendsSuccess = ({ resData }) => {
    const { friends: friendsValue } = resData;

    setFriends(friendsValue);
  };
  const handleSearchFriendsFailed = (message) => {
    console.log(message);
  };

  useEffect(() => {
    // if (searchValue.trim().length <= 0) {
    //   setFriends([]);
    //   return;
    // }

    searchFriendsWithConversationRequest({
      axiosConfig: {
        method: "GET",
        url: "/user/friends-and-conversation",
        params: {
          skip: 0,
          limit: 10,
          displayName: searchValue,
        },
      },
      successCallback: handleSearchFriendsSuccess,
      failedCallback: handleSearchFriendsFailed,
    });
    return () => {};
  }, [searchValue]);

  const handleClickFriend = (conversationId) => {
    //tiến hành đọc tin nhắn cuối của phòng
    socket.emit("read-last-message", { conversationId });
    if (currentPath === "messages") {
      dispatch(setSingleConversationId(conversationId));
    } else {
      if (isLgScreen) {
        dispatch(addConversationId(conversationId));
      } else {
        dispatch(wrapConversationId(conversationId));
      }
    }

    dispatch(toggleNewMessageModalVisible(false));
  };

  return (
    <ModalStyled
      onCancel={() => {
        dispatch(toggleNewMessageModalVisible(false));
      }}
      visible={visible}
      title={<MediumTitleStyled>Tin nhắn mới</MediumTitleStyled>}
      footer={null}
      zIndex={10005}
    >
      <div>
        <MediumSearchInputStyled
          prefix={<SmallIconStyled className="fas fa-search"></SmallIconStyled>}
          placeholder="Tìm kiếm bạn bè để gửi tin nhắn"
          onChange={handleSearchFriends}
        />
      </div>
      <NewMessageSearchResultStyled>
        {searchLoading === true && (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <Spin />
          </div>
        )}
        {searchLoading === false && friends.length <= 0 && (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <SmallTitleStyled>Không tìm thấy kết quả</SmallTitleStyled>
          </div>
        )}
        <div className="result-wrapper">
          {searchLoading === false && friends.map((friend, index) => (
            <div
              onClick={handleClickFriend.bind(null, friend.conversationId)}
              key={`new_message_item_result-${index}-${friend._id}`}
              className="item-search"
            >
              <ListTile
                showAction={false}
                avatar={
                  <OnlineAvatar
                    size={40}
                    online={false}
                    avatar={friend.avatar?.files[0].fileUrl}
                  />
                }
                title={
                  <SmallTitleStyled>
                    {friend.informations.displayName}
                  </SmallTitleStyled>
                }
              />
            </div>
          ))}
        </div>
      </NewMessageSearchResultStyled>
    </ModalStyled>
  );
};
export default NewMessageModal;
