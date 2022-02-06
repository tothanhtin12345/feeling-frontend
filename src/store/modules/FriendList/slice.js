import { createSlice } from "@reduxjs/toolkit";

//code của mình
import { updateFriendMethod } from "./methods";

const initialState = {
  loading: false,
  // danh sách friends
  friends: [],
  skip: 0,
  limit: 10,
  canLoad: true,
  
};

const friendListSlice = createSlice({
  name: "friendList",
  initialState,
  reducers: {
    //lấy danh sách bạn bè
    fetchFriendsSaga: (state, action) => {
      action.payload = {
        ...action.payload,
        skip: state.skip,
        limit: state.limit,
      };
      state.loading = true;
    },
    fetchFriends: (state, action) => {
      const { friends } = action.payload;
      state.friends = [...state.friends, ...friends];
    },

    //thêm một dữ liệu friend vào danh sách
    addFriend:(state, action) => {
      const {friend} = action.payload;
      state.friends = [friend,...state.friends];
      state.skip+=1;
    },
    deleteFriend:(state, action) => {
      const {cancelUserId} = action.payload;
      const cancelUserIndex = state.friends.findIndex((item) => item._id === cancelUserId);
      if(cancelUserIndex >=0){
        state.friends = state.friends.filter((item) => item._id !== cancelUserId);
        state.skip -= 1;
      }
    },

    //hủy kết bạn
    cancelFriendSaga: (state, action) => {
      //tạo một loading cho cái dữ liệu friend
      const { wallUserId: _id } = action.payload;
      updateFriendMethod(state, _id, { loading: true });
    },
    cancelFriend: (state, action) => {
      //xóa người bạn đó ra khỏi danh sách bạn bè
      const { _id } = action.payload;

      const friendIndex = state.friends.findIndex((item) => item._id === _id);
      if (friendIndex >= 0) {
        state.friends = state.friends.filter((item) => item._id !== _id);
      }
      //giảm skip danh sách bạn bè
      if(state.skip > 0){
        state.skip -= 1;
      }
    },

    followFriendSaga: (state, action) => {
      //tạo một loading cho cái dữ liệu friend
      const { wallUserId: _id } = action.payload;
      updateFriendMethod(state, _id, { loading: true });
    },
    unFollowFriendSaga: (state, action) => {
      //tạo một loading cho cái dữ liệu friend
      const { wallUserId: _id } = action.payload;
      updateFriendMethod(state, _id, { loading: true });
    },

    updateFriend: (state, action) => {
      
      const { _id, data } = action.payload;
      
      updateFriendMethod(state, _id, data);
    },

    //thiết lập loading cho dữ liệu friend
    setFriendCardLoading: (state, action) => {
      //tạo một loading cho cái dữ liệu friend
      const { wallUserId: _id, loadingVal } = action.payload;
      updateFriendMethod(state, _id, { loading:loadingVal });
    },

    setFriendListLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFriendListCanLoad: (state, action) => {
      state.canLoad = action.payload;
    },
    changeFriendListSkip: (state, action) => {
      state.skip += action.payload;
    },
   
    reset:(state, action) => {
      return initialState;
    }
  },
});

export const {
  fetchFriends,
  fetchFriendsSaga,
  cancelFriend,
  cancelFriendSaga,
  followFriendSaga,
  unFollowFriendSaga,
  updateFriend,
  setFriendCardLoading,
  setFriendListCanLoad,
  setFriendListLoading,
  changeFriendListSkip,
  addFriend,
  deleteFriend,
  reset,
} = friendListSlice.actions;

export default friendListSlice.reducer;
