import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addPostFormModalVisible: false,
  editPostFormModalVisible: false,
  loading: false,
  uploadFilesLoading: false,
  uploadPercent: 0,
  tags: [],
  //files để upload lên server
  files: [],
  //các url để hiển thị file lên view khi người dùng tải hình lên
  filesToShow: [],
  //chứa _id và path để xóa file (sẽ có khi dùng chức năng chỉnh sửa bài viết)
  filesToDelete: [],
  content: "",
  //_id của một bài viết được chỉnh sửa (sẽ có ở chức năng chỉnh sửa)
  editPostId:null,
  deletePostId:null,
  editPostType: null,
  editSharedPost: null,
  
  //group nào thực hiện việc đăng bài
  groupPostId: null,
};

const postFormSlice = createSlice({
  name: "postForm",
  initialState,
  reducers: {

    //đóng - mở - hoặc set một giá trị cụ thể để ẩn hiện add post form modal
    toggleAddPostFormModalVisible: (state, action) => {
      
      if(action.payload!=null){
        
        state.addPostFormModalVisible = action.payload;
      }
      else{
        state.addPostFormModalVisible = !state.addPostFormModalVisible;
      }

      
    },
    //tương tự như trên dành edit post form modal
    toggleEditPostFormModalVisible: (state, action) => {
      if(action.payload!=null){
        state.editPostFormModalVisible = action.payload;
      }
      else{
        state.editPostFormModalVisible = !state.editPostFormModalVisible;
      }
    },


    //thực hiện upload file
    uploadFilesSaga: (state, action) => {
      state.uploadFilesLoading = true;
    },
    setFiles: (state, action) => {
      state.uploadFilesLoading = false;
      state.uploadPercent = 0; //set percent về 0
      state.files = [...state.files, ...action.payload];
    },

    //append 1 tag
    appendTag: (state,action) => {
      state.tags.push(action.payload);
    },

    //xóa 1 tag
    removeTag: (state, action) => {
      const _id = action.payload;
      const tagIndex = state.tags.findIndex(item=>item._id===_id);
      if(tagIndex >=0){
        state.tags.splice(tagIndex,1);
      }
    },

    //thêm file để upload (chứa các đối tượng file - được chuyển hóa thành chuỗi - để không bị warning)
    appendFiles: (state, action) => {
      
      state.files = [...state.files, action.payload];
    },
    //thêm hình để hiển thị lên view khi người dùng thêm nó từ input (chứa các blob url)
    appendFilesToShow: (state, action) => {
      state.filesToShow = [...state.filesToShow, action.payload];
    },
    appendFilesToDelete: (state, action) => {
      state.filesToDelete = [
        ...state.filesToDelete,
        action.payload,
      ]
    }
    ,
    //xóa 1 file
    deleteFileSaga: (state, action) => {},
    //xóa một file để upload
    deleteFile: (state, action) => {
      //uid này được thêm bởi Upload bởi antd
      const uid = action.payload;
   

      const newFiles = state.files.filter((file) => file.uid !== uid);
      state.files = [...newFiles];
    },
    //xóa một file để show
    deleteFileToShow: (state,action) => {
      const fileUrl = action.payload;
      const newFiles = state.filesToShow.filter((file) => file.fileUrl !== fileUrl);
      state.filesToShow = [...newFiles];
    },
    //hàm cập nhật content khi người dùng nhập
    updateContent: (state, action) => {
      state.content = action.payload;
    },

    //thêm bài post
    addPostSaga: (state, action) => {
      state.loading = true;
    },

    //hàm set bài post được chỉnh sửa
    setEditPost: (state,action) => {
      const {content, tags, files, _id: editPostId, type:editPostType, sharedPost: editSharedPost, } = action.payload;
      
      // state.content = content;
      // state.tags = tags;
      // state.filesToShow = [
      //   ...files,
      // ]
      return {
        ...state,
        content,
        tags,
        filesToShow: [
          ...files,
        ],
        editPostId,
        editPostType,
        editSharedPost,
      }
      
    },

    //hàm thực hiện chỉnh sửa bài post
    editPostSaga: (state, action) => {
      state.loading = true;
    },

    //hàm thực hiện share bài post
    sharePostSaga: (state, action) => {
      state.loading = true;
    }, 
    
    //hàm set id của bài post để xóa - đồng thời hiển thị modal confirm trước khi xóa lên
    //có thể có giá trị hoặc không (null)
    setDeletePostId: (state,action) => {
      state.deletePostId = action.payload;
    },

    //hàm thực hiện xóa bài post
    deletePostSaga: (state, action) => {
      state.loading = true;
    },

    //hàm set % upload
    setUploadPercent: (state, action) => {
      let percent = action.payload;
      state.uploadPercent = percent;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUploadFilesLoading: (state, action) => {
      state.uploadFilesLoading = action.payload;
    },

    setGroupPostId: (state, action) => {
      //console.log(action.payload)
      state.groupPostId = action.payload;
    },

    reset: (state) => {
      //phải làm như vậy thì dữ liệu groupPostId sẽ không bị mất
      // dữ liệu groupPostId sẽ xóa do thằng khác gọi đến 
      return {
        ...initialState,
        groupPostId:state.groupPostId,
      };
    },
  },
});

export const {
  toggleAddPostFormModalVisible,
  toggleEditPostFormModalVisible,
  uploadFilesSaga,
  setFiles,
  appendTag,
  removeTag,
  deleteFile,
  deleteFileSaga,
  updateContent,
  addPostSaga,
  setLoading,
  setUploadFilesLoading,
  setUploadPercent,
  reset,
  appendFiles,
  appendFilesToShow,
  appendFilesToDelete,
  deleteFileToShow,
  setEditPost,
  editPostSaga,
  sharePostSaga,
  setDeletePostId,
  deletePostSaga,
  setGroupPostId
} = postFormSlice.actions;

export default postFormSlice.reducer;
