import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  post: null,
};

const postDetailsSlice = createSlice({
  name: "postDetails",
  initialState,
  reducers: {
    //lấy chi tiết một bài post
    fetchPostDetailsSaga: (state, action) => {
      state.loading = true;
    },
    fetchPostDetails: (state, action) => {
      state.post = action.payload;
      state.loading = false;
    },

    //cập nhật thêm nội dung cho bài post
    updatePostDetails: (state, action) => {
      const editData = action.payload;
      if (state.post && state.post._id == editData._id) {
        state.post = {
          ...state.post,
          ...editData,
        };
      }
    },
    deletePostDetails: (state, action) => {
      const deletePostId = action.payload;
      if(state.post && state.post._id === deletePostId){
        state.post = null;
      }
    },

    //fetch comments cho bài post
    fetchCommentsPostDetails: (state, action) => {
      //continue: còn có thể tiếp tục load không
      //newSkip: lần tiếp theo sẽ skip thêm bao nhiêu
      const { comments, continueLoad, nextSkip, postId } = action.payload;
      if (state.post && state.post._id === postId) {
        const currentPost = state.post;
        //đặt lại giá trị có thể load tiếp
        currentPost.commentCanLoad = continueLoad;
        //tăng giá trị cho lần skip tiếp theo
        currentPost.commentSkip += nextSkip;

        //thêm comments mới
        currentPost.comments = [...currentPost.comments, ...comments];
        state.post = {
          ...currentPost,
        };
      }
    },

    //thêm một comment cho bài post
    addCommentPostDetails: (state, action) => {
      const { postId, comment } = action.payload;
      if (state.post && state.post._id === postId) {
        const currentPost = state.post;
        currentPost.comments.unshift(comment);
        //tăng số skip
        currentPost.commentSkip += 1;
        //tăng số lượng đếm comment
        currentPost.commentCount += 1;
        state.post = { ...currentPost };
      }
    },
    //xóa một comment của bài post
    deleteCommentPostDetails: (state, action) => {
      const { postId, commentId } = action.payload;
      if (state.post && state.post._id === postId) {
        const currentPost = state.post;
        //tìm vị trí của comment muốn xóa
        const commentIndex = currentPost.comments.findIndex(
          (item) => item._id === commentId
        );

        if (commentIndex >= 0) {
          currentPost.comments.splice(commentIndex, 1);
          //giảm số skip
          currentPost.commentSkip -= 1;
          //tăng số lượng đếm comment
          currentPost.commentCount -= 1;

          //cập nhật lại trong store
          state.post = { ...currentPost };
        }
      }
    },
    //chỉnh sửa một comment
    editCommentPostDetails: (state, action) => {
      const { postId, commentId, text } = action.payload;
      if (state.post && state.post._id === postId) {
        const currentPost = state.post;
        //tìm vị trí của comment muốn xóa
        const commentIndex = currentPost.comments.findIndex(
          (item) => item._id === commentId
        );

        if (commentIndex >= 0) {
          //cập nhật lại nội dung comment
          currentPost.comments[commentIndex].text = text;
          //cập nhật lại trong store
          state.post = { ...currentPost };
        }
      }
    },

    setPostDetailsLoading:(state, action) => {
        state.loading = action.payload;
    },

    resetPostDetails:(state) => {
        return initialState;
    }

  },
});

export const {
  fetchCommentsPostDetails,
  fetchPostDetails,
  fetchPostDetailsSaga,
  addCommentPostDetails,
  deleteCommentPostDetails,
  updatePostDetails,
  deletePostDetails,
  editCommentPostDetails,
  setPostDetailsLoading,
  resetPostDetails,
} = postDetailsSlice.actions;

export default postDetailsSlice.reducer;
