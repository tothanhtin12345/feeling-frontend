import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  fakeImage: null,
};

const wallPrefixSlice = createSlice({
  name: "wallPrefix",
  initialState,
  reducers: {
   
    //payload là một thông tin để tạo bài post upload ảnh đại diện
    uploadAvatarSaga: (state,action) => {
        state.loading = true;
    },
    //payload là một thông tin để tạo bài post upload ảnh bìa
    uploadCoverSaga:(state, action) => {
        state.loading = true;
    },
    //payload là một thông tin để tạo bài post upload ảnh bìa cho nhóm
    uploadGroupCoverSaga:(state,action) => {
      state.loading = true;
    },
    setWallPrefixLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetWallPrefix: (state) => {
        return initialState;
    },
  },
});

export const { uploadAvatarSaga, uploadCoverSaga, setWallPrefixLoading, resetWallPrefix,uploadGroupCoverSaga,} = wallPrefixSlice.actions;

export default wallPrefixSlice.reducer;