import { useState, useEffect } from "react";
import { Form, Tooltip, Spin } from "antd";
import styled from "styled-components";
import { useDispatch } from "react-redux";
//code của mình
import { ModalStyled } from "../../Styled/Modal";
import { MediumTitleStyled, SmallTitleStyled } from "../../Styled/Text";
import { MediumSearchInputStyled } from "../../Styled/Input";
import { SmallIconStyled } from "../../Styled/Icon";
import { TextInputStyled } from "../../Styled/Input";
import ListTile from "../../UI/ListTile";
import OnlineAvatar from "../../UI/OnlineAvatar";
import { RectangleButtonStyled } from "../../Styled/Button";

import useHttpRequest from "../../../hooks/useHttpRequest";
import useHttpRequestWithDebounce from "../../../hooks/useHttpRequestWithDebounce";
import InsideCenterSpin from "../../UI/InsideCenterSpin";
const { Item } = Form;

const NewGroupChathResultStyled = styled.div`
  margin-top: 16px;

  &&& {
  }
  .result-wrapper {
    max-height: 250px;
    overflow: scroll;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 10px;
    margin-top: 8px;
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
  .item-search {
    width: 100%;

    align-items: center;

    .list-tile {
      .prefix {
        align-items: center;
      }
    }
  }
`;

const FriendsSelectedStyled = styled.div`
  .selected-list {
    display: flex;
    max-width: 100%;
    overflow: scroll;
    overflow-y: hidden;
    overflow-x: scroll;
    margin-bottom: 16px;
    column-gap: 10px;
    padding: 10px 0px;
    //kích thước của toàn bộ thanh scrollbar (thanh chứa cục scroll và cả cục scroll)
    ::-webkit-scrollbar {
      height: 10px;
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
`;

