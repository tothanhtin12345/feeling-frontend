import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

//code của mình
import PrivateRoutes from "../routes/PrivateRoutes";
import WallPrefix from "../components/Wall/WallPrefix/WallPrefix";
import WallSetting from "../components/Wall/WallPrefix/WallSetting";
import useGetParamOnPath from "../hooks/url/useGetParamOnPath";
import WallSettingFormModal from "../components/Wall/WallPrefix/WallSettingFormModal";
import { getWallSettingFormModalVisible } from "../store/modules/Wall/selectors";
import { getUserId } from "../store/modules/User/selectors";
import { resetWall, fetchWallUserSaga } from "../store/modules/Wall/slice";
import {
  getWallUserLoading,
  getWallError,
  getWallUserAvatar,
  getWallUserCover,
  getWallUserInformations,
  getIsCurrentUser,
  getWallPostFirstLoad,
} from "../store/modules/Wall/selectors";
import {
  uploadAvatarSaga,
  uploadCoverSaga,
} from "../store/modules/WallPrefix/slice";
import NotFoundPage from "../pages/Error/NotFoundPage";
import CenterSpin from "../components/UI/CenterSpin";
import WallTimeline from "../components/Wall/WallTimeline/WallTimeline";
import Photos from "../components/Wall/Photos";
import WallFriends from "../components/Wall/WallFriends";
import {
  getShowCancelFriendConfirmModal,
  getIndividualSettingLoading,
} from "../store/modules/IndividualSetting/selectors";
import {
  setShowCancelFriendConfirmModal,
  cancelFriendSaga,
} from "../store/modules/IndividualSetting/slice";
import ConfirmModal from "../components/UI/ConfirmModal";

import {
  fetchFriendsSaga,
  reset as resetFriendList,
} from "../store/modules/FriendList/slice";
import {
  fetchfriendsSentSaga,
  reset as resetFriendSent,
} from "../store/modules/FriendSentList/slice";
import {
  fetchFriendsRequestedSaga,
  reset as resetFriendRequest,
} from "../store/modules/FriendRequestedList/slice";

