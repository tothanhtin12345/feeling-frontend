import { createSlice } from "@reduxjs/toolkit";

//dữ liệu giả cho các comments

const initialState = {
  addPostModalVisible: false,
  editPostModalVisible: false,
  //những bài post của home timeline
  // posts: [],
  posts: [],
  skip: 0,
  limit: 10,
  canLoad: true,
  fetchLoading: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    fetchHomePostSaga: (state, action) => {
      action.payload = {
        ...action.payload,

        limit: state.limit,
      };
      if(state.posts.length > 0){
        const lastItem = state.posts[state.posts.length-1];
        action.payload = {
          ...action.payload,
          lastId: lastItem._id,
          
        }
      }
      state.fetchLoading = true;
    },
    fetchHomePost: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },
    addHomePost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
      state.skip += 1;
    },
    updateHomePost: (state, action) => {
      const editPost = action.payload;
      const postIndex = state.posts.findIndex((p) => p._id === editPost._id);
      console.log(editPost);

      if (postIndex >= 0) {
        const post = state.posts[postIndex];
        state.posts[postIndex] = {
          ...post,
          ...editPost,
        };
      }
    },
    deleteHomePost: (state, action) => {
      const deletePostId = action.payload;
      const postIndex = state.posts.findIndex(
        (item) => item._id === deletePostId
      );
      if (postIndex >= 0) {
        state.posts.splice(postIndex, 1);
        if (state.skip > 0) {
          state.skip -= 1;
        }
      }
    },

    //xóa một file trong bài post (sẽ xảy ra khi thực hiện chức năng xóa photo)
    deleteFileHomePost: (state, action) => {
      const { fileId, postId } = action.payload;
      const postIndex = state.posts.findIndex((item) => item._id === postId);
      if (postIndex >= 0) {
        const post = state.posts[postIndex];
        const files = post.files;
        const fileIndex = files.findIndex((item) => item._id === fileId);
        if (fileIndex >= 0) {
          files.splice(fileIndex, 1);
          post.files = files;
          state.posts[postIndex] = post;
        }
      }
    },

    addCommentHomePost: (state, action) => {
      const { postId, comment } = action.payload;

      //tìm bài viết muốn comment ra
      const postIndex = state.posts.findIndex((item) => item._id === postId);
      if (postIndex >= 0) {
        const currentPost = state.posts[postIndex];
        currentPost.comments.unshift(comment);
        //tăng số skip
        currentPost.commentSkip += 1;
        //tăng số lượng đếm comment
        currentPost.commentCount += 1;

        //cập nhật lại trong store
        state.posts[postIndex] = { ...currentPost };
      }
    },

    deleteCommentHomePost: (state, action) => {
      const { postId, commentId } = action.payload;
      const postIndex = state.posts.findIndex((item) => item._id === postId);
      if (postIndex >= 0) {
        const currentPost = state.posts[postIndex];
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
          state.posts[postIndex] = { ...currentPost };
        }
      }
    },
    editCommentHomePost: (state, action) => {
      const { postId, commentId, text } = action.payload;
      const postIndex = state.posts.findIndex((item) => item._id === postId);
      if (postIndex >= 0) {
        const currentPost = state.posts[postIndex];
        //tìm vị trí của comment muốn chỉnh sửa
        const commentIndex = currentPost.comments.findIndex(
          (item) => item._id === commentId
        );

        if (commentIndex >= 0) {
          //cập nhật lại nội dung comment
          currentPost.comments[commentIndex].text = text;

          //cập nhật lại trong store
          state.posts[postIndex] = { ...currentPost };
        }
      }
    },

    //fetch dữ liệu comment
    fetchHomePostComments: (state, action) => {
      //continue: còn có thể tiếp tục load không
      //newSkip: lần tiếp theo sẽ skip thêm bao nhiêu
      const { comments, continueLoad, nextSkip, postId } = action.payload;
      const postIndex = state.posts.findIndex((item) => item._id === postId);
      if (postIndex >= 0) {
        const currentPost = state.posts[postIndex];

        //đặt lại giá trị có thể load tiếp
        currentPost.commentCanLoad = continueLoad;
        //tăng giá trị cho lần skip tiếp theo
        currentPost.commentSkip += nextSkip;

        //thêm comments mới
        currentPost.comments = [...currentPost.comments, ...comments];

        // console.log(comments);

        //cập nhật lại trong store
        state.posts[postIndex] = { ...currentPost };
      }
    },

    toggleAddPostModalVisible: (state, action) => {
      //nếu có giá trị tru - false được truyền vào thì gán = giá trị đó
      if (action.payload) {
        state.addPostModalVisible = action.payload;
        //ngược lại thì thực hiện toggle
      } else {
        state.addPostModalVisible = !state.addPostModalVisible;
      }
    },
    toggleEditPostModalVisible: (state, action) => {
      if (action.payload) {
        state.editPostModalVisible = action.payload;
      } else {
        state.editPostModalVisible = !state.editPostModalVisible;
      }
    },
    setFetchHomePostLoading: (state, action) => {
      state.fetchLoading = action.payload;
    },
    setFetchHomePostCanLoad: (state, action) => {
      state.canLoad = action.payload;
    },
    changeFetchHomePostSkip: (state, action) => {
      state.skip += action.payload;
    },

    reset: (state, action) => {
      return initialState;
    },
  },
});

export const {
  addHomePost,
  updateHomePost,
  deleteHomePost,
  toggleAddPostModalVisible,
  toggleEditPostModalVisible,
  addCommentHomePost,
  editCommentHomePost,
  deleteCommentHomePost,
  fetchHomePostComments,
  deleteFileHomePost,
  fetchHomePost,
  fetchHomePostSaga,
  setFetchHomePostCanLoad,
  setFetchHomePostLoading,
  changeFetchHomePostSkip,
  reset,
} = homeSlice.actions;

export default homeSlice.reducer;
