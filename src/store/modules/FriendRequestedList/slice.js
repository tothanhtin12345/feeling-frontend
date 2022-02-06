import { createSlice } from "@reduxjs/toolkit";

//code của mình
import { updateFriendRequestedMethod } from "./methods";

const initialState = {
  loading: false,
  // danh sách những người đã gửi yêu cầu kết bạn
  friendsRequested: [],
  skip: 0,
  limit: 10,
  canLoad: true,
};

const friendListRequestedSlice = createSlice({
  name: "friendListRequested",
  initialState,
  reducers: {
    //lấy danh những người gửi yêu cầu kết bạn
    fetchFriendsRequestedSaga: (state, action) => {
      action.payload = {
        ...action.payload,
        skip: state.skip,
        limit: state.limit,
      };
      state.loading = true;
    },
    fetchFriendsRequested: (state, action) => {
      const { friendsRequested } = action.payload;
      state.friendsRequested = [...state.friendsRequested, ...friendsRequested];
    },

    addFriendRequest: (state,action) => {
      const {requestedUser} = action.payload;
      state.friendsRequested = [requestedUser,...state.friendsRequested];
      state.skip += 1;
    },
    

    deleteFriendRequest:(state, action) => {
      const {userRequestId} = action.payload;
      let userRequestIndex = state.friendsRequested.findIndex((item) => item._id === userRequestId);
      if(userRequestIndex >= 0){
        state.friendsRequested = state.friendsRequested.filter((item) => item._id !== userRequestId);
        state.skip -= 1;
      }
    },

    //hủy cái lời mời người ta gửi cho mình
    cancelFriendRequestedSaga: (state, action) => {
      //tạo một loading cho cái dữ liệu friend
      const { wallUserId: _id } = action.payload;
      updateFriendRequestedMethod(state, _id, { loading: true });
    },
    cancelFriendRequested: (state, action) => {
      //xóa người bạn đó ra khỏi danh sách bạn bè
      const { _id } = action.payload;

      const friendIndex = state.friendsRequested.findIndex(
        (item) => item._id === _id
      );
      if (friendIndex >= 0) {
        state.friendsRequested = state.friendsRequested.filter(
          (item) => item._id !== _id
        );
      }
      //giảm skip danh sách
      if (state.skip > 0) {
        state.skip -= 1;
      }
    },
    //chấp nhận lời mời kết bạn
    acceptFriendRequestedSaga: (state, action) => {
      //tạo một loading cho cái dữ liệu friend
      const { wallUserId: _id } = action.payload;
      updateFriendRequestedMethod(state, _id, { loading: true });
    },
    acceptFriendRequested: (state, action) => {
      //xóa người bạn đó ra khỏi danh sách bạn bè
      const { _id } = action.payload;

      const friendIndex = state.friendsRequested.findIndex(
        (item) => item._id === _id
      );
      if (friendIndex >= 0) {
        state.friendsRequested = state.friendsRequested.filter(
          (item) => item._id !== _id
        );
      }
      //giảm skip danh sách
      if (state.skip > 0) {
        state.skip -= 1;
      }
    },

    updateFriendRequested: (state, action) => {
      const { _id, data } = action.payload;

      updateFriendRequestedMethod(state, _id, data);
    },

    //thiết lập loading cho dữ liệu friend
    setFriendCardLoading: (state, action) => {
      //tạo một loading cho cái dữ liệu friend
      const { wallUserId: _id, loadingVal } = action.payload;
      updateFriendRequestedMethod(state, _id, { loading: loadingVal });
    },

    setfriendListRequestedLoading: (state, action) => {
      state.loading = action.payload;
    },
    setfriendListRequestedCanLoad: (state, action) => {
      state.canLoad = action.payload;
    },
    changefriendListRequestedSkip: (state, action) => {
      state.skip += action.payload;
    },

    reset: (state, action) => {
      return initialState;
    },
  },
});

export const {
    fetchFriendsRequested,
    fetchFriendsRequestedSaga,
    addFriendRequest,
    deleteFriendRequest,
    cancelFriendRequested,
    cancelFriendRequestedSaga,
    acceptFriendRequested,
    acceptFriendRequestedSaga,
    updateFriendRequested,
    setFriendCardLoading,
    setfriendListRequestedCanLoad,
    setfriendListRequestedLoading,
    changefriendListRequestedSkip,
    reset,

} = friendListRequestedSlice.actions;

export default friendListRequestedSlice.reducer;
