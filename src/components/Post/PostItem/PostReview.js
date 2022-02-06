import { Fragment } from "react";
import styled from "styled-components";
import { useState } from "react";

//code của mình

import {
 
  MediumContentStyled,
} from "../../Styled/Text";

import LikeInformationsModal from "./LikeInformationsModal";
import hahaIcon from "../../../imagesSource/emotion-icons/haha.svg";
import angryIcon from "../../../imagesSource/emotion-icons/angry.svg";
import sadIcon from "../../../imagesSource/emotion-icons/sad.svg";
import likeIcon from "../../../imagesSource/emotion-icons/like.svg";

const iconsObjects = {
  haha: hahaIcon,
  like: likeIcon,
  angry: angryIcon,
  sad: sadIcon,
};

const PostReviewStyled = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & {
    .post-review-prefix {
      display: flex;
      align-items: center;
      column-gap: 0px;

      img {
        width: 20px;
      }
      ${MediumContentStyled} {
        font-size: 16px;
        display: inline-block;
        padding: 0px 5px;
      }
    }
    .post-review-suffix {
      display: flex;
      column-gap: 10px;
    }

    .like-sum-content {
      cursor: pointer;
    }
    .like-sum-content:hover {
      text-decoration: underline;
    }
  }
`;

//nơi chứa các thông tin: số lượt thích, chia sẻ và bình luận
const PostReview = ({ _id, shareCount, likeCount, commentCount }) => {
  const [showLikeInformationModal, setShowLikeInformationModal] =
    useState(false);

  const determineLikeInformation = (likeInformations) => {
    /*convert to [
      ["emotion name", countValue]
    ] */
    let likesInforArray = Object.entries(likeInformations);
    //sắp xếp giảm dần
    likesInforArray.sort((a, b) => {
      if (a[1] >= b[1]) return -1;
      if (a[1] < b[1]) return 1;
      return 0;
    });

    //xác định 3 icon sẽ hiển thị theo thứ tự trong likesInforArray
    // và tổng like
    const emotionsArray = [];
    let count = 0;
    let likeSum = 0;
    for (let i = 0; i < likesInforArray.length; i++) {
      let likeInfor = likesInforArray[i];

      if (likeInfor[1] > 0) {
        likeSum += likeInfor[1];
        if (count < 3) {
          emotionsArray.push(
            <img key={`review-emotion-${i}`} src={iconsObjects[likeInfor[0]]} />
          );
          count += 1;
        }
      }
    }

    return { likeSum, emotionsArray };
  };

  const { likeSum, emotionsArray } = determineLikeInformation(likeCount);

  return (
    <Fragment>
      <PostReviewStyled>
        {/* Phần này thì chứa mỗi số lượt like thôi */}
        <div className="post-review-prefix">
          {likeSum > 0 && (
            <Fragment>
              {emotionsArray}
              <MediumContentStyled
                className="like-sum-content"
                onClick={() => setShowLikeInformationModal(true)}
              >
                {" "}
                {likeSum}
              </MediumContentStyled>
            </Fragment>
          )}
        </div>
        <div className="post-review-suffix">
          <div>
            {commentCount > 0 && (
              <MediumContentStyled>
                {commentCount} bình luận
              </MediumContentStyled>
            )}
          </div>
          <div>
            {shareCount > 0 && (
              <MediumContentStyled>
                {shareCount} lượt chia sẻ
              </MediumContentStyled>
            )}
          </div>
        </div>
      </PostReviewStyled>
      {showLikeInformationModal === true && (
        <LikeInformationsModal
          postId={_id}
          visible={true}
          onCancel={() => setShowLikeInformationModal(false)}
        />
      )}
    </Fragment>
  );
};

export default PostReview;