//với modal này, ta có thể thực hiện chức năng tạo group chat hoặc chức năng mời thêm thành viên
//type = new: tạo group chat - type = invite: mời thêm thành viên
//currentUsers: danh sách người dùng hiện tại - dùng để query kết quả search - sẽ có khi thực hiện chức năng mời thêm thành viên
//onClose: xử lý đóng modal này
//conversationId: sẽ có khi thực hiện chức năng mời thành viên
const NewGroupModal = ({
  visible,
  type = "new",
  currentUsers = [],
  conversationId,
  onClose,
}) => {
  // console.log(currentUsers)
  const dispatch = useDispatch();
  //kết quả search từ backend trả về
  const [friends, setFriends] = useState([]);
  //những người bạn mình đã chọn
  const [friendsSelected, setFriendsSelected] = useState([]);
  //giá trị nhập vào ô input
  const [searchValue, setSearchValue] = useState("");
  const {
    sendRequest: sendFriendsSearchRequest,
    loading: friendsSearchLoading,
  } = useHttpRequestWithDebounce(300);

  const { sendRequest: groupChatRequest, loading: groupChatLoading } =
    useHttpRequest();

  //khi kết quả search thành công
  const handleFriendsSearchSuccess = ({ resData }) => {
    const { friends } = resData;
    setFriends((current) => {
      return [...friends];
    });
  };
  //khi kết quả search thất bại
  const handleFriendsSearchFailed = (message) => {
    console.log(message);
  };

  //khi nhập vào input search
  const handleSearchFriends = (event) => {
    setSearchValue(event.target.value);
  };

  //khi nhấn chọn một người bạn trong kết quả search
  const handleClickFriendResut = (friend) => {
    //thêm vào mảng được chọn
    setFriendsSelected((current) => {
      return [friend, ...current];
    });
    // //xóa khỏi mảng kết quả search
    //ta đã tận dụng useEffect lắng nghe sự thay đổi của cả mảng selected và giá trị search
    //để khi người dùng bỏ chọn 1 người ra khi tự động search lại theo giá trị
  };

  //khi nhấn lại một người bạn trong mảng đã chọn
  const handleClickFriendSelected = (friendId) => {
    setFriendsSelected((current) => {
      const newFriendsSelected = current.filter(
        (item) => item._id !== friendId
      );
      return [...newFriendsSelected];
    });
  };

  //dùng useEffect lắng nghe sự thay đổi của friendsSelected và giá trị search và bắt đầu search
  useEffect(() => {
    // if (searchValue.trim().length <= 0) {
    //   setFriends((current) => {
    //     return [];
    //   });
    //   return;
    // }

    //lấy ra các _id người dùng trong mảng friendsSelected
    const friendsId = [];
    friendsSelected.forEach((item) => friendsId.push(item._id));

    //tính luôn cả mảng currentUsers (sẽ có giá trị nếu dùng chức năng mời thành viên)
    currentUsers.forEach((item) => friendsId.push(item._id));

    //tiến hành search dữ liệu - ta tận dùng /user/friends-tag api để fetch dữ liệu theo kiểu
    // tìm bạn bè của một người nhưng loại trừ những người đã chọn ra

    sendFriendsSearchRequest({
      axiosConfig: {
        url: "/user/friends-tag",
        method: "POST",
        params: {
          skip: 0,
          limit: 10,
          displayName: searchValue,
        },
        data: {
          tags: friendsId,
        },
      },
      successCallback: handleFriendsSearchSuccess,
      failedCallback: handleFriendsSearchFailed,
    });
  }, [searchValue, friendsSelected]);

  const handleCreateGroupSuccess = ({ resData }) => {
    onClose();
  };
  const handleCreateGroupFailed = (message) => {
    console.log(message);
  };

  //thực hiện tạo nhóm chat mới
  const handleCreateGroup = ({ values, usersId }) => {
    const { displayName } = values; //displayName là ten nhóm chat

    groupChatRequest({
      axiosConfig: {
        url: "/conversation/create-group-chat",
        method: "POST",
        data: {
          usersId,
          displayName,
        },
      },
      successCallback: handleCreateGroupSuccess,
      failedCallback: handleCreateGroupFailed,
    });
  };

  const handleInviteMembersSuccess = ({ resData }) => {
    console.log(resData);
    //đóng form
    onClose();
  };
  const handleInviteMembersFailed = (message) => {
    console.log(message)
  };

  const handleInviteMembers = ({ usersId }) => {
    groupChatRequest({
      axiosConfig: {
        url: "/conversation/invite-members",
        method: "PUT",
        data: {
          usersId,
          conversationId,
        },
      },
      successCallback: handleInviteMembersSuccess,
      failedCallback: handleInviteMembersFailed,
    });
  };

  //khi nộp form
  const handleFormSubmit = (values) => {
    //lấy ra mảng usersId để thêm lên server
    const usersId = [];
    friendsSelected.forEach((item) => usersId.push(item._id));

    //nếu type của modal này là tạo mới group chat thì thực hiện
    if (type === "new") {
      handleCreateGroup({ values, usersId });
    }
    //nếu type === "invite" thì thực hiện chức năng mời thành viên
    if(type === "invite"){
      handleInviteMembers({usersId})
    }
  };

  return (
    <ModalStyled
      onCancel={onClose}
      visible={visible}
      title={
        <MediumTitleStyled>
          {type === "new" ? "Nhóm chat mới" : "Mời thêm thành viên"}
        </MediumTitleStyled>
      }
      footer={null}
      zIndex={10005}
    >
      <NewGroupChathResultStyled>
        <Form onFinish={handleFormSubmit}>
          {type === "new" && (
            <Item
              name="displayName"
              key="displayName"
              label={<SmallTitleStyled>Tên nhóm</SmallTitleStyled>}
              validateTrigger={["onBlur"]}
              rules={[
                { required: true, message: "Vui lòng nhập tên nhóm chat" },
              ]}
            >
              <TextInputStyled />
            </Item>
          )}
          {friendsSelected.length > 0 && (
            <FriendsSelectedStyled>
              <SmallTitleStyled>Bạn bè đã chọn</SmallTitleStyled>
              <div className="selected-list">
                {friendsSelected.map((item, index) => (
                  <Tooltip
                    key={`friend-selected-message-${item._id}-${index}`}
                    zIndex={10010}
                    title={item.informations.displayName}
                  >
                    <div
                      onClick={handleClickFriendSelected.bind(null, item._id)}
                    >
                      <OnlineAvatar
                        online={false}
                        avatar={null}
                        key={`new-group-${item._id}-${index}`}
                      />
                    </div>
                  </Tooltip>
                ))}
              </div>
            </FriendsSelectedStyled>
          )}
          <div>
            <MediumSearchInputStyled
              prefix={
                <SmallIconStyled className="fas fa-search"></SmallIconStyled>
              }
              placeholder="Tìm kiếm bạn bè"
              onChange={handleSearchFriends}
              value={searchValue}
            />
          </div>
          <Item
            name="friendSelected"
            key="friendSelected"
            className="result-wrapper"
          >
            {friendsSearchLoading && <InsideCenterSpin />}
            {friends.map((friend, index) => (
              <div
                key={`new_group_chat_item_result-${index}-${friend._id}`}
                className="item-search"
              >
                <ListTile
                  onClick={handleClickFriendResut.bind(null, friend)}
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
          </Item>
          <RectangleButtonStyled
            textcolor="#FFFFFF"
            width="100%"
            disabled={friendsSelected.length <= 0}
          >
            <Spin spinning={groupChatLoading}>
              <MediumTitleStyled>
                {" "}
                {groupChatLoading ? "Đang xử lý" : "Xác nhận"}
              </MediumTitleStyled>
            </Spin>
          </RectangleButtonStyled>
        </Form>
      </NewGroupChathResultStyled>
    </ModalStyled>
  );
};
export default NewGroupModal;
