import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
//code của mình
import OnlineAvatar from "../../UI/OnlineAvatar";
//ta có thể dùng ChatInput cho phần Comment Input
import CommentInput from "../../Comment/CommentInput";
import Comments from "../../Comment/Comments";
import { SmallTitleStyled } from "../../Styled/Text";
import { getPathByIndex } from "../../../utils/url";
import socket from "../../../utils/socket/socket";
import {
  addCommentWallPost,
  deleteCommentWallPost,
  fetchWallPostComments,
  editCommentWallPost,
} from "../../../store/modules/Wall/slice";
import {
  addCommentHomePost,
  deleteCommentHomePost,
  fetchHomePostComments,
  editCommentHomePost,
} from "../../../store/modules/Home/slice";
import {
  addCommentGroupsPost,
  deleteCommentGroupsPost,
  fetchGroupsPostComments,
  editCommentGroupsPost,
} from "../../../store/modules/Groups/slice";
import {
  addCommentGroupDashboardPost,
  deleteCommentGroupDashboardPost,
  fetchGroupsDashboardPostComments,
  editCommentGroupDashboardPost,
} from "../../../store/modules/GroupsDashboard/slice";

import {
  addCommentPostDetails,
  deleteCommentPostDetails,
  fetchCommentsPostDetails,
  editCommentPostDetails,
} from "../../../store/modules/PostDetails/slice";

import useHttpRequest from "../../../hooks/useHttpRequest";
import InsideCenterSpin from "../../UI/InsideCenterSpin";
//code của mình
const PostCommentStyled = styled.div`
  margin-top: 16px;
  padding: 15px 15px;
  max-width: 100%;

  display: ${({ visible }) => (visible === "true" ? "block" : "none")};
  & {
    .post-comment-input-wrapper {
      display: flex;
      align-items: center;
      column-gap: 5px;

      .post-comment-input {
        flex: 1;
        max-width: 100%;
        min-width: 0;
        .input {
        }
      }
    }
    .comments-area {
      margin-top: 16px;
    }
    .comments-expand {
      cursor: pointer;
    }
  }
`;

//khu vực chứa phần comments - ở đây ta sẽ thực hiện tương tác các công việc của comment luôn

