import { createSlice } from "@reduxjs/toolkit";

//dữ liệu giả cho các comments



const initialState = {
 
  addPostModalVisible: false,
  //một cover giả - có giá trị khi người dùng thay đổi ảnh đại diện (nhưng chưa lưu)
  fakeImage: null,
  //thông tin của một group khi ta nhấn vào nó
  groupDetails: null,
  //loading khi lấy thông tin của một nhóm
  groupDetailsLoading: false,
  //error sẽ bao gồm code và message
  groupDetailsError: null,

  //các bài posts của group
  posts: [],
  fetchLoading: false,
  skip: 0,
  limit: 10,
  canLoad: true,
  postFirstLoad: false,

  //hiển thị form chỉnh sửa thông tin của nhóm
  editGroupInformationsModalVisible: false,

 

};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {

    //lấy thông tin chi tiết của group
    fetchGroupDetailsSaga:(state, action)=>{
      state.groupDetailsLoading = true;
    },

    fetchGroupDetails: (state, action) => {
      state.groupDetails = action.payload;
    },

    //cập nhật thông tin của một nhóm
    
    updateGroupDetails:(state, action) => {
      if(state.groupDetails){
        //lấy ra group id
        const {groupId, data} = action.payload;
        if(state.groupDetails._id === groupId){
          state.groupDetails = {
            ...state.groupDetails,
            ...data,
          }
        }
      }
    },

    //set fetch group details loading
    setFetchGroupDetailsLoading: (state, action) => {
      state.groupDetailsLoading = action.payload;
    },
    setGroupDetailsError: (state, action) => {
      state.groupDetailsError = action.payload;
    },

    


    addGroupsPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
      state.skip += 1;
    },
    updateGroupsPost: (state, action) => {
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
    deleteGroupsPost: (state, action) => {
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
    deleteFileGroupsPost: (state, action) => {
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
    addCommentGroupsPost: (state, action) => {
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

    deleteCommentGroupsPost: (state, action) => {
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
    editCommentGroupsPost: (state, action) => {
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
    fetchGroupsPostComments: (state, action) => {
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

        //console.log(comments);

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

    toggleEditGroupInformationsModalVisible: (state, action) => {
      if (action.payload) {
        state.editGroupInformationsModalVisible = action.payload;
        //ngược lại thì thực hiện toggle
      } else {
        state.editGroupInformationsModalVisible = !state.editGroupInformationsModalVisible;
      }

     
    },

    //fetch dữ liệu Posts của group
    fetchGroupPostSaga: (state, action) => {



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
    fetchGroupPost: (state, action) => {
      state.posts = [...state.posts, ...action.payload]
    },

    


    //set fetch post loading
    setFetchPostLoading: (state, action)=>{
      state.fetchLoading = action.payload;
    },

    //set dữ liệu can load
    setGroupCanLoad: (state, action) => {
      state.canLoad = action.payload;
    },

    //set dữ liệu skip
    changeGroupSkip: (state, action) => {
      state.skip += action.payload;
    },

    //load lần đầu hay chưa ?
    setGroupPostFirstLoad: (state, action) => {
      state.postFirstLoad = action.payload;
    },
    reset:(state)=>{
    
      return initialState;
    }
  },
});

export const {
  addGroupsPost,
  updateGroupsPost,
  deleteGroupsPost,
  toggleAddPostModalVisible,
  addCommentGroupsPost,
  editCommentGroupsPost,
  deleteCommentGroupsPost,
  fetchGroupsPostComments,
  deleteFileGroupsPost,
  setFetchGroupDetailsLoading,
  setFetchPostLoading,
  setGroupCanLoad,
  fetchGroupDetails,
  fetchGroupDetailsSaga,
  fetchGroupPost,
  fetchGroupPostSaga,
  setGroupDetailsError,
  updateGroupDetails,
  changeGroupSkip,
  toggleEditGroupInformationsModalVisible,
  setGroupPostFirstLoad,



  reset,
} = groupsSlice.actions;

export default groupsSlice.reducer;
