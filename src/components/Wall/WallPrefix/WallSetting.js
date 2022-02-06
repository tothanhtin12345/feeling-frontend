import { Fragment } from "react";
import styled from "styled-components";
import { Dropdown, Menu, Tooltip, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";

//code của mình
import { RectangleSettingButtonStyled } from "../../Styled/Button";
import DropdownMenuItem from "../../UI/DropdownMenuItem";
import { MediumIconStyled, SmallIconStyled } from "../../Styled/Icon";
import { SmallTitleStyled, MediumTitleStyled } from "../../Styled/Text";
import {
  toggleChangePasswordFormModalVisible,
  toggleInformationFormModalVisible,
} from "../../../store/modules/User/slice";
import { toggleWallSettingFormModalVisible } from "../../../store/modules/Wall/slice";
import {
  sendFriendRequestSaga,
  cancelFriendRequestedSaga,
  cancelFriendSentSaga,
  cancelFriendSaga,
  acceptFriendRequestedSaga,
  followUserSaga,
  unFollowUserSaga,
  setShowCancelFriendConfirmModal,
} from "../../../store/modules/IndividualSetting/slice";

import {
  getWallUserId,
  getIsCurrentUser,
  getIsFriend,
  getIsFollow,
  getIsRequested,
  getIsSent,
} from "../../../store/modules/Wall/selectors";

import { toggleEditGroupInformationsModalVisible } from "../../../store/modules/Groups/slice";

import {
  joinGroupSaga,
  cancelJoinGroupSaga,
  toggleOutGroupConfirmModalVisible,
  toggleDeleteGroupConfirmModalVisible,
} from "../../../store/modules/GroupWallSetting/slice";
import {
  getGroupWallSettingLoading,
  getJoinGroupRequestLoading,
  getCancelJoinGroupRequestLoading,
} from "../../../store/modules/GroupWallSetting/selectors";

import { toggleInviteUserModalVisible } from "../../../store/modules/InviteUserToGroupForm/slice";
import { getIndividualSettingLoading } from "../../../store/modules/IndividualSetting/selectors";

const WallSettingStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;

  &&& {
    /* width: 100% ;
    display: flex;
    align-items: center;
    justify-content: center; */

    .ant-spin-nested-loading {
      width: 100% !important;
    }

    button {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const userSettingMenuKey = "user-wall-setting";
const groupSettingMenuKey = "group-wall-setting";

//một số component được tách nhỏ ra

//dành cho type = individual
const IndividualWall = () => {
  const dispatch = useDispatch();

  const wallUserId = useSelector(getWallUserId);
  const isCurrentUser = useSelector(getIsCurrentUser);
  const isFriend = useSelector(getIsFriend);
  const isFollow = useSelector(getIsFollow);
  const isRequested = useSelector(getIsRequested);
  const isSent = useSelector(getIsSent);
  const loading = useSelector(getIndividualSettingLoading);

  const userSettingMenu = (
    <Menu>
      <DropdownMenuItem
        key={`${userSettingMenuKey}-0`}
        itemKey={`${userSettingMenuKey}-0`}
        title={<SmallTitleStyled>Thông tin cá nhân</SmallTitleStyled>}
        icon={<SmallIconStyled className="fas fa-user-edit"></SmallIconStyled>}
        onClick={() => dispatch(toggleInformationFormModalVisible(true))}
      />
      <DropdownMenuItem
        key={`${userSettingMenuKey}-1`}
        itemKey={`${userSettingMenuKey}-1`}
        title={<SmallTitleStyled>Đổi mật khẩu</SmallTitleStyled>}
        icon={<SmallIconStyled className="fas fa-lock"></SmallIconStyled>}
        onClick={() => dispatch(toggleChangePasswordFormModalVisible(true))}
      />
    </Menu>
  );
  return (
    <Fragment>
      {isCurrentUser && (
        <Tooltip title="Cài đặt tường nhà">
          <RectangleSettingButtonStyled
            onClick={() => dispatch(toggleWallSettingFormModalVisible(true))}
          >
            <MediumTitleStyled> Cài đặt tường nhà</MediumTitleStyled>
          </RectangleSettingButtonStyled>
        </Tooltip>
      )}
      {isCurrentUser && (
        <Tooltip title="Cài đặt tài khoản">
          <Dropdown trigger={["click"]} overlay={userSettingMenu}>
            <RectangleSettingButtonStyled>
              <MediumIconStyled className="fas fa-user-cog"></MediumIconStyled>
            </RectangleSettingButtonStyled>
          </Dropdown>
        </Tooltip>
      )}

      {!isCurrentUser && !isFollow && (
        <Spin spinning={loading}>
          <Tooltip title="Theo dõi">
            <RectangleSettingButtonStyled
              onClick={() => dispatch(followUserSaga({ wallUserId }))}
            >
              <MediumIconStyled className="fas fa-plus-square"></MediumIconStyled>
            </RectangleSettingButtonStyled>
          </Tooltip>
        </Spin>
      )}
      {!isCurrentUser && isFollow && (
        <Spin spinning={loading}>
          <Tooltip
            title="Hủy theo dõi"
            onClick={() => dispatch(unFollowUserSaga({ wallUserId }))}
          >
            <RectangleSettingButtonStyled>
              <MediumIconStyled className="fas fa-minus-square"></MediumIconStyled>
            </RectangleSettingButtonStyled>
          </Tooltip>
        </Spin>
      )}
      {!isCurrentUser && isFriend && (
        <Spin spinning={loading}>
          <Tooltip title="Hủy kết bạn">
            <RectangleSettingButtonStyled
              onClick={() => {
                dispatch(setShowCancelFriendConfirmModal(true));
              }}
            >
              <MediumIconStyled className="fas fa-user-times"></MediumIconStyled>
            </RectangleSettingButtonStyled>
          </Tooltip>
        </Spin>
      )}
      {!isCurrentUser && !isFriend && !isSent && !isRequested && (
        <Spin spinning={loading}>
          <Tooltip title="Kết bạn">
            <RectangleSettingButtonStyled
              onClick={() => dispatch(sendFriendRequestSaga({ wallUserId }))}
            >
              <MediumIconStyled className="fas fa-user-plus"></MediumIconStyled>
            </RectangleSettingButtonStyled>
          </Tooltip>
        </Spin>
      )}

      {!isCurrentUser && !isFriend && isSent && !isRequested && (
        <Spin spinning={loading}>
          <Tooltip title="Hủy yêu cầu kết bạn">
            <RectangleSettingButtonStyled
              onClick={() => dispatch(cancelFriendSentSaga({ wallUserId }))}
            >
              <MediumIconStyled className="fas fa-times"></MediumIconStyled>
            </RectangleSettingButtonStyled>
          </Tooltip>
        </Spin>
      )}
      {!isCurrentUser && !isFriend && !isSent && isRequested && (
        <Spin spinning={loading}>
          <Tooltip title="Từ chối yêu cầu">
            <RectangleSettingButtonStyled
              onClick={() => {
                dispatch(cancelFriendRequestedSaga({ wallUserId }));
              }}
            >
              <MediumIconStyled className="fas fa-times"></MediumIconStyled>
            </RectangleSettingButtonStyled>
          </Tooltip>
        </Spin>
      )}
      {!isCurrentUser && !isFriend && !isSent && isRequested && (
        <Spin spinning={loading}>
          <Tooltip title="Chấp nhận yêu cầu">
            <RectangleSettingButtonStyled
              onClick={() => {
                dispatch(acceptFriendRequestedSaga({ wallUserId }));
              }}
            >
              <MediumIconStyled className="fas fa-check"></MediumIconStyled>
            </RectangleSettingButtonStyled>
          </Tooltip>
        </Spin>
      )}
    </Fragment>
  );
};
//dành cho type = group
const GroupWall = ({ isManager, isMember, isSent, isRequested, groupId }) => {
  const dispatch = useDispatch();
  const loading = useSelector(getGroupWallSettingLoading);
  const joinGroupLoading = useSelector(getJoinGroupRequestLoading);
  const cancelJoinGroupRequestLoading = useSelector(
    getCancelJoinGroupRequestLoading
  );

  const groupSettingMenu = (
    <Menu>
      <DropdownMenuItem
        key={`${groupSettingMenuKey}-0`}
        itemKey={`${groupSettingMenuKey}-0`}
        title={<SmallTitleStyled>Thay đổi thông tin</SmallTitleStyled>}
        icon={<SmallIconStyled className="fas fa-users-cog"></SmallIconStyled>}
        onClick={() => dispatch(toggleEditGroupInformationsModalVisible(true))}
      />
      <DropdownMenuItem
        key={`${groupSettingMenuKey}-1`}
        itemKey={`${groupSettingMenuKey}-1`}
        title={<SmallTitleStyled>Giải tán nhóm</SmallTitleStyled>}
        icon={<SmallIconStyled className="fas fa-user-slash"></SmallIconStyled>}
        onClick={() => dispatch(toggleDeleteGroupConfirmModalVisible(true))}
      />
    </Menu>
  );
  return (
    <Fragment>
      {isManager && (
        <Tooltip title="Cài đặt nhóm">
          <Dropdown trigger={["click"]} overlay={groupSettingMenu}>
            <RectangleSettingButtonStyled>
              <MediumIconStyled className="fas fa-cog"></MediumIconStyled>
            </RectangleSettingButtonStyled>
          </Dropdown>
        </Tooltip>
      )}

      {isMember && (
        <Tooltip title="Mời">
          <RectangleSettingButtonStyled
            onClick={() => dispatch(toggleInviteUserModalVisible(true))}
          >
            <MediumIconStyled className="fas fa-user-plus"></MediumIconStyled>
          </RectangleSettingButtonStyled>
        </Tooltip>
      )}
      {isMember && !isManager && (
        <Tooltip title="Rời nhóm">
          <RectangleSettingButtonStyled
            onClick={
              loading
                ? () => {}
                : () => dispatch(toggleOutGroupConfirmModalVisible(true))
            }
          >
            <MediumIconStyled className="fas fa-sign-out-alt"></MediumIconStyled>
          </RectangleSettingButtonStyled>
        </Tooltip>
      )}

      {!isMember && !isSent && (
        <Spin spinning={joinGroupLoading}>
          <Tooltip title="Tham gia nhóm">
            <RectangleSettingButtonStyled
              onClick={
                loading ? () => {} : () => dispatch(joinGroupSaga({ groupId }))
              }
            >
              {/* <MediumIconStyled className="fas fa-sign-in-alt"></MediumIconStyled> */}
              <MediumTitleStyled> Tham gia nhóm</MediumTitleStyled>
            </RectangleSettingButtonStyled>
          </Tooltip>
        </Spin>
      )}
      {!isMember && isSent && (
        <Spin spinning={cancelJoinGroupRequestLoading}>
          <Tooltip title="Hủy yêu cầu">
            <RectangleSettingButtonStyled
              onClick={
                loading
                  ? () => {}
                  : () => dispatch(cancelJoinGroupSaga({ groupId }))
              }
            >
              <MediumIconStyled className="fas fa-times"></MediumIconStyled>
            </RectangleSettingButtonStyled>
          </Tooltip>
        </Spin>
      )}
    </Fragment>
  );
};

//type: groups or individual
//isCurrentUser có phải wall của người dùng đang đăng nhập hiện tại không (có khi type="individual")?
//isManager: có phải là người quản lý nhóm không (có khi type = "group")
//wallUserId: id chủ nhân của wall (có khi type="individual")
//userId: id người dùng hiện tại
//groupId: id của nhóm của wall (có khi type="group")
//isSent: có gửi yêu cầu kết bạn chưa ? (đối với individual wall) - có gửi yêu cầu tham gia chưa (đối với group wall)
//isRequested: Có nhận được yêu cầu kết bạn chưa ? (đối với individual wall) - có nhận lời mời tham gia chưa (đối với group wall)
const WallSetting = ({
  type,

  isManager,

  isMember,
  isSent,
  isRequested,

  groupId,
  userId,
}) => {
  return (
    <WallSettingStyled>
      {type === "individual" && <IndividualWall />}
      {type === "groups" && (
        <GroupWall
          isManager={isManager}
          isMember={isMember}
          isSent={isSent}
          isRequested={isRequested}
          groupId={groupId}
        />
      )}
    </WallSettingStyled>
  );
};
export default WallSetting;