const PostComment = ({
  postId,
  comments,
  visible,
  avatar,
  commentCanLoad,
  commentSkip,
  commentIdIgnore,
  //một hàm dispatch (thuộc reducer) - để cập nhật dữ liệu cho phần post modal - sẽ có khi dùng post modal
  commentLocalDispatch,
}) => {
  const dispatch = useDispatch();
  //giới hạn lấy 5 giá tri comment mỗi lần
  const limit = 5;

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

  const { loading, sendRequest } = useHttpRequest();

  //theo dõi comment mới từ người khác gửi đến
  useEffect(() => {
    //khi có comment mới cho bài viết này (có thể là từ người gửi và người khác gửi )
    socket.on(`${postId}-comment-post`, ({ comment, fromWhere, postId }) => {
      //cập nhật vào trong store của post modal item
      //nếu có hàm này thì không cần cập nhật ở store redux - vì những bài viết ở dạng timeline cũng có socket
      // và sẽ tự cập nhât
      if (commentLocalDispatch) {
        commentLocalDispatch({ type: "ADD_COMMENT", payload: comment });
        return;
      }

      //lưu comment vào trong store
      //cập nhật ở home
      if (fromWhere === "") {
        dispatch(addCommentHomePost({ comment, postId }));
      }
      //cập nhật comments cho bài viết ở wall
      else if (fromWhere === "wall") {
        dispatch(addCommentWallPost({ comment, postId }));
      }
      //cập nhật ở groups
      else if (fromWhere === "groups") {
        dispatch(addCommentGroupsPost({ comment, postId }));
      }
      //cập nhật ở groups/dashboard
      else if (fromWhere === "groups/dashboard") {
        dispatch(addCommentGroupDashboardPost({ comment, postId }));
      }
      //cập nhật ở trang chi tiết
      else if (fromWhere === "post/details") {
        dispatch(
          addCommentPostDetails({
            comment,
            postId,
          })
        );
      }
    });

    //khi một comment bị xóa khỏi bài viết này (do người khác xóa hoặc chính người dùng xóa)
    socket.on(
      `${postId}-delete-comment-post`,
      ({ postId, commentId, fromWhere }) => {
        //cập nhật vào trong store của post modal item
        //nếu có hàm này thì không cần cập nhật ở store redux - vì những bài viết ở dạng timeline cũng có socket
        // và sẽ tự cập nhât
        if (commentLocalDispatch) {
          commentLocalDispatch({
            type: "DELETE_COMMENT",
            payload: { commentId },
          });
          return;
        }

        //cập nhật ở home
        if (fromWhere === "") {
          dispatch(deleteCommentHomePost({ postId, commentId }));
        }
        //cập nhật comments cho bài viết ở wall
        else if (fromWhere === "wall") {
          dispatch(deleteCommentWallPost({ postId, commentId }));
        }
        //cập nhật ở groups
        else if (fromWhere === "groups") {
          dispatch(deleteCommentGroupsPost({ postId, commentId }));
        }
        //cập nhật ở groups/dashboard
        else if (fromWhere === "groups/dashboard") {
          dispatch(deleteCommentGroupDashboardPost({ postId, commentId }));
        }
        //cập nhật ở trang chi tiết
        else if (fromWhere === "post/details") {
          dispatch(
            deleteCommentPostDetails({
              postId,
              commentId,
            })
          );
        }
      }
    );
    //khi một comment được chỉnh sửa (chỉ tính với người thực hiện)
    socket.on(
      `${postId}-edit-comment-post`,
      ({ postId, commentId, text, fromWhere }) => {
        //cập nhật trong store của post modal item
        if (commentLocalDispatch) {
          commentLocalDispatch({
            type: "EDIT_COMMENT",
            payload: { text, commentId },
          });
        }

        //cập nhật ở home
        if (fromWhere === "") {
          dispatch(editCommentHomePost({ postId, commentId, text }));
        }
        //cập nhật comments cho bài viết ở wall
        else if (fromWhere === "wall") {
          dispatch(editCommentWallPost({ postId, commentId, text }));
        }
        //cập nhật ở groups
        else if (fromWhere === "groups") {
          dispatch(editCommentGroupsPost({ postId, commentId, text }));
        }
        //cập nhật ở groups/dashboard
        else if (fromWhere === "groups/dashboard") {
          dispatch(editCommentGroupDashboardPost({ postId, commentId, text }));
        }
        //cập nhật ở trang chi tiết
        else if (fromWhere === "post/details") {
          dispatch(
            editCommentPostDetails({
              postId,
              commentId,
              text,
            })
          );
        }
      }
    );

    //clear - ngưng theo dõi
    return () => {
      //nếu không có hàm này thì mới off socket
      if (!commentLocalDispatch) {
        socket.off(`${postId}-comment-post`);
        socket.off(`${postId}-delete-comment-post`);
        socket.off(`${postId}-edit-comment-post`);
      }
    };
  }, []);

  //hàm thực hiện khi lấy dữ liệu comments thành công
  const handleFetchCommentsSuccess = ({ resData }) => {
    const { comments } = resData;
    //có thể tiếp tục load không ?
    let continueLoad = false;
    let nextSkip = 0; // giá trị skip tiếp theo - sẽ được cộng vào skip hiện tại
    if (comments.length >= limit) {
      continueLoad = true;
      //tiếp tục tăng thêm limit lần cho lần fetch tiếp theo
      nextSkip = limit;
    }

    //cập nhật trong store cho post modal item
    if (commentLocalDispatch) {
      commentLocalDispatch({
        type: "FETCH_COMMENTS",
        payload: { comments, nextSkip, continueLoad },
      });
    }

    //tiến hành cập nhật trong store
    const fromWhere = currentPath;
    //cập nhật ở home
    if (fromWhere === "") {
      dispatch(
        fetchHomePostComments({ comments, continueLoad, nextSkip, postId })
      );
    }
    //cập nhật comments cho bài viết ở wall
    else if (fromWhere === "wall") {
      dispatch(
        fetchWallPostComments({ comments, continueLoad, nextSkip, postId })
      );
    }
    //cập nhật ở groups
    else if (fromWhere === "groups") {
      dispatch(
        fetchGroupsPostComments({ comments, continueLoad, nextSkip, postId })
      );
    }
    //cập nhật ở groups/dashboard
    else if (fromWhere === "groups/dashboard") {
      dispatch(
        fetchGroupsDashboardPostComments({
          comments,
          continueLoad,
          nextSkip,
          postId,
        })
      );
    }
    //cập nhật ở trang chi tiết
    else if (fromWhere === "post/details") {
      dispatch(
        fetchCommentsPostDetails({
          comments,
          continueLoad,
          nextSkip,
          postId,
        })
      );
    }
  };
  //hàm thực hiện khi lấy dữ liệu comments thất bại
  const handleFetchCommentsFailed = (message) => {
    console.log(message);
  };

  //hàm thực hiện gọi fetch commments request
  const handleFetchComments = () => {
    sendRequest({
      axiosConfig: {
        method: "GET",
        url: "/post/comments",
        params: {
          postId,
          limit,
          skip: commentSkip,
          commentIdIgnore,
        },
      },
      successCallback: handleFetchCommentsSuccess,
      failedCallback: handleFetchCommentsFailed,
    });
  };

  //tiến hành get dữ liệu comment lần đầu khi phần bình luận được mở
  //tạm thời là không cho fetch bình luận khi vừa mới mở chức năng bình luận
  //bởi vì còn vướng cái vụ modal post item
  // useEffect(() => {
  //   handleFetchComments();
  // }, []);

  //hàm fetch thêm nhiều comments nữa
  const handleFetchMoreComments = () => {
    if (!commentCanLoad) return;
    handleFetchComments();
  };

  //sẽ fetch dữ liệu comments lần đầu (khoảng 10 cái mới nhất) ở đây - và cập nhật lại bài post trong store

  //sẽ fetch thêm dữ liệu comments khi nhấn nút xem thêm và cập nhật lại trong store

  //khi nhấn nút enter vào ô comment của một bài post
  const handleEnterCommentInput = (text) => {
    //bắn tin nhắn
    socket.emit("comment-post", { text, fromWhere: currentPath, postId });
  };

  return (
    <PostCommentStyled visible={visible === true ? "true" : "false"}>
      <div className="post-comment-input-wrapper">
        <div className="post-comment-input-avatar">
          <OnlineAvatar
            size={32}
            online={false}
            avatar={avatar ? avatar.files[0].fileUrl : null}
          />
        </div>
        <div className="post-comment-input">
          <CommentInput onEnterInput={handleEnterCommentInput} />
        </div>
      </div>
      {/* Khu vực chứa các bình luận */}
      <div className="comments-area">
        <Comments comments={comments} />
      </div>
      {/* Tải thêm bình luận - vẫn hiện nếu như vẫn có thể tiếp tục load */}
      {commentCanLoad && (
        <div
          className="comments-expand"
          onClick={loading ? () => {} : handleFetchMoreComments}
        >
          {loading && <InsideCenterSpin />}
          {!loading && <SmallTitleStyled>Xem thêm bình luận</SmallTitleStyled>}
        </div>
      )}
    </PostCommentStyled>
  );
};
export default PostComment;
