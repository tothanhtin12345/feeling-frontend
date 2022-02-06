import { useReducer, useEffect } from "react";

//hook này dành cho phần comment - đặc biệt là phần post modal
//chỉ phần comment ở post modal không thể liên kết được với post ở state
//nên ta dùng giải pháp này để cập nhật dữ liệu ở post modal

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_COMMENTS":
      const { comments, continueLoad, nextSkip } = action.payload;

      state.commentSkip += nextSkip;
      state.commentCanLoad = continueLoad;

      state.comments = [...state.comments, ...comments];
      return {
        ...state,
      };
    case "ADD_COMMENT": {
      const comment = action.payload;

      state.comments = [comment, ...state.comments];

      state.commentSkip += 1;
      state.commentCount += 1;
      return { ...state };
    }

    case "DELETE_COMMENT": {
      const { commentId } = action.payload;

      const commentIndex = state.comments.findIndex(
        (item) => item._id === commentId
      );

      if (commentIndex >= 0) {
        //không thể dùng splice - nên ta dùng cách này
        state.comments = state.comments.filter(
          (item) => item._id !== commentId
        );
        state.commentSkip -= 1;
        state.commentCount -= 1;
      }
      return { ...state };
    }
    case "EDIT_COMMENT": {
      const { commentId, text } = action.payload;
      const commentIndex = state.comments.findIndex(
        (item) => item._id === commentId
      );

      //tạo một mảng mới

      if (commentIndex >= 0) {
        let newComments = state.comments.filter((item) => true);

        const currentComment = { ...state.comments[commentIndex], text };

        newComments[commentIndex] = {
          ...currentComment,
          text,
        };
        return { ...state, comments: newComments };
      }
      return { ...state };
    }
    default:
      return { ...state };
  }
};

const useCommentPost = ({
  commentCount,
  comments,
  commentSkip,
  commentCanLoad,
}) => {
  const [state, commentLocalDispatch] = useReducer(reducer, {
    commentCanLoad,
    comments,
    commentCount,
    commentSkip,
  });

  console.log(state);

  return {
    commentValue: state,
    commentLocalDispatch,
  };
};

export default useCommentPost;
