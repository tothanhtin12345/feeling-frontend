import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Tooltip, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { Fragment } from "react";
//code của mình

import OnlineAvatar from "./OnlineAvatar";
import { SmallActionStyled, MediumContentStyled } from "../Styled/Text";
import { SmallIconStyled } from "../Styled/Icon";
import { IconButtonStyled } from "../Styled/Button";
import {

  sendWallFriendRequestSaga,
 

  cancelWallFriendSentSaga,
 
  
} from "../../store/modules/WallFriends/slice";

import {
  followFriendSaga,
  unFollowFriendSaga,
  cancelFriendSaga,
  updateFriend,
} from "../../store/modules/FriendList/slice";

import {
  acceptFriendRequestedSaga,
  cancelFriendRequestedSaga,
} from "../../store/modules/FriendRequestedList/slice";

import { cancelFriendSentSaga } from "../../store/modules/FriendSentList/slice";

import { getUserId } from "../../store/modules/User/selectors";
import { getWallUserId } from "../../store/modules/Wall/selectors";
import {
  denyJoinGroupRequestSaga,
  acceptJoinGroupRequestSaga,
} from "../../store/modules/JoinGroupRequestList/slice";
import {
  setInspectorRoleSaga,
  unSetInspectorRoleSaga,
  dismissMemberSaga,
  setShowConFirmDismissModal,
} from "../../store/modules/GroupMembers/slice";
import ConfirmModal from "./ConfirmModal";

import {
  
  setShowOutConfirmModal,
  outGroupSaga,
} from "../../store/modules/GroupDashboardJoining/slice";

import { cancelJoiningRequestSaga } from "../../store/modules/GroupsDashboardSent/slice";

const UserCardStyled = styled.div`
  padding: 10px 15px;
  background-color: #ffffff;
  border: 1px solid transparent;
  border-radius: 15px;
  width: 100%;
  a:hover {
    color: #615dfa;
  }
  .user-card-prefix {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    a.active,
    a.purple {
      color: #3e3f5e !important;
    }
  }
  .user-card-action {
    min-height: 35px;
    margin-top: 16px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 10px;
    column-gap: 20%;

    button {
      background-color: #f0f2f5;
    }
  }
  .prefix-display-name {
    margin-top: 8px;
    word-break: break-all;
  }
  .prefix-group-position {
    min-height: 25px;
  }
`;

