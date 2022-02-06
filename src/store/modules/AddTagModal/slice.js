import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  friends: [],
};

const addTagModalSlice = createSlice({
  name: "addTagModal",
  initialState,
  reducers: {
    //lấy danh sách bạn bè để gắn thẻ
    fetchTagFriendsSaga: (state, action) => {
      state.loading = true;
    },
    fetchTagFriends: (state, action) => {
      state.friends = [...action.payload];

      state.loading = false;
    },
    //xóa một dữ liệu ra khỏi danh sách friends
    removeTagFriend: (state,action) => {
      const friendId = action.payload;
      const friendIndex = state.friends.findIndex(item=>item._id === friendId);
      if(friendIndex >= 0){
        state.friends.splice(friendIndex,1);
      }
    },
    setTagFriendsLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetTagFriendsState: (state) => {
      return initialState;
    },
  },
});

export const {
  fetchTagFriends,
  fetchTagFriendsSaga,
  removeTagFriend,
  setTagFriendsLoading,
  resetTagFriendsState,
} = addTagModalSlice.actions;

export default addTagModalSlice.reducer;
