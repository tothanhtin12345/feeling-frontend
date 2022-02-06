import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
//code của minh
import { PostItemModalStyled, PostItemStyled } from "../../Styled/Post";
import { unSetPostSelected } from "../../../store/modules/Post/slice";
import PostItemPrefix from "../PostItem/PostItemPrefix";
import { MediumContentStyled } from "../../Styled/Text";
import PostReview from "../PostItem/PostReview";
import { DividerStyled } from "../../Styled/Divider";
import PostAction from "../PostItem/PostAction";
import PostComment from "../PostItem/PostComment";
import { BigIconStyled } from "../../Styled/Icon";

import { PostItemModalContainerStyled } from "../../Styled/PostItemModal";
import PostItemModalFiles from "./PostItemModalFiles";
import { getUserAvatar } from "../../../store/modules/User/selectors";
import useLikePost from "../../../hooks/post/useLikePost";
import useCommentPost from "../../../hooks/post/useCommentPost";

//đây là một component hiển thị bài post ở dạng modal (kích thước bao phủ cả màn hình)
//ở component này mục đích chính là để hiển thị thông tin của bài post ở dạng lớn hơn

const PostItemModal = ({ post, ...props }) => {
  const {
    _id,
    title,
    privacy,
    type,
    //thông tin group mà một bài post thuộc về
    group,
    owner,
    content,
    tags = [],
    files = [],
    commentCount,
    likeCount,
    shareCount,
    comments = [],
    createdAt,
    //vị trí của file được chọn
    fileIndex,

    isOwner,
    isLike,
    isAdmin,
    commentCanLoad,
    commentSkip,
    emotion,
  } = post;

  // console.log(post);
  const dispatch = useDispatch();
  const history = useHistory();

  //mở phần bình luận (chỉ xảy ra từ false - true duy nhất 1 lần)
  //sau khi nhấn nút mở thì sẽ render ra PostComment và load trước một comment ở trong đó
  //lần sau nhấn lại nút mở thì chỉ hiển thị hoặc ẩn đi cái đã render ra
  const [openPostComment, setOpenPostComment] = useState(false);
  //ẩn - hiện phần bình luận
  const [commentsVisible, setCommentsVisible] = useState(false);

  const userAvatar = useSelector(getUserAvatar);

  //dùng hook này để tương tác dữ liệu với phần like
  //và hook này hỗ trợ hiển thị dữ liệu phần like một cách chính xác hơn
  const { likeValue } = useLikePost({
    postId: _id,
    isLike,
    likeCount,
    emotion,
    offSocket: false,
  });
  const { commentValue, commentLocalDispatch } = useCommentPost({
    commentCanLoad,
    commentCount,
    commentSkip,
    comments,
  });

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

  //đóng modal bằng cách set post được chọn hiện tại = null
  const handleCloseModal = () => {
    dispatch(unSetPostSelected());
  };

  return (
    <PostItemModalStyled
      closable={false}
      className="post-item-modal-open"
      width="100%"
      visible={true}
      footer={null}
      zIndex={10004}
      // đơn giản là chỉ cần set post được chọn là null
      onCancel={() => handleCloseModal}
      keyboard={true}
    >
      <PostItemModalContainerStyled>
        <PostItemModalFiles files={files} fileIndex={fileIndex} />
        {/* Chứa các thông tin còn lại */}

        <PostItemStyled className="post-item-modal-information">
          <div className="post-item-prefix">
            <PostItemPrefix
              {...{ _id, showMenu: false, owner, tags, createdAt, privacy }}
              type={type}
              group={group}
            />
          </div>
          <div className="post-item-content">
            <MediumContentStyled className="content">
              {content}
            </MediumContentStyled>
          </div>
          {/*khu vực chứa các thông tin tương tác và các hành động tương tác*/}
          <div className="post-item-reaction">
            <PostReview
              _id={_id}
              shareCount={shareCount}
              commentCount={commentValue.commentCount}
              likeCount={likeValue.likeCount}
            />
            <DividerStyled style={{ margin: "12px 0px 5px 0px" }} />
            {/* Ta tắt chế độ share khi ở dạng modal */}
            <PostAction
              showShareButton={false}
              onCommentButtonClick={handleCommentButtonClick}
              postId={_id}
              isLike={likeValue.isLike}
              emotion={likeValue.emotion}
            />
            {commentsVisible && (
              <DividerStyled style={{ margin: "5px 0px 12px 0px" }} />
            )}
          </div>

          <PostComment
            comments={commentValue.comments}
            visible={commentsVisible}
            postId={_id}
            avatar={userAvatar}
            commentCanLoad={commentValue.commentCanLoad}
            commentSkip={commentValue.commentSkip}
            commentLocalDispatch={commentLocalDispatch}
          />
        </PostItemStyled>

        {/* Nút đóng cái modal lại */}
        <div className="close-button" onClick={handleCloseModal}>
          <BigIconStyled
            color="#3E3F5E"
            className="fas fa-times"
          ></BigIconStyled>
        </div>
      </PostItemModalContainerStyled>
    </PostItemModalStyled>
  );
};
export default PostItemModal;