//các hàm để lấy giá trị items cho action - dựa vào type
//hàm chung chung - thực hiện check type và gọi hàm các hàm con để lấy items
const getItemsByType = ({
  _id,
  groupId,
  avatar,
  informations,
  type,
  isFollow,
  isFriend,
  isRequested,
  isSent,
  isInspector,
  isManager,
  isFollowGroup,
  isCurrentUser,
  currentUserInformation,
  isWallOfCurrentUser,
  dispatch,
}) => {
  if (type === "friends-list") {
    return friendsItemsList({
      _id,
      isFollow,
      isCurrentUser,
      isRequested,
      isSent,
      isFriend,
      isWallOfCurrentUser,
      dispatch,
    });
  }
  if (type === "friends-requested") {
    return friendsRequestedItemsList({ _id, isRequested, dispatch });
  }
  if (type === "friends-sent") {
    return friendsSentItemsList({ _id, isSent, dispatch });
  }
  if (type === "groups-joining") {
    return groupsJoiningItemsList({
      _id,
      isFollowGroup,
      isManager,
      groupId,
      dispatch,
    });
  }
  if (type === "groups-sent") {
    return groupsSentItemsList({ _id, dispatch, groupId });
  }
  if (type === "groups-managing") {
    return groupsManagingItemsLIst();
  }
  if (type === "groups-members") {
    return groupsMembersItemsList({
      _id,
      isCurrentUser,
      isInspector,
      isManager,
      currentUserInformation,
      groupId,
      dispatch,
    });
  }
  if (type === "groups-requested") {
    return groupsMembersRequestedItemsList({ _id, groupId, dispatch });
  }
  return [];
};
//cho danh sách bạn bè
const friendsItemsList = ({
  _id,
  isFollow,
  isCurrentUser,
  isRequested,
  isSent,
  isFriend,
  isWallOfCurrentUser,
  dispatch,
}) => {
  if (isCurrentUser) {
    return [];
  }
  const items = [
    // {
    //   title: "Nhắn tin",
    //   classNameIcon: "fas fa-comment-dots",
    //   handleOnClick: () => {
    //     history.push("/messages")
    //   },
    // },
  ];
  if (!isFollow) {
    items.splice(1, 0, {
      title: "Theo dõi",
      classNameIcon: "fas fa-plus-square",
      handleOnClick: () => {
        dispatch(followFriendSaga({ wallUserId: _id }));
      },
    });
  } else {
    items.splice(1, 0, {
      title: "Hủy theo dõi",
      classNameIcon: "fas fa-minus-square",
      handleOnClick: () => {
        dispatch(unFollowFriendSaga({ wallUserId: _id }));
      },
    });
  }

  if (isSent) {
    items.push({
      title: "Hủy yêu cầu kết bạn",
      classNameIcon: "fas fa-times",
      handleOnClick: () => {
        dispatch(cancelWallFriendSentSaga({ wallUserId: _id }));
      },
    });
  }
  if (!isSent && !isFriend) {
    items.push({
      title: "Gừi lời mời kết bạn",
      classNameIcon: "fas fa-user-plus",
      handleOnClick: () => {
        dispatch(sendWallFriendRequestSaga({ wallUserId: _id }));
      },
    });
  }
  if (isFriend) {
    items.push({
      title: "Hủy kết bạn",
      classNameIcon: "fas fa-user-times",
      handleOnClick: () => {
        dispatch(updateFriend({ data: { cancelFriendConfirm: true }, _id }));
      },
    });
  }

  return items;
};

//cho danh sách những lời mời kết bnaj đã nhận được (đã được yêu cầu)
const friendsRequestedItemsList = ({ _id, isRequested, dispatch }) => {
  if (!isRequested) {
    return [];
  }
  const items = [
    {
      title: "Hủy",
      classNameIcon: "fas fa-times",
      handleOnClick: () => {
        dispatch(cancelFriendRequestedSaga({ wallUserId: _id }));
      },
    },
    {
      title: "Chấp nhận",
      classNameIcon: "fas fa-check",
      handleOnClick: () => {
        dispatch(acceptFriendRequestedSaga({ wallUserId: _id }));
      },
    },
  ];
  return items;
};

//cho danh sách những lời mời kết bạn đã gửi đi
const friendsSentItemsList = ({ _id, isSent, dispatch }) => {
  if (!isSent) {
    return [];
  }
  const items = [
    {
      title: "Hủy",
      classNameIcon: "fas fa-times",
      handleOnClick: () => {
        dispatch(cancelFriendSentSaga({ wallUserId: _id }));
      },
    },
  ];
  return items;
};

//cho danh sách những group đang tham gia
const groupsJoiningItemsList = ({
  _id,
  isFollowGroup,
  isManager,
  groupId,
  dispatch,
}) => {
  const items = [];

  //console.log(groupId)

  //nếu không phải là manager thì mới có thêm chức năng rời khỏi group
  //một manager không thể rời khỏi group mà mình quản lý được
  if (!isManager) {
    items.push({
      title: "Rời khỏi nhóm",
      classNameIcon: "fas fa-sign-out-alt",
      handleOnClick: () => {
        dispatch(setShowOutConfirmModal({ groupId, showModal: true }));
      },
    });
  }
  return items;
};
//cho danh sách những group đã gửi yêu cầu tham gia
const groupsSentItemsList = ({ _id, dispatch, groupId }) => {
  const items = [
    {
      title: "Hủy",
      classNameIcon: "fas fa-times",
      handleOnClick: () => {
        dispatch(cancelJoiningRequestSaga({ groupId }));
      },
    },
  ];
  return items;
};
//cho danh sách những group đang quản lý
const groupsManagingItemsLIst = () => {
  //đơn giản là trả về một mảng rỗng
  return [];
};

