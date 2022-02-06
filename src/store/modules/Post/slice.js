import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  //bài post được chọn (xảy ra khi người dùng nhấn vào một hình ảnh)
  postSelected: null,
  //bài post được chọn để tạo bài viết chia sẻ
  sharedPost: null,

  
}

const postSlice = createSlice({
  name:"post",
  initialState,
  reducers:{
    //post được chọn - thường thông qua việc nhấn vào một file của post
    //gồm cả một bài post và index của file được chọn
    //có thể trong một số trường hợp còn có cả file được chọn
    setPostSelected: (state, action) => {
      const {postId, fileIndex, fileId} = action.payload;
      state.postSelected = {
        postId,
        fileIndex,
        fileId,
      };

    },
    //hàm bỏ post được chọn - đơn giản là set null cho postSelected
    unSetPostSelected: (state) => {
      state.postSelected = null;
    },
    //hàm set giá trị cho postShareSelected
    setSharedPost: (state,action) => {
      const post = action.payload;
      state.sharedPost = post;
    },
    //hàm set giá trị null cho postShareSelected
    unSetSharedPost: (state,action) => {
      state.sharedPost = null;
    }
  }
})

export const {
  setPostSelected,
  unSetPostSelected,
  setSharedPost,
  unSetSharedPost
} = postSlice.actions;

export default postSlice.reducer;