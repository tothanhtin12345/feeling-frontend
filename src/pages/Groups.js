import { useMemo, useEffect, useState } from "react";
import { Switch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//code của mình
import {
  getGroupDetails,
  getGroupDetailsError,
  getGroupDetailsLoading,
  getEditGroupInformationsModalVisible,
  getGroupIsMember,
  getIsInspector,
  getIsManager,
  getGroupsPostFirstLoad,
} from "../store/modules/Groups/selectors";
import {
  fetchGroupDetailsSaga,
  reset,
  toggleEditGroupInformationsModalVisible,
  
} from "../store/modules/Groups/slice";
import { updateGroupInformationsSaga } from "../store/modules/GroupDashboardManaging/slice";
import PrivateRoutes from "../routes/PrivateRoutes";
import WallPrefix from "../components/Wall/WallPrefix/WallPrefix";
import WallSetting from "../components/Wall/WallPrefix/WallSetting";
import useGetParamOnPath from "../hooks/url/useGetParamOnPath";
import GroupsTimeline from "../components/Groups/GroupsTimeline";
import GroupsMember from "../components/Groups/GroupsMembers/GroupsMembers";
import NotFoundPage from "./Error/NotFoundPage";
import CenterSpin from "../components/UI/CenterSpin";
import { uploadGroupCoverSaga } from "../store/modules/WallPrefix/slice";
import NewGroupModal from "../components/GroupsDashboard/GroupsDashboardManaging/NewGroupModal";
import InviteUserToGroupFormModal from "../components/Groups/InviteUserToGroupFormModal";
import { getInviteUserToGroupFormModalVisible } from "../store/modules/InviteUserToGroupForm/selectors";
import {
  toggleOutGroupConfirmModalVisible,
  outGroupSaga,
  toggleDeleteGroupConfirmModalVisible,
  deleteGroupSaga,
} from "../store/modules/GroupWallSetting/slice";
import {
  getOutGroupConfirmModalVisible,
  getOutGroupLoading,
  getDeleteGroupConfirmModalVisible,
  getDeleteGroupLoading,
} from "../store/modules/GroupWallSetting/selectors";

import ConfirmModal from "../components/UI/ConfirmModal";

import {
  fetchJoinGroupRequestListSaga,
  reset as resetJoiningGroupRequest,
} from "../store/modules/JoinGroupRequestList/slice";
import {
  fetchGroupMembersSaga,
  reset as resetGroupMember,
} from "../store/modules/GroupMembers/slice";
import {
  addGroupRequest,
  deleteGroupRequest,
} from "../store/modules/JoinGroupRequestList/slice";
import socket from "../utils/socket/socket";
import { getUserId } from "../store/modules/User/selectors";
import { fetchGroupPostSaga,setGroupPostFirstLoad  } from "../store/modules/Groups/slice";

import {setGroupPostId} from "../store/modules/PostForm/slice";


//dữ liệu giả về một wall của một người dùng

//children là một Switch để hiển thị các thông tin nhỏ hơn theo path
//gốc url là /wall/userId
const Groups = ({ children }) => {
  const { id: groupId } = useParams();

  const [refreshDetails, setRefreshDetails] = useState(false);

  const dispatch = useDispatch();

  const userId = useSelector(getUserId);

  const groupDetails = useSelector(getGroupDetails);
  const groupDetailsError = useSelector(getGroupDetailsError);
  const groupDetailsLoading = useSelector(getGroupDetailsLoading);
  const isMember = useSelector(getGroupIsMember);
  const isManager = useSelector(getIsManager);
  const isInSpector = useSelector(getIsInspector);
  const firstLoad = useSelector(getGroupsPostFirstLoad);

  const outGroupLoading = useSelector(getOutGroupLoading);
  const outGroupConfirmModalVisible = useSelector(
    getOutGroupConfirmModalVisible
  );

  const deleteGroupLoading = useSelector(getDeleteGroupLoading);
  const deleteGroupConfirmModalVisible = useSelector(
    getDeleteGroupConfirmModalVisible
  );

  //có hiển thị form mời user vào nhóm không ?
  const inviteUserToGroupFormModalVisible = useSelector(
    getInviteUserToGroupFormModalVisible
  );

  //giá trị hiển thị form chỉnh sửa thông tin nhóm
  const editGroupInformationModalVisible = useSelector(
    getEditGroupInformationsModalVisible
  );

  //ta lấy params tại vị trí 2 là id của người dùng
  const paramOnPath = useGetParamOnPath({ index: 2 });
  //ta tạo một path nguyên gốc để tiếp tục dẫn các path khác
  const originPath = `/groups/${paramOnPath}`;

  //có đang gửi lời yêu cầu tham gia chưa ?

  //tiến hành lấy chi tiết nhóm theo id của nhóm
  useEffect(() => {
    //
    dispatch(fetchGroupDetailsSaga({ id: groupId }));
     //thiết lập giá trị group id sẽ post bài cho post form (cần thiết cho việc thêm thông tin một bài post được thêm từ group)
     dispatch(setGroupPostId(groupId));

     if(isMember === true){
      dispatch(fetchGroupPostSaga({groupId}));
 
      dispatch(setGroupPostFirstLoad(true));
     }
   
     
 
  

    return () => {
      dispatch(reset());
      dispatch(setGroupPostId(null));
    };
  }, [groupId, refreshDetails]);

  useEffect(() => {
    if (isMember === true) {
      dispatch(fetchGroupMembersSaga({ displayName: "", groupId }));

      if(isInSpector === true || isManager === true){
        dispatch(fetchJoinGroupRequestListSaga({ displayName: "", groupId }));
      }
     
      
    }

    return () => {
      dispatch(resetGroupMember());
      dispatch(resetJoiningGroupRequest());
    };
  }, [groupId, isMember, isInSpector, isManager]);

  useEffect(() => {
    //kết nối socket đến group
    socket.on(`${groupId}`, ({ type, data }) => {
      //có yêu cầu tham gia nhóm
      if (type === "group_request") {
        dispatch(addGroupRequest({ ...data }));
      }
      //lời yêu cầu tham gia đến group bị người yêu cầu hủy
      else if (type === "group_request_cancel") {
        dispatch(deleteGroupRequest({ ...data }));
      }
    });

    //kết nối đến socket đến group cho người dùng hiện tại đang truy cập group
    socket.on(`${userId}-${groupId}`, ({ type, data = {} }) => {
      //được chấp nhận vào nhóm
      if (type === "group_accept") {
        //refresh lại trang
        setRefreshDetails(true);
      }
    });

    return () => {
      socket.off(`${groupId}`);
      socket.off(`${userId}-${groupId}`);
    };
  }, [groupId, userId]);

  //danh sách các navigation items cho phần wall
  //nếu là thành viên thì mới hiện mấy thông tin ở dưới này
  let navigationItems = [];

  //ta sẽ fetch người dùng được chọn ở đây thông qua userId

  //hàm xử lý khi ảnh bìa của group được up lên hiển htij
  const handleUploadImage = (fakeImage) => {
    const { fileUpload, type } = fakeImage;
    const postData = {
      files: [fileUpload],
      type: "groups-system",
      privacy: "groups",
      title: "đã cập nhật ảnh bìa",
      //update hình ảnh này cho ảnh bìa của nhóm
      updateFor: "group-cover",
      //thêm id của nhóm
      groupId: groupId,
    };

    //ta dùng module wall prefix để update cover
    dispatch(uploadGroupCoverSaga(postData));
  };

  //hàm xử lý khi nộp form chỉnh sửa thông tin nhóm
  const handleSubmitEditGroupInformationForm = (values) => {
    //thêm thông tin group id
    values.groupId = groupDetails._id;
    //ta sẽ gọi qua module redux của thằng NewGroupModal để xử lý luôn cho tiện
    dispatch(updateGroupInformationsSaga(values));
  };

  //hàm xử lý khi đóng cái form chỉnh sửa thông tin nhóm
  const handleCancelEditGroupInformationModal = () => {
    dispatch(toggleEditGroupInformationsModalVisible(false));
  };

  //nếu server không tìm thấy group thì trả về page not found
  if (groupDetailsError && groupDetailsError.code === "ERROR_NOT_FOUND") {
    return <NotFoundPage />;
  }

  //nếu không có group và không load thì trả về một div trống
  if (!groupDetails && !groupDetailsLoading) {
    return <div></div>;
  }

  //nếu không có group và đang load thì trả về một spin
  if (!groupDetails && groupDetailsLoading) {
    return <CenterSpin />;
  }

  if (groupDetails.isMember) {
    navigationItems = [
      {
        title: "Bài viết",
        path: `${originPath}`,
        exact: true,
      },
      {
        title: "Thành viên",
        path: `${originPath}/members`,
        exact: false,
      },
    ];
  }

  return (
    <div style={{ marginBottom: "32px" }}>
      <div style={{ backgroundColor: "#FFFFFF" }}>
        <WallPrefix
          wallSetting={
            <WallSetting
              type="groups"
              isMember={groupDetails.isMember}
              isManager={groupDetails.isManager}
              isSent={groupDetails.isSent}
              groupId={groupDetails._id}
            />
          }
          type="groups"
          navigationItems={navigationItems}
          groupsInformation={{
            memberCount: groupDetails.memberCount,
            privacy: groupDetails.privacy,
            members: groupDetails.members,
          }}
          {...groupDetails}
          isManager={groupDetails.isManager}
          onUploadImage={handleUploadImage}
        />
      </div>
      {/* Nếu là thành viên thì mới hiện các thông tin bên dưới */}
      {groupDetails.isMember && (
        <div style={{ padding: "0px 20px" }}>
          <Switch>
            <PrivateRoutes
              path={["/groups/:id/members", "/groups/:id/members/requested"]}
              exact={true}
              component={GroupsMember}
            />
            <PrivateRoutes
              path="/groups/:id/"
              exact={true}
              component={GroupsTimeline}
            />
          </Switch>
        </div>
      )}
      <NewGroupModal
        type="edit"
        visible={editGroupInformationModalVisible}
        onCancel={handleCancelEditGroupInformationModal}
        onSubmit={handleSubmitEditGroupInformationForm}
        groupDes={groupDetails.informations?.description}
        groupName={groupDetails.informations?.displayName}
      />
      {inviteUserToGroupFormModalVisible && (
        <InviteUserToGroupFormModal
          groupId={groupId}
          visible={inviteUserToGroupFormModalVisible}
        />
      )}
      {outGroupConfirmModalVisible && (
        <ConfirmModal
          title="Xác nhận rời nhóm"
          content="Bạn có chắc là muốn rời nhóm này không ?"
          loading={outGroupLoading}
          onCancel={() => {
            dispatch(toggleOutGroupConfirmModalVisible(false));
          }}
          onConfirm={() => {
            dispatch(outGroupSaga({ groupId }));
          }}
        />
      )}

      {deleteGroupConfirmModalVisible && (
        <ConfirmModal
          title="Xác nhận xóa nhóm"
          content="Bạn chỉ có thể xóa nhóm nếu nhóm ít hơn 10 thành viên và toàn bộ dữ liệu về nhóm sẽ bị xóa mất. Bạn có chắc còn muốn xóa nhóm không ?"
          loading={deleteGroupLoading}
          onCancel={() => {
            dispatch(toggleDeleteGroupConfirmModalVisible(false));
          }}
          onConfirm={() => {
            dispatch(deleteGroupSaga({ groupId }));
          }}
        />
      )}
    </div>
  );
};
export default Groups;