//tất cả thành viên trong nhóm
const groupsMembersItemsList = ({
  _id,
  isCurrentUser,
  isInspector,
  isManager,
  currentUserInformation,
  groupId,
  dispatch,
}) => {
  const items = [];

  //nếu người dùng hiện tại là một manager và người dùng trong card là một isInspector
  //và user card này không phải người dùng hiện tại
  //thì hiện chức năng bãi chức
  if (currentUserInformation.isManager && isInspector && !isCurrentUser && !isManager) {
    items.push({
      title: "Bãi chức",
      classNameIcon: "fas fa-user-times",
      handleOnClick: () => {
        dispatch(unSetInspectorRoleSaga({ groupId, userId: _id }));
      },
    });
  }
  if (currentUserInformation.isManager && !isInspector && !isCurrentUser && !isManager) {
    items.push({
      title: "Thêm làm người kiểm duyệt",
      classNameIcon: "fas fa-user-shield",
      handleOnClick: () => {
        dispatch(setInspectorRoleSaga({ groupId, userId: _id }));
      },
    });
  }
  if ((currentUserInformation.isManager || currentUserInformation.isInSpector) && !isManager && !isCurrentUser) {
    items.push({
      title: "Mời ra khỏi nhóm",
      classNameIcon: "fas fa-sign-out-alt",
      handleOnClick: () => {
        //hiển thị cái form xác nhận
        dispatch(setShowConFirmDismissModal({ showModal: true, userId: _id }));
      },
    });
  }
  return items;
};

//cho danh sách những yêu cầu tham gia nhóm đã nhận được
const groupsMembersRequestedItemsList = ({ _id, groupId, dispatch }) => {
  const items = [
    {
      title: "Chấp nhận",
      classNameIcon: "fas fa-check",
      handleOnClick: () => {
        dispatch(acceptJoinGroupRequestSaga({ groupId, userId: _id }));
      },
    },
    {
      title: "Từ chối",
      classNameIcon: "fas fa-times",
      handleOnClick: () => {
        dispatch(denyJoinGroupRequestSaga({ groupId, userId: _id }));
      },
    },
  ];
  return items;
};

const commonKey = "user-card";

