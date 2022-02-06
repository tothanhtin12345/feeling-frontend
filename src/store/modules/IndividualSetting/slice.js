import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  showCancelFriendConfirmModal: false,
};

const individualSettingSlice = createSlice({
  name: "individualSetting",
  initialState,
  reducers: {
    //gửi yêu cầu kết bạn
    sendFriendRequestSaga: (state, action) => {
      state.loading = true;
    },
    //hủy yêu cầu kết bạn mà người ta đã gửi cho mình
    cancelFriendRequestedSaga: (state, action) => {
      state.loading = true;
    },
    //hủy yêu cầu kết bạn mà mình đã gửi cho người ta
    cancelFriendSentSaga: (state, action) => {
      state.loading = true;
    },

    //chấp nhận yêu cầu kết bạn
    acceptFriendRequestedSaga: (state, action) => {
      state.loading = true;
    },
    //Hủy kết bạn
    cancelFriendSaga: (state, action) => {
      state.loading = true;
    },
    //theo dõi người dùng
    followUserSaga: (state, action) => {
      state.loading = true;
    },
    //hủy theo dõi người dùng
    unFollowUserSaga: (state, action) => {
      state.loading = true;
    },
    
    setIndividualSettingLoading:(state, action) => {
      state.loading = action.payload;
    },
    setShowCancelFriendConfirmModal: (state, action) => {
      state.showCancelFriendConfirmModal = action.payload;
    }
  },
});

export const {
  sendFriendRequestSaga,
  cancelFriendRequestedSaga,
  cancelFriendSentSaga,
  acceptFriendRequestedSaga,
  cancelFriendSaga,
  followUserSaga,
  unFollowUserSaga,
  setIndividualSettingLoading,
  setShowCancelFriendConfirmModal
} = individualSettingSlice.actions;

export default individualSettingSlice.reducer;
