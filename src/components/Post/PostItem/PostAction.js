import styled from "styled-components";
import { debounce } from "lodash";
import { Popover } from "antd";
import { useState } from "react";

//code của mình
import { RectanglePostButtonStyled } from "../../Styled/Button";
import { MediumIconStyled } from "../../Styled/Icon";
import { MediumContentStyled } from "../../Styled/Text";
import socket from "../../../utils/socket/socket";
import { getPathByIndex } from "../../../utils/url";

import useLongPress from "../../../hooks/post/useLongPress";

import hahaIcon from "../../../imagesSource/emotion-icons/haha.svg";

import angryIcon from "../../../imagesSource/emotion-icons/angry.svg";
import sadIcon from "../../../imagesSource/emotion-icons/sad.svg";
import likeIcon from "../../../imagesSource/emotion-icons/like.svg";
import unlikeIcon from "../../../imagesSource/emotion-icons/unlike.svg";


const iconsObjects = {
  haha: {
    text:"Haha",
    icon: hahaIcon,
  },
  like: {
    text:"Thích",
    icon:likeIcon,
  },
  angry: {
    text:"Giận",
    icon:angryIcon,
  },
  sad: {
    text:"Buồn",
    icon:sadIcon,
  },
}

const PostActionStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  align-items: center;
  & {
    .post-action-button {
      width: 100%;
      display: flex;
      column-gap: 5px;
      align-items: center;
      justify-content: center;
    }
  }
`;

const EmotionIconsWrapperStyled = styled.div`
  display: flex;
  column-gap: 10px;
  & {
    img {
      width: 30px;
      transition: all 0.3s;
    }
    .emtion-icon-action:hover img {
      transform: scale(2); /* Equal to scaleX(0.7) scaleY(0.7) */
    }
  }
`;

const EmotionIconActionStyledWrapper = styled.div`
  & {
    img {
      width: 22px;
    }
  }
`;

//các hành động của bài post: like, nhấn vào nút comment và chia sẻ
const PostAction = ({
  postId,
  isLike,
  emotion,
  showShareButton = true,
  onCommentButtonClick,
  onShareButtonClick,
}) => {

  
  const [emotionsIconsPopoverVisible, setEmotionsIconsPopoverVisible] =
    useState(false);

  //dùng để xác định việc thực hiện tương tác đến từ trang nào
  let currentPath = getPathByIndex(1);
  if (currentPath === "groups") {
    if (getPathByIndex(2) === "dashboard") {
      currentPath += "/dashboard";
    }
  }
  if (currentPath === "post") {
    if (getPathByIndex(2) === "details") {
      currentPath += "/details";
    }
  }
  //xử lý khi nhấn nút like một bài viết
  const handleLikeClick = (emotion) => {
    //bắn dữ liệu _id của bài viết mình like
    socket.emit("like-post", { postId, emotion, fromWhere: currentPath });
  };

  const longPressEvent = useLongPress(() => {
    setEmotionsIconsPopoverVisible(true);
  }, () => {handleLikeClick("like")});

  return (
    <PostActionStyled>
      {/* Nút thích */}
      <Popover
        zIndex={999999999999}
        trigger="hover"
        visible={emotionsIconsPopoverVisible}
        onVisibleChange={(visible) => {
          setEmotionsIconsPopoverVisible(visible);
        }}
        content={
          <EmotionIconsWrapperStyled>
            <div
              className="emtion-icon-action"
              onClick={() => {
                setEmotionsIconsPopoverVisible(false);
                handleLikeClick("like")
              }}
            >
              <img src={likeIcon} />
            </div>

            <div
              className="emtion-icon-action"
              onClick={() => {
                setEmotionsIconsPopoverVisible(false);
                handleLikeClick("haha")
              }}
            >
              <img src={hahaIcon} />
            </div>
            <div
              className="emtion-icon-action"
              onClick={() => {
                setEmotionsIconsPopoverVisible(false);
                handleLikeClick("sad")
              }}
            >
              <img src={sadIcon} />
            </div>
            <div
              className="emtion-icon-action"
              onClick={() => {
                setEmotionsIconsPopoverVisible(false);
                handleLikeClick("angry")
              }}
            >
              <img src={angryIcon} />
            </div>
          </EmotionIconsWrapperStyled>
        }
      >
        <RectanglePostButtonStyled
          className="post-action-button"
          {...longPressEvent}
        >
          {isLike && (
            
            <EmotionIconActionStyledWrapper>
              <img src={iconsObjects[emotion].icon} />
            </EmotionIconActionStyledWrapper>
          )}
          {!isLike && (
            <EmotionIconActionStyledWrapper>
              <img src={unlikeIcon} />
            </EmotionIconActionStyledWrapper>
          )}

          <MediumContentStyled>{isLike === true ? iconsObjects[emotion].text : "Thích"}</MediumContentStyled>
        </RectanglePostButtonStyled>
      </Popover>

      {/* Nút bình luận */}
      <RectanglePostButtonStyled
        className="post-action-button"
        onClick={onCommentButtonClick}
      >
        <MediumIconStyled className="far fa-comment-alt"></MediumIconStyled>
        <MediumContentStyled>Bình luận</MediumContentStyled>
      </RectanglePostButtonStyled>

      {/* Nút chia sẻ - có thể không có */}
      {showShareButton && (
        <RectanglePostButtonStyled
          className="post-action-button"
          onClick={onShareButtonClick}
        >
          <MediumIconStyled className="far fa-share-square"></MediumIconStyled>
          <MediumContentStyled>Chia sẻ</MediumContentStyled>
        </RectanglePostButtonStyled>
      )}
    </PostActionStyled>
  );
};
export default PostAction;