//một cart chứa avatar, tên người dùng, và các hành động (tùy vào chức năng)
//type:"friends-list", "friends-requested", "friends-sent"
//type:"groups-joining","groups-managing","groups-sent","groups-members","groups-requested"
//isFriend: trường hợp mà người dùng hủy kết bạn ở trong đây thì isFriend sẽ thành true và hiện lại chữ kết bạn
//isInspector: có phải người kiểm duyệt không (dành cho group)
//isManager: có phải quản trị viên không (dành cho group)
//path: đường dẫn khi nhấn vào tên hoặc ảnh đại diện (gồm /wall hoặc /groups)
//currentUserInformation: một đối tượng chứa thông tin của người dùng đang sử dụng app (bao gồm thông tin như isManager, isInspector,..)
//có thể dựa vào thông tin này để hiển thị một số chức năng đối với các userCard
const UserCard = ({
  _id,
  groupId,
  avatar,
  informations,
  type,
  isFollow,
  isFriend,
  isRequested,
  isSent,
  isInspector,
  isManager,
  isFollowGroup,
  isCurrentUser,
  requestedAt,
  currentUserInformation,
  memberCount,
  path,
  loading = false,
  //có hiện một cái confirm modal khi mời một người ra khỏi phòng cho thẻ này
  dismissConfirm = false,
  //có hiện một cái confiem modal khi chủ động nhấn out một nhóm
  outGroupConfirm = false,
  //có hiện một cái confirm modal khi hủy kết bạn với một người
  cancelFriendConfirm = false,
}) => {
  const dispatch = useDispatch();

  const currentUserId = useSelector(getUserId);
  const wallUserId = useSelector(getWallUserId);



  //có phải đang tương tác với tường nhà của chính mình không
  const isWallOfCurrentUser = currentUserId === wallUserId;

  const items = getItemsByType({
    _id,
    groupId,
    avatar,
    informations,
    type,
    isFollow,
    isFriend,
    isRequested,
    isSent,
    isInspector,
    isManager,
    isFollowGroup,
    isCurrentUser,
    currentUserInformation,
    isWallOfCurrentUser,

    dispatch,
  });

  return (
    <Spin spinning={loading}>
      <UserCardStyled>
        <div className="user-card-prefix">
          <div className="prefix-avatar">
            <NavLink to={`${path}/${_id}`}>
              <OnlineAvatar
                avatar={avatar ? avatar.files[0].fileUrl : null}
                online={false}
                size={56}
              />
            </NavLink>
          </div>
          <div className="prefix-display-name">
            <SmallActionStyled to={`${path}/${_id}`}>
              {informations.displayName}
            </SmallActionStyled>
          </div>
          <div className="prefix-group-position">
            {(type === "groups-members" ||
              type === "groups-requested" ||
              type === "groups-managing" ||
              type === "groups-joining") &&
              (isInspector || isManager || requestedAt || memberCount) && (
                <MediumContentStyled color="#615DFA">
                  {!memberCount && isInspector && "Người kiểm duyệt"}
                  {!memberCount && isManager && "Quản trị viên"}
                  {requestedAt && (
                    <Fragment>
                      Đã yêu cầu: <Moment format="LL" date={requestedAt} />
                    </Fragment>
                  )}
                  {memberCount && `Có ${memberCount} thành viên`}
                </MediumContentStyled>
              )}
          </div>
        </div>
        <div className="user-card-action">
          {items.map((item, index) => (
            <Tooltip
              title={item.title}
              key={`${commonKey}-${index}-${_id}-1-${type}`}
            >
              <IconButtonStyled
                onClick={item.handleOnClick}
                icon={
                  <SmallIconStyled
                    className={item.classNameIcon}
                  ></SmallIconStyled>
                }
              />
            </Tooltip>
          ))}
        </div>
        {dismissConfirm && (
          <ConfirmModal
            title="Xác nhận mời thành viên ra khỏi nhóm"
            content="Bạn có chắc là muốn mời thành viên này ra khỏi nhóm không ?"
            loading={loading}
            onCancel={() => {
              //tắt cái modal xác nhận ở user card
              dispatch(
                setShowConFirmDismissModal({ showModal: false, userId: _id })
              );
            }}
            onConfirm={() => {
              dispatch(dismissMemberSaga({ userId: _id, groupId }));
            }}
          />
        )}

        {outGroupConfirm && (
          <ConfirmModal
            title="Xác nhận rời nhóm"
            content="Bạn có chắc là muốn rời nhóm này không ?"
            loading={loading}
            onCancel={() => {
              dispatch(setShowOutConfirmModal({ groupId, showModal: false }));
            }}
            onConfirm={() => {
              dispatch(outGroupSaga({ groupId }));
            }}
          />
        )}
        {cancelFriendConfirm && (
          <ConfirmModal
            title="Xác nhận hủy kết bạn"
            content="Bạn có chắc là muốn hủy kết bạn với người dùng này ?"
            loading={loading}
            onCancel={() => {
              dispatch(updateFriend({ data: { cancelFriendConfirm: false }, _id }));
            }}
            onConfirm={() => {
              dispatch(cancelFriendSaga({wallUserId: _id}));
            }}
          />
        )}
      </UserCardStyled>
    </Spin>
  );
};

export default UserCard;
