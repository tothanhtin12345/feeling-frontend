import { useState, useEffect, useRef } from "react";
import { Image, Progress, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";

//code của mình
import {
  SmallTitleStyled,
  MediumTitleStyled,
  SmallContentStyled,
} from "../../Styled/Text";
import ListTile from "../../UI/ListTile";
import OnlineAvatar from "../../UI/OnlineAvatar";
import PostInput from "./PostInput";
import {
  RemoveFileIconButtonStyled,
  RectangleButtonStyled,
} from "../../Styled/Button";
import { SmallIconStyled } from "../../Styled/Icon";
import PostUploadFile from "./PostUploadFile";
import {
  PostFormModalStyled,
  PostActionStyled,
  PostMediaStyled,
} from "../../Styled/Post";
import PostTag from "./PostTag";
import AddTagModal from "./AddTagModal";
import SharedPostItem from "./SharedPostItem";
import {
  getUserAvatar,
  getUserInformations,
} from "../../../store/modules/User/selectors";
import {
  getUploadPercent,
  getUploadFilesLoading,
  getPostFiles,
  getPostFilesToShow,
  getPostFilesToDelete,
  getPostLoading,
  getPostContent,
  getEditPostId,
  getEditPostType,
  getEditSharedPost,
  getPostTags,
  getGroupPostId,
} from "../../../store/modules/PostForm/selectors";
import {
  deleteFile,
  deleteFileToShow,
  appendFilesToDelete,
  reset,
  appendTag,
  removeTag,
} from "../../../store/modules/PostForm/slice";
import CenterSpin from "../../UI/CenterSpin";

//onSubmit: xảy ra khi người dùng nhấn vào nút Button cuối cùng
//showAddTag (bool): có thêm chức năng gắn thẻ không
//showUploadMedia (bool): có thêm chức năng upload file không

//sharedPost: sẽ có, khi thực chức năng chia sẻ bài viết
const PostFormModal = ({
  visible,
  onCancel,
  onSubmit,
  title = "Tạo bài viết",
  buttonTitle = "Đăng bài",
  showAddTag = true,
  showUploadMedia = true,
  //bài viết dùng để chia sẻ
  sharedPost,
}) => {
  //percentUpload là giá trị percent đang upload lên server
  //có thể dùng nó để khóa cái button lại

  const [tagModalVisible, setTagModalVisible] = useState(false);
  //những thẻ đã gắn
  const tags = useSelector(getPostTags);

  //ref cho input
  const textInputRef = useRef(null);

  const avatar = useSelector(getUserAvatar);

  const informations = useSelector(getUserInformations);
  const { displayName } = informations;

  const dispatch = useDispatch();

  //các thông tin upload files
  const files = useSelector(getPostFiles);
  const filesToShow = useSelector(getPostFilesToShow);
  const filesToDelete = useSelector(getPostFilesToDelete);
  const filesUploadLoading = useSelector(getUploadFilesLoading);
  const filesUploadPercent = useSelector(getUploadPercent);
  const postLoading = useSelector(getPostLoading);
  const postContent = useSelector(getPostContent);
  const editPostId = useSelector(getEditPostId);
  const editPostType = useSelector(getEditPostType);
  const editSharedPost = useSelector(getEditSharedPost);
  const groupPostId = useSelector(getGroupPostId);

  //nội dung của bài post
  const [content, setContent] = useState(postContent);

  //hàm xóa file đã upload lên view
  //nếu file có _id => đang dùng chức năng chỉnh sửa bài viết
  const handleRemoveFile = (_id, uid, fileUrl, path) => {
    //xóa khỏi mảng files to show
    dispatch(deleteFileToShow(fileUrl));
    //nếu file có _id => đang dùng chức năng chỉnh sửa => không xóa trong mảng file upload
    //mà thêm thông tin file vào mảng để xóa và để xóa trên server
    if (_id) {
      dispatch(appendFilesToDelete({ _id, path }));
    }
    //ngược lại nếu có uid => đây là một file ở dạng blob => ta đơn giản chỉ cần xóa nó ra khỏi mảng để upload
    else if (uid) {
      dispatch(deleteFile(uid));
    }
  };

  //hàm toggle modal gắn thẻ
  const handleToggleAddTagModal = () => {
    setTagModalVisible(!tagModalVisible);
  };

  //hàm nhấn gắn thẻ xong
  const handleAddTagFinish = () => {
    //gọi toggle để đóng modal add tag
    handleToggleAddTagModal();
  };

  //hàm khi chọn một người bạn thành tag từ AddTagModal
  const handleAddTag = ({ friend }) => {
    dispatch(appendTag(friend));
  };
  //hàm khi bỏ chọn một tag
  //nhận vào một _id của friend
  const handleRemoveTag = ({ _id }) => {
    dispatch(removeTag(_id));
  };

  //hàm xử lý tags thành text để hiển thị ở phần title
  const handleTagsText = () => {
    if (tags.length <= 0) {
      return "";
    }

    let tagsText = " cùng với ";
    // còn dư bao nhiêu người nữa ? sẽ được tăng nếu tags > 2
    let countLeftTags = 0;
    tags.forEach((friend, index) => {
      //example: cùng với Thanh Tín
      if (index === 0) {
        tagsText += `${friend.informations.displayName}`;
      }
      //nếu index = 1 và tags có dộ lớn chỉ = 2 thì cộng thêm và "tên người còn lại"
      //example: và Thanh Toàn
      else if (index === 1 && tags.length <= 2) {
        tagsText += ` và ${friend.informations.displayName}`;
      }
      //ngược lại nếu độ dài lớn hơn 2 thì cộng dồn số người còn lại để hiển thị
      else {
        countLeftTags += 1;
      }
    });
    //nếu số tags còn dư lại > 0 thì mới thực hiện cộng chuỗi vào
    if (countLeftTags > 0) {
      tagsText += ` và ${countLeftTags} người khác `;
    }
    return tagsText;
  };

  //hàm xử lý khi content thay đổi
  const handleContentChange = (text) => {
    setContent(text);
  };

  //khi nhấn nút button để nộp form
  const handleSubmitPostForm = () => {
    //nếu không phải bài viết chia sẻ và cũng không có đầy đủ thông tin thì không thực hiện gì cả
    // if (!sharedPost && content.trim().length <= 0 && files.length <= 0) return;

    //lấy các _id trong tags ra
    const tagsId = [];
    tags.forEach((item) => tagsId.push(item._id));

    //bổ sung các thông tin ở đây
    onSubmit({
      content,
      tags: tagsId,
      files,
      filesToDelete,
      //sẽ có giá trị nếu đang dùng chức năng chỉnh sửa bài post
      editPostId,
      //group nào đăng bài ?
      groupPostId,
    });
    //reset text input
    textInputRef.current.innerHTML = "";
    setContent("");
  };

  //hàm xử lý khi nhấn đóng modal
  const handleCancelModal = () => {
    if (filesUploadLoading || postLoading) {
      return;
    }
    //nếu bài post có bài share thì cứ thực hiện onCancel
    if (sharedPost) {
      onCancel();
      return;
    }
    if (
      files.length > 0 ||
      filesToDelete.length > 0 ||
      content.trim().length > 0 ||
      tags.length > 0 ||
      editPostId
    ) {
      Modal.confirm({
        title: "Lưu ý",
        content: editPostId
          ? "Bạn muốn ngừng việc chỉnh sửa bài đăng ?"
          : "Các thông tin chưa được lưu lại, bạn thật sự muốn đóng ?",
        zIndex: 10010,
        okText: "Xác nhận",
        cancelText: "Hủy",
        //reset state nếu người dùng đồng ý đồng
        onOk: () => {
          textInputRef.current.innerHTML = "";
          setContent("");
          dispatch(reset());

          //gọi hàm đóng form
          onCancel();
        },
      });
    } else {
      onCancel();
    }
  };

  //useEffect dùng để set giá trị content của bài viết được chỉnh sửa vào input form
  useEffect(() => {
    if (content.trim().length) {
      textInputRef.current.innerHTML = content;
    }
  }, [visible]);

  return (
    <PostFormModalStyled
      zIndex={10004}
      onCancel={handleCancelModal}
      title={<MediumTitleStyled>{title}</MediumTitleStyled>}
      visible={visible}
      footer={null}
    >
      <div>
        <ListTile
          showAction={false}
          title={
            <SmallTitleStyled>
              {displayName}
              {/* Nếu có gắn thẻ thì hiển thị lên views ngay phần title này */}
              {tags.length > 0 && (
                <SmallTitleStyled
                  style={{ cursor: "pointer" }}
                  onClick={handleToggleAddTagModal}
                >
                  {handleTagsText()}
                </SmallTitleStyled>
              )}
            </SmallTitleStyled>
          }
          subTitle={<SmallContentStyled>Công khai</SmallContentStyled>}
          avatar={
            <OnlineAvatar
              avatar={avatar ? avatar.files[0].fileUrl : null}
              size={40}
            />
          }
        />
      </div>
      <div className="post-input-area">
        <PostInput
          content={content}
          onContentChange={handleContentChange}
          textInputRef={textInputRef}
        />
        {/* Khu vực chứa hình được upload */}
        <PostMediaStyled>
          {filesToShow.map((file, index) => {
            return (
              <div className="file-item" key={file.fileUrl + index}>
                {file.fileType === "video" && (
                  <video controls>
                    <source src={file.fileUrl} type="video/mp4" />
                  </video>
                )}
                {file.fileType === "image" && (
                  <Image preview={false} src={file.fileUrl} />
                )}
                {editPostType !== "system" && editPostType !== "groups-system" && (
                  <div className="remove-file">
                    <RemoveFileIconButtonStyled
                      icon={
                        <SmallIconStyled className="fas fa-times"></SmallIconStyled>
                      }
                      onClick={handleRemoveFile.bind(
                        null,
                        file._id,
                        file.uid,
                        file.fileUrl,
                        file.path
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </PostMediaStyled>

        {/* Bài viết được chia sẻ - sẽ có nếu có tồn tại sharedPost */}
        {sharedPost && <SharedPostItem sharedPost={sharedPost} />}
        {/* hoặc nếu chỉnh sửa một bài viết có share thì sẽ có editSharedPost - editSharedPost này chỉ là để hiển thị cho đầy đủ thông tin */}
        {editSharedPost && <SharedPostItem sharedPost={editSharedPost} />}
      </div>

      <div>
        {/* Thanh hiển thị phần trăm upload - xuất hiện khi % > 0 */}
        {filesUploadPercent > 0 && <Progress percent={filesUploadPercent} />}
        {(showAddTag || showUploadMedia) && editPostType !== "system" && editPostType !== "groups-system" && (
          <PostActionStyled>
            <div className="action-title">
              <SmallTitleStyled>Thêm vào bài viết</SmallTitleStyled>
            </div>
            <div className="action-content">
              {showUploadMedia && !editSharedPost && (
                <PostUploadFile loading={filesUploadLoading} />
              )}
              {showAddTag && <PostTag onClick={handleToggleAddTagModal} />}
            </div>
          </PostActionStyled>
        )}
      </div>
      <div className="button-area">
        <RectangleButtonStyled
          disabled={
            (!sharedPost &&
              !editPostId &&
              content.trim().length <= 0 &&
              files.length <= 0) ||
            (editPostId &&
              (content.trim().length <=0 &&filesToShow.length <= 0) &&
              ((filesToDelete.length <= 0) ||
                (filesToDelete.length > 0 && filesToShow.length <= 0)))
          }
          style={{ width: "100%" }}
          onClick={handleSubmitPostForm}
        >
          <MediumTitleStyled color="#FFFFFF">{buttonTitle}</MediumTitleStyled>
        </RectangleButtonStyled>
      </div>
      {
        <AddTagModal
          visible={tagModalVisible}
          onFinish={handleAddTagFinish}
          tags={tags}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
        />
      }
      {postLoading && (
        <CenterSpin backgroundcolor="rgba(0, 0, 0, 0.45)" size="large" />
      )}
    </PostFormModalStyled>
  );
};
export default PostFormModal;