//children là một Switch để hiển thị các thông tin nhỏ hơn theo path
//gốc url là /wall/userId
const Wall = ({ children }) => {
  const dispatch = useDispatch();

  const wallSettingFormModalVisible = useSelector(
    getWallSettingFormModalVisible
  );

  const wallUerLoading = useSelector(getWallUserLoading);
  const wallError = useSelector(getWallError);
  const wallUserAvatar = useSelector(getWallUserAvatar);
  const wallUserCover = useSelector(getWallUserCover);
  const wallUserInformations = useSelector(getWallUserInformations);
  const isCurrentUser = useSelector(getIsCurrentUser);
  const firstLoad = useSelector(getWallPostFirstLoad);
  const wallSettingLoading = useSelector(getIndividualSettingLoading);
  const showCancelFriendConfirmModal = useSelector(
    getShowCancelFriendConfirmModal
  );

  //ta lấy params tại vị trí 2 là id của người dùng
  const paramOnPath = useGetParamOnPath({ index: 2 });
  //ta tạo một path nguyên gốc để tiếp tục dẫn các path khác
  const originPath = `/wall/${paramOnPath}`;

  //id của người dùng đang đăng nhập
  const userId = useSelector(getUserId);

  //lấy id (id của người dùng) trên path
  const wallUserId = paramOnPath;

  //danh sách các navigation items cho phần wall
  const navigationItems = [
    {
      title: "Bài viết",
      path: `${originPath}`,
      exact: true,
    },
    {
      title: "Bạn bè",
      path: `${originPath}/friends`,
      exact: false,
    },
    {
      title: "Ảnh",
      path: `${originPath}/photos`,
      exact: true,
    },
  ];

  useEffect(() => {
    //lấy chi tiết dữ liệu của một user
    dispatch(fetchWallUserSaga(wallUserId));

    //reset state khi id của người dùng wall thay đổi
    return () => {
      dispatch(resetWall());
    };
  }, [wallUserId]);

  //lấy danh sách bạn bè của user
  useEffect(() => {
    dispatch(fetchFriendsSaga({ displayName: "", userId: wallUserId }));
    dispatch(
      fetchFriendsRequestedSaga({ displayName: "", userId: wallUserId })
    );
    dispatch(fetchfriendsSentSaga({ displayName: "", userId: wallUserId }));
    return () => {
      dispatch(resetFriendList());
      dispatch(resetFriendRequest());
      dispatch(resetFriendSent());
    };
  }, [wallUserId]);

  //hàm xử lý upload ảnh đại diện hoặc ảnh cover (bìa) lên server
  const handleUploadImage = (fakeImage) => {
    //fakeImage: bao gồm
    //fileUrl: để hiển thị lúc ban đầu lên view (k cần nữa)
    //type: image hoặc cover
    //fileUpload: file để upload

    //tiến hành tạo một bài post để upload lên server (vì ảnh đại diện hay ảnh bìa nhìn chung cũng là một bài post)

    const { fileUpload, type } = fakeImage;
    const postData = {
      files: [fileUpload],
      type: "system",
      privacy: "public",
      title:
        type === "avatar" ? "đã cập nhật ảnh đại diện" : "đã cập nhật ảnh bìa",
      //update hình ảnh này cho avatar hoặc cover
      updateFor: type,
    };
    if (type === "avatar") {
      dispatch(uploadAvatarSaga(postData));
    }
    if (type === "cover") {
      dispatch(uploadCoverSaga(postData));
    }
  };

  //nếu server không tìm thấy người dùng thì trả về page not found
  if (wallError && wallError.code === "ERROR_USER_NOT_FOUND") {
    return <NotFoundPage />;
  }

  //nếu không có user và không load thì trả về một div trống
  if (!wallUserInformations && !wallUerLoading) {
    return <div></div>;
  }

  //nếu không có user và đang load thì trả về một spin
  if (!wallUserInformations && wallUerLoading) {
    return <CenterSpin />;
  }

  //ta sẽ fetch người dùng được chọn ở đây thông qua wallUserId

  return (
    <div style={{ marginBottom: "32px" }} id="posts-list-wrapper">
      <div style={{ backgroundColor: "#FFFFFF" }}>
        <WallPrefix
          wallSetting={<WallSetting type="individual" userId={userId} />}
          avatar={wallUserAvatar}
          cover={wallUserCover}
          displayName={wallUserInformations.displayName}
          isCurrentUser={isCurrentUser}
          navigationItems={navigationItems}
          showAvatarImage={true}
          onUploadImage={handleUploadImage}
        />
      </div>

      <div style={{ padding: "0px 20px" }}>
        <Switch>
          <Route path="/wall/:id/" exact={true}>
            <WallTimeline wallUserId={wallUserId} />
          </Route>
          <PrivateRoutes
            path="/wall/:id/photos"
            exact={true}
            component={Photos}
          />
          <PrivateRoutes
            path={[
              "/wall/:id/friends",
              "/wall/:id/friends/requested",
              "/wall/:id/friends/sent",
            ]}
            exact={true}
            component={WallFriends}
          />
        </Switch>
      </div>

      {/* Cái form modal cài đặt tường nhà */}
      {wallSettingFormModalVisible && (
        <WallSettingFormModal visible={wallSettingFormModalVisible} />
      )}
      {showCancelFriendConfirmModal && (
        <ConfirmModal
          title="Xác nhận hủy kết bạn"
          content="Bạn có chắc là muốn hủy kết bạn với người dùng này ?"
          loading={wallSettingLoading}
          onCancel={() => {
            dispatch(setShowCancelFriendConfirmModal(false));
          }}
          onConfirm={() => {
            dispatch(cancelFriendSaga({ wallUserId }));
          }}
        />
      )}
    </div>
  );
};
export default Wall;
