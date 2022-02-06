import { createSlice } from "@reduxjs/toolkit";

//code của mình
import { updateFriendSentMethod } from "./methods";

const initialState = {
  loading: false,
  // danh sách những người đã gửi yêu cầu kết bạn
  friendsSent: [],
  skip: 0,
  limit: 10,
  canLoad: true,
};

const friendListSentSlice = createSlice({
  name: "friendListSent",
  initialState,
  reducers: {
    //lấy danh những người mà mình đã gửi yêu cầu kết bạn
    fetchfriendsSentSaga: (state, action) => {
      action.payload = {
        ...action.payload,
        skip: state.skip,
        limit: state.limit,
      };
      state.loading = true;
    },
    fetchfriendsSent: (state, action) => {
      const { friendsSent } = action.payload;
      state.friendsSent = [...state.friendsSent, ...friendsSent];
    },

    deleteFriendSent: (state, action) => {
      const {userSentId} = action.payload;
      let friendSentIndex = state.friendsSent.findIndex((item) => item._id === userSentId);
      if(friendSentIndex >=0 ){
        state.friendsSent = state.friendsSent.filter((item) => item._id !== userSentId);
        state.skip -= 1;
      }
      

    },

    //hủy cái lời mời người ta gửi cho mình
    cancelFriendSentSaga: (state, action) => {
      //tạo một loading cho cái dữ liệu friend
      const { wallUserId: _id } = action.payload;
      updateFriendSentMethod(state, _id, { loading: true });
    },
    cancelFriendSent: (state, action) => {
      //xóa người bạn đó ra khỏi danh sách 
      const { _id } = action.payload;

      const friendIndex = state.friendsSent.findIndex(
        (item) => item._id === _id
      );
      if (friendIndex >= 0) {
        state.friendsSent = state.friendsSent.filter(
          (item) => item._id !== _id
        );
      }
      //giảm skip danh sách
      if (state.skip > 0) {
        state.skip -= 1;
      }
    },
    

    updateFriendSent: (state, action) => {
      const { _id, data } = action.payload;

      updateFriendSentMethod(state, _id, data);
    },

    //thiết lập loading cho dữ liệu friend
    setFriendCardLoading: (state, action) => {
      //tạo một loading cho cái dữ liệu friend
      const { wallUserId: _id, loadingVal } = action.payload;
      updateFriendSentMethod(state, _id, { loading: loadingVal });
    },

    setfriendListSentLoading: (state, action) => {
      state.loading = action.payload;
    },
    setfriendListSentCanLoad: (state, action) => {
      state.canLoad = action.payload;
    },
    changefriendListSentSkip: (state, action) => {
      state.skip += action.payload;
    },

    reset: (state, action) => {
      return initialState;
    },
  },
});

export const {
    fetchfriendsSent,
    fetchfriendsSentSaga,
    deleteFriendSent,
    cancelFriendSent,
    cancelFriendSentSaga,

    updateFriendSent,
    setFriendCardLoading,
    setfriendListSentCanLoad,
    setfriendListSentLoading,
    changefriendListSentSkip,
    reset,

} = friendListSentSlice.actions;

export default friendListSentSlice.reducer;
