import React, { useState, useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import htmlParse from "html-react-parser";
//code của mình
import {
  setPostSelected,
  setSharedPost,
} from "../../../store/modules/Post/slice";
import { CardStlyled } from "../../Styled/Card";
import { MediumContentStyled, SmallContentStyled } from "../../Styled/Text";
import { PostItemStyled } from "../../Styled/Post";
import PostFiles from "./PostFiles";
import PostReview from "./PostReview";
import { DividerStyled } from "../../Styled/Divider";
import PostAction from "./PostAction";
import PostComment from "./PostComment";
import PostItemPrefix from "./PostItemPrefix";
import SharedPostItem from "../PostFormModal/SharedPostItem";
import {
  toggleEditPostFormModalVisible,
  setDeletePostId,
} from "../../../store/modules/PostForm/slice";
import { setEditPost } from "../../../store/modules/PostForm/slice";
import { SmallIconStyled } from "../../Styled/Icon";
import { getUserAvatar } from "../../../store/modules/User/selectors";
import useLikePost from "../../../hooks/post/useLikePost";

//một bài post
//showCommentArea: có hiển thị khu vực comment không (mặc định là không)
const PostItem = React.memo(({ post, showCommentArea = false, ...props }) => {
  const {
    _id,
    title,
    privacy,
    type,

    owner,
    content,
    tags = [],
    files = [],
    commentCount,
    likeCount,
    shareCount,
    comments = [],
    createdAt,
    sharedPost,
    //thông tin group mà một bài post thuộc về
    group,
    isOwner,
    isLike,
    isAdmin,
    isManager,
    commentCanLoad,
    commentSkip,
    //comment Id để bỏ qua khi load thêm comment commentIdIgnore - 
    //sẽ có nếu người dùng dùng chức năng xem chi tiết một bài viết
    commentIdIgnore,
    emotion,
  } = post;
  

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  //mở phần bình luận (chỉ xảy ra từ false - true duy nhất 1 lần)
  //sau khi nhấn nút mở thì sẽ render ra PostComment và load trước một comment ở trong đó
  //lần sau nhấn lại nút mở thì chỉ hiển thị hoặc ẩn đi cái đã render ra
  const [openPostComment, setOpenPostComment] = useState(false);
  //ẩn - hiện phần bình luận
  const [commentsVisible, setCommentsVisible] = useState(showCommentArea);

  //dùng một hook để tương tác với dữ liệu like
  useLikePost({ postId: _id });

  //lấy avatar hiện tại người của người dùng
  const userAvatar = useSelector(getUserAvatar);

  //ẩn hiện phần comments
  const handleCommentButtonClick = () => {
    //kiểm tra xem là phần comment được mởi lần đầu hay chưa ?
    //nếu chưa thì set true để nó được render ra và tải trước một số comment
    //nếu rồi thì không làm gì để tránh bị render lại
    if (!openPostComment) {
      setOpenPostComment(true);
    }
    //đơn giản là ẩn hiện (thông qua thuộc tính display của css) và không ảnh hưởng đến dữ liệu comments đã render ra
    setCommentsVisible(!commentsVisible);
  };

  //hiển thị bài viết chia sẻ khi nhấn vào nút chia sẻ
  const handleShareButtonClick = () => {
    //lấy post hiện tại để set - và hiện post này lên để thực hiện chia sẻ
    //nếu bài viết đang đính kèm một bài share mà người dùng muốn share nữa
    //thì ta sẽ share cái bài share đang đính kèm bên trong
    dispatch(setSharedPost(type === "share" ? sharedPost : post));
  };

  //xử lý khi nhấn vào một file trên bài viết
  //ta sẽ lấy được vị trí của file để dành cho việc hiển thị bài viết ở dạng modal
  const handleFileClick = useCallback(
    (fileIndex) => {
      //tiến hành set post selected
      //nếu bài post hiện tại đính kèm một bài share
      //thì chỉ có bài share đính kèm có file media
      //còn bài hiện tại thì không có
      //nên ta sẽ set hiển thị modal của bài viết được share đính kèm bên trong
      dispatch(
        setPostSelected({
          postId: type === "share" ? sharedPost._id : post._id,
          fileIndex,
        })
      );

      //lưu lại luôn đường dẫn hiện tại để post-page có thể quay lại trang này sau khi bị đóng
      // history.push("/post-page", { from: location.pathname });
    },
    [dispatch, post]
  );

  //hàm xử lý khi nhấn vào nút chỉnh sửa trên một bài post
  const handleEditClick = () => {
    dispatch(toggleEditPostFormModalVisible(true));
    dispatch(setEditPost(post));
  };

  //hàm xử lý khi nhấn vào nút xóa bài viết
  const handleDeleteClick = () => {
    //gắn _id bài viết để xóa => sẽ có hiện thị một modal để xác nhận
    dispatch(setDeletePostId(_id));
  };

  return (
    <CardStlyled style={{ marginBottom: "16px" }}>
      <PostItemStyled>
        <div className="post-item-prefix">
          <PostItemPrefix
            {...{
              _id,
              showMenu: true,
              owner,
              tags,
              createdAt,
              privacy,
              type,
              
              group,
              title,
              isOwner,
              isAdmin,
              isManager,
            }}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        </div>

        <div className="post-item-content">
          <MediumContentStyled className="content">
            {content && htmlParse(content)}
          </MediumContentStyled>
        </div>
        {/* Chứa các file ở dạng lưới - sẽ có nếu bài viết type != "share" */}
        {type !== "share" && (
          <PostFiles onFileClick={handleFileClick} files={files} />
        )}

        {/* Bài viết được đính kèm - nếu có */}
        {sharedPost && (
          <SharedPostItem
            onFileClick={handleFileClick}
            sharedPost={sharedPost}
          />
        )}
        {type === "share" && !sharedPost && (
          <div
            style={{
              display: "flex",
              columnGap: "5px",
              justifyContent: "center",
            }}
          >
            <SmallIconStyled className="fas fa-exclamation"></SmallIconStyled>
            <MediumContentStyled>
              Bài viết được chia sẻ này không tồn tại hoặc đã bị xóa
            </MediumContentStyled>
          </div>
        )}

        {/*khu vực chứa các thông tin tương tác và các hành động tương tác*/}
        <div className="post-item-reaction">
          <PostReview
            _id={_id}
            shareCount={shareCount}
            commentCount={commentCount}
            likeCount={likeCount}
          />
          <DividerStyled style={{ margin: "12px 0px 5px 0px" }} />
          <PostAction
            isLike={isLike}
            postId={_id}
            emotion={emotion}
            showShareButton={type !== "system" && type !== "groups-system" && type !=="groups"}
            onCommentButtonClick={handleCommentButtonClick}
            onShareButtonClick={handleShareButtonClick}
          />
          {commentsVisible && (
            <DividerStyled style={{ margin: "5px 0px 12px 0px" }} />
          )}
        </div>

        <PostComment
          comments={comments}
          visible={commentsVisible}
          postId={_id}
          avatar={userAvatar}
          commentCanLoad={commentCanLoad}
          commentSkip={commentSkip}
          commentIdIgnore={commentIdIgnore}
        />
      </PostItemStyled>
    </CardStlyled>
  );
});

export default PostItem;
