import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addPostModalVisible: false,
  wallSettingFormModalVisible: false,
  posts: [],
  //một avatar hoặc cover giả - có giá trị khi người dùng thay đổi ảnh đại diện (nhưng chưa lưu)
  fakeImage: null,
  //thông tin của một người khi ta nhấn vào wall người đó
  wallUser: null,
  wallUserLoading: false,
  //error sẽ bao gồm code và message
  wallError: null,
  loading: false,
  skip: 0,
  limit: 10,
  canLoad: true,
  
  //đã load dữ liệu post lần đầu chưa ?
  postFirstLoad: false,
};

const wallSlice = createSlice({
  name: "wall",
  initialState,
  reducers: {
    
    fetchWallPostsSaga: (state, action) => {
      action.payload = {
        ...action.payload,
        limit: state.limit,
      }

      
      if(state.posts.length > 0){
        const lastItem = state.posts[state.posts.length-1];
        action.payload = {
          ...action.payload,
          lastId: lastItem._id,
          
        }
      }
      state.loading = true;
    },
    fetchWallPosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
      state.loading = false;
    },
    addWallPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
      state.skip += 1;
    },
    updateWallPost: (state, action) => {
      const editData = action.payload;
      const postIndex = state.posts.findIndex((p) => p._id === editData._id);

      if (postIndex >= 0) {
        const post = state.posts[postIndex];
        state.posts[postIndex] = {
          ...post,
          ...editData,
        };
      }
      // console.log(state.posts[postIndex]);
    },

    deleteWallPost: (state, action) => {
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

    //xóa 1 file media trong post
    deleteFileWallPost: (state, action) => {
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

    addCommentWallPost: (state, action) => {
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

    deleteCommentWallPost: (state, action) => {
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
    editCommentWallPost: (state, action) => {
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
    fetchWallPostComments: (state, action) => {
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

    setFakeImage: (state, action) => {
      state.fakeImage = action.payload;
    },

    //tiến hành lấy dữ liệu người dùng trên server
    //payload là wallUserId - tức là id người dùng muốn fetch
    fetchWallUserSaga: (state, action) => {
      state.wallUserLoading = true;
    },
    //lưu dữ liệu người dùng vừa lấy được trên server
    setWallUser: (state, action) => {
      state.wallUser = action.payload;
      state.wallUserLoading = false;
    },

    //cập nhật thông tin của WallUser (có thể user này là chính mình hoặc một người nào đó)
    updateWallUser: (state, action) => {
      if (state.wallUser) {
        const { wallUserId } = action.payload;

        //nếu trong payload có wallUserId => kiểm tra sự giống nhau giữa 2 id
        if (wallUserId && wallUserId !== state.wallUser._id) {
          return;
        }

        delete action.payload["wallUserId"];

        state.wallUser = {
          ...state.wallUser,
          ...action.payload,
        };
      }
    },
    setWallUserLoading: (state, action) => {
      state.wallUserLoading = action.payload;
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
    toggleWallSettingFormModalVisible: (state, action) => {
      //nếu có giá trị tru - false được truyền vào thì gán = giá trị đó
      if (action.payload) {
        state.wallSettingFormModalVisible = action.payload;
        //ngược lại thì thực hiện toggle
      } else {
        state.wallSettingFormModalVisible = !state.wallSettingFormModalVisible;
      }
    },
    setWallLoading: (state, action) => {
      state.loading = action.payload;
    },
    setWallCanLoad: (state, action) => {
      state.canLoad = action.payload;
    },
    changeWallSkip: (state, action) => {
      state.skip += action.payload;
    },
    setWallError: (state, action) => {
      state.wallError = action.payload;
    },
    setWallPostFirstLoad: (state, action) => {
      state.postFirstLoad = action.payload;
    },
    resetWall: (state) => {
      return {...initialState};
    },
    
  },
});

export const {
  addWallPost,
  updateWallPost,
  deleteWallPost,
  fetchWallUserSaga,
  setWallUser,
  updateWallUser,
  setWallUserLoading,
  setWallError,
  resetWall,
  toggleAddPostModalVisible,
  toggleWallSettingFormModalVisible,
  fetchWallPosts,
  fetchWallPostsSaga,
  setWallCanLoad,
  setWallLoading,
  changeWallSkip,
  addCommentWallPost,
  deleteCommentWallPost,
  editCommentWallPost,
  fetchWallPostComments,
  setWallPostFirstLoad,
  deleteFileWallPost,
} = wallSlice.actions;

export default wallSlice.reducer;
