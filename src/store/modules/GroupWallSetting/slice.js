import { createSlice } from "@reduxjs/toolkit";

//code của mình

// các thao tác đối với tường nhà của nhóm (như yêu cầu tham, hủy yêu cầu)

const initialState = {
  loading: false,

  joinGroupRequestLoading: false,

  cancelJoinGroupRequestLoading: false,

  //hiển thị confirm modal rời khỏi nhóm
  outGroupConfirmModalVisible: false,
  outGroupLoading: false,

  //hiển thị confirm modal xóa nhóm
  deleteGroupConfirmModalVisible: false,
  deleteGroupLoading: false,

};

const groupWallSettingSlice = createSlice({
  name: "groupWallSetting",
  initialState,
  reducers: {
    //gửi yêu cầu tham gia nhóm
    joinGroupSaga: (state, action) => {
      state.loading = true;
      state.joinGroupRequestLoading = true;
    },
    //khi đã gửi yêu cầu xong và nhận được phản hồi (có thể thành công, thất bại, có lỗi thì đều chạy hàm này)
    joinGroupCompleted: (state, action) => {
      state.loading = false;
      state.joinGroupRequestLoading = false;
    },

    //hủy yêu cầu tham gia nhóm
    cancelJoinGroupSaga: (state, action) => {
      state.loading = true;
      state.cancelJoinGroupRequestLoading = true;
    },
    cancelJoinGroupCompleted: (state, action) => {
      state.loading = false;
      state.cancelJoinGroupRequestLoading = false;
    },

    //phần liên quan đến rời khỏi nhóm

    toggleOutGroupConfirmModalVisible: (state, action) => {
      if (action.payload) {
        state.outGroupConfirmModalVisible = action.payload;
        //ngược lại thì thực hiện toggle
      } else {
        state.outGroupConfirmModalVisible = !state.outGroupConfirmModalVisible;
      }
    },

    setOutGroupConfirmModalLoading: (state, action) => {
      state.outGroupLoading = action.payload;
    },

    outGroupSaga:(state, action) => {
        state.outGroupLoading = true;
    },

    //phân liên quan đến xóa nhóm

    toggleDeleteGroupConfirmModalVisible: (state, action) => {
      if (action.payload) {
        state.deleteGroupConfirmModalVisible = action.payload;
        //ngược lại thì thực hiện toggle
      } else {
        state.deleteGroupConfirmModalVisible = !state.deleteGroupConfirmModalVisible;
      }
    },

    setDeleteGroupConfirmModalLoading:(state, action) => {
      state.deleteGroupLoading = action.payload;
    },

    deleteGroupSaga:(state, action) => {
      state.deleteGroupLoading = true;
    }

  },
});

export const {
  joinGroupCompleted,
  joinGroupSaga,
  cancelJoinGroupCompleted,
  cancelJoinGroupSaga,

  toggleOutGroupConfirmModalVisible,
  setOutGroupConfirmModalLoading,
  outGroupSaga,

  toggleDeleteGroupConfirmModalVisible,
  setDeleteGroupConfirmModalLoading,
  deleteGroupSaga,


} = groupWallSettingSlice.actions;

export default groupWallSettingSlice.reducer;
