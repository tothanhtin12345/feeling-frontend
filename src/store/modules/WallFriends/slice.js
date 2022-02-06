import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friendsLoading: false,
  friendsRequestedLoading: false,
  friendsSentLoading: false,

  friends: [],
  friendsRequested: [],
  friendsSent: [],

  friendsSkip: 0,
  friendsRequestedSkip: 0,
  friendsSentSkip: 0,

  friendsCanLoad: true,
  friendsRequestedCanLoad: true,
  friendsSentCanLoad: true,

  //các giá trị của ô input
  friendsInput: null,
  friendsRequestedInput: null,
  friendsSentInput: null,
};

const wallFriendsSlice = createSlice({
  name: "wallFriends",
  initialState,
  reducers: {
    //lấy danh sách bạn bè
    fetchWallFriendsSaga: (state, action) => {
      action.payload = {
        ...action.payload,
        skip: state.friendsSkip,
      };
      state.friendsLoading = true;
    },
    fetchWallFriends: (state, action) => {
      state.friends = [...state.friends, ...action.payload];
      state.friendsLoading = false;
    },
    //lấy danh sách những người đang yêu cầu kết bạn với mình
    fetchWallFriendsRequestedSaga: (state, action) => {
      action.payload = {
        ...action.payload,
        skip: state.friendsRequestedSkip,
      };
      state.friendsRequestedLoading = true;
    },
    fetchWallFriendsRequested: (state, action) => {
      state.friendsRequested = [...state.friendsRequested, ...action.payload];
      state.friendsRequestedLoading = false;
    },
    //lấy danh sách những người mình đã yêu cầu kết bạn
    fetchWallFriendsSentSaga: (state, action) => {
      action.payload = {
        ...action.payload,
        skip: state.friendsSentSkip,
      };
      state.friendsSentLoading = true;
    },
    fetchWallFriendsSent: (state, action) => {
      state.friendsSent = [...state.friendsSent, ...action.payload];
      state.friendsSentLoading = false;
    },

    changeWallFriendsSkip: (state, action) => {
      state.friendsSkip += action.payload;
    },
    changeWallFriendsRequestedSkip: (state, action) => {
      state.friendsRequestedSkip += action.payload;
    },
    changeWallFriendsSentSkip: (state, action) => {
      state.friendsSentSkip += action.payload;
    },

    setWallFriendsCanLoad: (state, action) => {
      state.friendsCanLoad = action.payload;
    },
    setWallFriendsRequestedCanLoad: (state, action) => {
      state.friendsRequestedCanLoad = action.payload;
    },
    setWallFriendsSentCanLoad: (state, action) => {
      state.friendsSentCanLoad = action.payload;
    },

    //reset riêng cho phần bạn bè
    resetWallFriends: (state) => {
      state.friends = [];
      state.friendsSkip = 0;
      state.friendsCanLoad = true;
    },
    resetWallFriendsRequested: (state) => {
      state.friendsRequested = [];
      state.friendsRequestedSkip = 0;
      state.friendsRequestedCanLoad = true;
    },
    resetWallFriendsSent: (state) => {
      state.friendsSent = [];
      state.friendsSentSkip = 0;
      state.friendsSentCanLoad = true;
    },

    //các thao tác với user card
    //gửi yêu cầu kết bạn
    sendWallFriendRequestSaga: (state, action) => {},
    //hủy yêu cầu kết bạn mà người ta đã gửi cho mình
    cancelWallFriendRequestedSaga: (state, action) => {},
    //hủy yêu cầu kết bạn mà mình đã gửi cho người ta
    cancelWallFriendSentSaga: (state, action) => {},

    //chấp nhận yêu cầu kết bạn
    acceptWallFriendRequestedSaga: (state, action) => {},
    //Hủy kết bạn
    cancelWallFriendSaga: (state, action) => {},
    //theo dõi người dùng
    followWallUserSaga: (state, action) => {},
    //hủy theo dõi người dùng
    unFollowWallUserSaga: (state, action) => {},

    //update thông tin friend
    updateWallFriend: (state, action) => {
      //_id của friend
      const { _id, isWallOfCurrentUser } = action.payload;
      const friendIndex = state.friends.findIndex((item) => item._id === _id);
      if (friendIndex >= 0) {
        delete action.payload["_id"];
        delete action.payload["isWallOfCurrentUser"];
        const friend = state.friends[friendIndex];
        state.friends[friendIndex] = {
          ...friend,
          ...action.payload,
        };

        //nếu có giá trị isWallOfCurrentUser  => người dùng đang sử dụng chức năng hủy kết bạn ở tường nhà của chính mình
        // => giảm skip
        if(isWallOfCurrentUser && state.friendsSkip > 0){
          state.friendsSkip -= 1;
        }
      }
    },

    
    updateWallFriendRequested: (state, action) => {
      //_id của friend
      const { _id } = action.payload;
      const friendIndex = state.friendsRequested.findIndex((item) => item._id === _id);
      if (friendIndex >= 0) {
        delete action.payload["_id"];
        const friend = state.friendsRequested[friendIndex];
        state.friendsRequested[friendIndex] = {
          ...friend,
          ...action.payload,
        };
      }
      //chỉ có 2 trường hợp là hủy hoặc chấp nhận lời mời
      //dù là trường hợp nào thì cũng đã xóa dữ liệu ra khỏi friend_requested trên server
      //do đó ta phải giảm skip
      if(state.friendsRequestedSkip > 0){
        state.friendsRequestedSkip -= 1;
      }
    },

    updateWallFriendSent: (state, action) => {
      //_id của friend
      const { _id } = action.payload;
      const friendIndex = state.friendsSent.findIndex((item) => item._id === _id);
      if (friendIndex >= 0) {
        delete action.payload["_id"];
        const friend = state.friendsSent[friendIndex];
        state.friendsSent[friendIndex] = {
          ...friend,
          ...action.payload,
        };
      }

      //chỉ có 1 trường hợp là hủy lời mời đã gửi
      //trường hợp này cũng xóa dữ liệu ra khỏi friend_sent trên server
      // do đó ta phải giảm skip
      if(state.friendsSentSkip > 0){
        state.friendsSentSkip -= 1;
      }
    },

    // //thêm một người bạn vào trong danh sách bạn bè
    // addWallFriend: (state,action) => {
    //     state.friends.push(action.payload);
    // },
    // //thêm một người vào trong danh sách những người đã gửi yêu cầu kết bạn cho mình
    // addWallFriendRequested: (state, action) => {
    //     state.friendsRequested.push(action.payload);
    // },
    // //thêm một người vào trong danh sách những người mà mình đã gửi yêu cầu kết bạn
    // addWallFriendSent: (state, action) => {
    //     state.friendsSent.push(action.payload);
    // },

    // //xóa một người ra khỏi danh sách bạn bè
    // deleteWallFriend: (state, action) => {
    //     const u
    // },
    // deleteWallFriendRequested: (state, action) => {

    // },
    // deleteWallFriendSent: (state, action) => {

    // },
  },
});

export const {
  fetchWallFriends,
  fetchWallFriendsRequested,
  fetchWallFriendsRequestedSaga,
  fetchWallFriendsSaga,
  fetchWallFriendsSent,
  fetchWallFriendsSentSaga,
  changeWallFriendsRequestedSkip,
  changeWallFriendsSentSkip,
  changeWallFriendsSkip,
  setWallFriendsCanLoad,
  setWallFriendsRequestedCanLoad,
  setWallFriendsSentCanLoad,
  resetWallFriends,
  resetWallFriendsRequested,
  resetWallFriendsSent,
  updateWallFriend,
  updateWallFriendRequested,
  updateWallFriendSent,
  unFollowWallUserSaga,
  sendWallFriendRequestSaga,
  cancelWallFriendRequestedSaga,
  cancelWallFriendSaga,
  cancelWallFriendSentSaga,
  followWallUserSaga,
  acceptWallFriendRequestedSaga,
} = wallFriendsSlice.actions;

export default wallFriendsSlice.reducer;
