import { Fragment } from "react";
import { Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
//code của mình
import {
  getPostSelected,
  getSharedPost,
} from "../../../store/modules/Post/selectors";
import { unSetSharedPost } from "../../../store/modules/Post/slice";
import MainHeader from "./Header/MainHeader";
import MainSider from "./MainSider";
import MainContent from "./MainContent";
import MainMenu from "../../UI/MainMenu/MainMenu";
import ChatTab from "../../Chat/ChatTab";

import PostFormModal from "../../Post/PostFormModal/PostFormModal";
import {
  getChangePasswordFormModalVisible,
  getInformationFormModalVisible,
} from "../../../store/modules/User/selectors";
import {
  toggleAddPostFormModalVisible,
  toggleEditPostFormModalVisible,
  addPostSaga,
  editPostSaga,
  sharePostSaga,
  setDeletePostId,
  deletePostSaga
} from "../../../store/modules/PostForm/slice";
import {
  getAddPostFormModalVisible,
  getEditPostFormModalVisible,
  getPostLoading,
  getDeletePostId,
} from "../../../store/modules/PostForm/selectors";
import ChangePasswordFormModal from "../../User/ChangePasswordFormModal";
import InformationFormModal from "../../User/InformationFormModal";
import useRefresh from "../../../hooks/auth/useRefresh";
import { getPathByIndex } from "../../../utils/url";
import ConfirmModal from "../../UI/ConfirmModal";
import useCommonSocket from "../../../hooks/socket/useCommonSocket";
import useGetUnread from "../../../hooks/user/useGetUnread";

import PostPage from "../../../pages/PostPage";


const MainLayout = ({ children, ...props }) => {
  const dispatch = useDispatch();

  const sharedPost = useSelector(getSharedPost);

  //các giá trị liên quan đến post form
  const addPostFormModalVisible = useSelector(getAddPostFormModalVisible);
  const editPostFormModalVisible = useSelector(getEditPostFormModalVisible);
  const deletePostId = useSelector(getDeletePostId);
  const postLoading = useSelector(getPostLoading);
  const postSelected = useSelector(getPostSelected);

  const currentPath = getPathByIndex(1);

  //refresh account hook
  useRefresh();

  //hàm lấy mảng các phòng mà mình chưa đọc tin nhắn (các tin nhắn mà người dùng chưa đọc)
  //việc lấy này tương đối phức tạp, nên ta buộc phải tạo riêng ra một effect để làm điều này
  useGetUnread();

  //khởi động socket
  useCommonSocket();


  

  //hàm xử lý khi nhấn cancel PostFormModal dùng để chia sẻ
  const handleCancelSharedPostModal = () => {
    dispatch(unSetSharedPost());
  };
  //hàm xử lý khi nhấn submit PostFormModal dùng để chia sẻ
  const handleSubmitSharedPostModal = () => {
    //chưa làm gì hết
  };

  //lấy các giá trị liên quan đến user modal
  const changePasswordFormModalVisible = useSelector(
    getChangePasswordFormModalVisible
  );
  const informationFormModalVisible = useSelector(
    getInformationFormModalVisible
  );

  //hàm xử lý khi nhấn vào nút đóng trên PostFormModal - ở chế độ thêm bài post
  const handleCloseAddPostModal = () => {
    dispatch(toggleAddPostFormModalVisible(false));
  };

  //hàm xử lý khi nhấn vào nút đóng trên PostFormModal - ở chế độ chỉnh sửa bài post
  const handleCloseEditPostModal = () => {
    dispatch(toggleEditPostFormModalVisible(false));
  };

  //hàm thực hiện đăng bài mới
  const handleUploadNewPost = ({ tags, content, files, groupPostId }) => {
    console.log(groupPostId)
    //files: chứa các _id của file trong csdl
    //tags: chứa các _id của người dùng
    const newPost = {
      files,
      content,
      tags,
      privacy: currentPath === "groups" ? "groups" : "public",
      type: currentPath === "groups" ? "groups" : "individual",
    };
    //nếu đăng bài cho nhóm thì thông tin id của nhóm đó
    if(newPost.type === "groups"){
      newPost.groupId = groupPostId;
    }
    //tiến hành đăng bài
    dispatch(addPostSaga(newPost));
  };

  //hàm thực hiện chỉnh sửa bài viết
  const handleEditPost = ({
    tags,
    content,
    files,
    filesToDelete,
    editPostId,
  }) => {
    //files: chứa các _id của file trong csdl
    //tags: chứa các _id của người dùng
    const editPost = {
      _id: editPostId,
      files,
      content,
      tags,

      filesToDelete,
    };
    //tiến hành chỉnh sửa bài viết
    dispatch(editPostSaga(editPost));
  };

  //hàm thực hiện chia sẻ bài biết
  const handleSharePost = ({ tags, content }) => {
    const newPost = {
      tags,
      content,
      //lấy ra _id của bài post được chia sẻ
      sharedPost: sharedPost._id,
      privacy: "public",
      type: "share",
    };

    //thực hiện chia sẻ bài viết (có thể hiểu là thực hiện tạo một bài viết mới có đính kèm một bài share)
    dispatch(sharePostSaga(newPost));
  };

  //hàm thực hiện xóa bài viết
  const handleDeletePost = () => {
    dispatch(deletePostSaga(deletePostId));
  }




  return (
    <Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <MainHeader />
        <Layout>
          <MainSider>
            <MainMenu />
          </MainSider>
          <MainContent>{children}</MainContent>
        </Layout>
        <ChatTab />
      </Layout>

      {/* Dùng để hiển thị modal thêm bài post mới */}
      {addPostFormModalVisible && (
        <PostFormModal
          visible={addPostFormModalVisible}
          onCancel={handleCloseAddPostModal}
          title="Tạo bài viết"
          buttonTitle="Đăng bài"
          showAddTag={true}
          showUploadMedia={true}
          onSubmit={handleUploadNewPost}
          showAddTag={currentPath !== "groups"}
        />
      )}

      {/* Dùng để hiển thị modal chỉnh sửa bài post */}
      {editPostFormModalVisible && (
        <PostFormModal
          visible={editPostFormModalVisible}
          onCancel={handleCloseEditPostModal}
          title="Chỉnh sửa bài viết"
          buttonTitle="Cập nhật"
          showAddTag={true}
          showUploadMedia={true}
          onSubmit={handleEditPost}
          showAddTag={currentPath !== "groups"}
        />
      )}

      {/* Hiển thị PostFormModal có kèm bài viết để chia sẻ */}
      {sharedPost && (
        <PostFormModal
          sharedPost={sharedPost}
          visible={true}
          onSubmit={handleSharePost}
          title="Chia sẻ bài viết"
          buttonTitle="Chia sẻ"
          showUploadMedia={false}
          //cancel thì set cho bài sharedPost thành null trong store là được
          onCancel={handleCancelSharedPostModal}
        />
      )}
      {changePasswordFormModalVisible && (
        <ChangePasswordFormModal visible={changePasswordFormModalVisible} />
      )}
      {informationFormModalVisible && (
        <InformationFormModal visible={informationFormModalVisible} />
      )}
      {deletePostId && (
        <ConfirmModal
          title="Xác nhận xóa bài viết"
          content="Bạn chắc chắn muốn xóa bài viết này chứ ?"
          loading={postLoading}
          onCancel={()=>dispatch(setDeletePostId(null))}
          onConfirm={handleDeletePost}
        />
      )}
      {postSelected && <PostPage postSelected={postSelected}/>}
    </Fragment>
  );
};

export default MainLayout;
