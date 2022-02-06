import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  posts: [],
  canLoad: true,
  skip:0,
  limit:10,
  postFirstLoad: false,
  fetchLoading: false,
};

const groupsDashboardSlice = createSlice({
  name: "groupsDasboard",
  initialState,
  reducers: {

    //lấy danh sách bài post cho group dashboard
    fetchGroupDashboardPostsSaga:(state, action) => {
      action.payload = {
        ...action.payload,
       
        limit:state.limit,
      }
      if(state.posts.length > 0){
        const lastItem = state.posts[state.posts.length-1];
        action.payload = {
          ...action.payload,
          lastId: lastItem._id,
          
        }
      }
      state.fetchLoading = true;
    },
    fetchGroupDashboardPosts:(state, action) => {
      state.posts = [
        ...state.posts,
        ...action.payload,
      ]
    },

    


    updateGroupsDashboardPost: (state, action) => {
      const editPost = action.payload;
      const postIndex = state.posts.findIndex((p) => p._id === editPost._id);

      if (postIndex >= 0) {
        const post = state.posts[postIndex];
        state.posts[postIndex] = {
          ...post,
          ...editPost,
        };
      }
    },
    deleteGroupsDashboardPost: (state, action) => {
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
    deleteFileGroupsDashboardPost: (state, action) => {
      const {fileId, postId} = action.payload;
      const postIndex = state.posts.findIndex((item)=>item._id === postId);
      if(postIndex >=0){
        const post = state.posts[postIndex];
        const files = post.files;
        const fileIndex = files.findIndex((item)=>item._id === fileId);
        if(fileIndex >=0){
            files.splice(fileIndex,1);
            post.files = files;
            state.posts[postIndex] = post;
        }
      }
    },

    addCommentGroupDashboardPost: (state, action) => {
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

    deleteCommentGroupDashboardPost: (state, action) => {
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
    editCommentGroupDashboardPost: (state, action) => {
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
    fetchGroupsDashboardPostComments: (state, action) => {
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

      

        //cập nhật lại trong store
        state.posts[postIndex] = { ...currentPost };
      }
    },

    changeGroupDashboardSkip:(state, action) => {
      state.skip += action.payload;
    },

    setGroupDashboardCanload: (state, action) => {
      state.canLoad = action.payload;
    },

    setGroupDashboardFetchLoading: (state, action) => {
      state.fetchLoading = action.payload;

    },
    setGroupDashboardPostFirstLoad: (state, action) =>{
      state.postFirstLoad = action.payload;
    },

    reset:(state, action) =>{
      return initialState;
    }
  },
});

export const {
  fetchGroupDashboardPosts,
  fetchGroupDashboardPostsSaga,
  updateGroupsDashboardPost,
  deleteGroupsDashboardPost,
  addCommentGroupDashboardPost,
  editCommentGroupDashboardPost,
  deleteCommentGroupDashboardPost,
  fetchGroupsDashboardPostComments,
  deleteFileGroupsDashboardPost,
  changeGroupDashboardSkip,
  setGroupDashboardCanload,
  setGroupDashboardFetchLoading,
  setGroupDashboardPostFirstLoad,
  reset,
} = groupsDashboardSlice.actions;

export default groupsDashboardSlice.reducer;
