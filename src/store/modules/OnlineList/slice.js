import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //danh sách người dùng đang online
  users: [],
  //danh sách nhóm chat
  groups: [],
  groupsLoading: false,
};

const onlineListSlice = createSlice({
  name: "onlineList",
  initialState,
  reducers: {
    //fetch danh sách người dùng đang online (được thêm thông qua socket)
    //thông qua saga, ta fetch thêm các conversationId cho mỗi friend đang online
    fetchOnlineUsersSaga: (state, action) => {

    },
    fetchOnlineUsers: (state, action) => {
      state.users = [...state.users, ...action.payload];
    },

    //cũng tương tự như fetchOnlineUsersSaga - nhưng chỉ có một user thôi
    addOnlineUserSaga:(state,action) => {

    },

    //thêm một người mới online
    addOnlineUser: (state, action) => {
      const user = action.payload;
      //kiểm tra nếu đã tồn tại trong mảng rồi thì chỉ cập nhật trạng thái offline thành online thôi
      const userIndex = state.users.findIndex((item) => item._id === user._id);
      //nếu đã có trong mảng thì cập nhật lại trạng thái thành online
      if (userIndex >= 0) {
        state.users[userIndex].status = "online";
      }
      //nếu chưa thì thêm vào đỉnh mảng
      else {
        state.users.unshift(user);
      }
    },
    //biến một người từ online sang offline
    offlineUser: (state, action) => {
      const { userId, timeOff } = action.payload;
      const userIndex = state.users.findIndex((item) => item._id === userId);
      if (userIndex >= 0) {
        state.users[userIndex].status = "offline";
        //thêm thời gian mà người dùng bắt đầu offline
        state.users[userIndex].timeOff = timeOff;
      }
    },

    //fetch danh sách nhóm chat đang có (mặc định tất cả group chat mà người dùng tham gia là online) (thông qua saga)
    fetchOnlineGroupsChatSaga: (state, action) => {
      state.groupsLoading = true;
    },
    fetchOnlineGroupsChat: (state, action) => {
      state.groups = [...state.groups, ...action.payload];
      state.groupsLoading = false;
    },
    //thêm một nhóm chat vào
    addOnlineGroupChat: (state, action) => {
      state.groups.push(action.payload);
    },
    //xóa một group chat
    deleteOnlineGroupChat: (state, action) => {
      const group = action.payload;
      const groupIndex = state.groups.findIndex(
        (item) => item._id === group._id
      );
      if (groupIndex >= 0) {
        state.groups.splice(groupIndex, 1);
      }
    },
    setGroupsLoading: (state, action) => {
      state.groupsLoading = action.payload;
    },
    resetOnlineGroups: (state) => {
      state.groups = [];
    }
  },
});

export const {
  fetchOnlineGroupsChat,
  fetchOnlineGroupsChatSaga,
  fetchOnlineUsers,
  addOnlineGroupChat,
  addOnlineUser,
  offlineUser,
  deleteOnlineGroupChat,
  fetchOnlineUsersSaga,
  addOnlineUserSaga,
  setGroupsLoading,
  resetOnlineGroups,
} = onlineListSlice.actions;

export default onlineListSlice.reducer;
