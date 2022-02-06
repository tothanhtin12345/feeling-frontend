import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  changePasswordFormModalVisible: false,
  informationFormModalVisible: false,
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const userData = action.payload;
      state.user = userData;
      if (userData) {
        state.user.unread = [];
      }
    },
    //hàm này sẽ set đối tượng Token (bao gồm access_token, thời hạn, refresh_token,...)
    setToken: (state, action) => {
      if (state.user) {
        state.user.token = action.payload;
      }
    },
    updateAvatar: (state, action) => {
      state.user.avatar = action.payload;
    },
    updateCover: (state, action) => {
      state.user.cover = action.payload;
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },

    updateFriendsUser: (state, action) => {
      if (!state.user.friends || state.user.friends.length < 0) return;

      const { wallUserId: _id } = action.payload;
      const friendIndex = state.user.friends.findIndex(
        (item) => item._id === _id
      );
      if (friendIndex >= 0) {
        delete action.payload["wallUserId"];
        const friend = state.user.friends[friendIndex];
        state.user.friends[friendIndex] = {
          ...friend,
          ...action.payload,
        };
      }
    },

    //đọc một tin nhắn - hay có thể hiểu là giảm một đơn vị của unReadNotificationCount trên server
    readANotificationSaga: (state) => {},
    //đọc tất cả tin nhắn - hay có thể hiểu là set unReadNotificationCount trên server
    readAllNotificationSaga: (state) => {},

    //set số lượng thông báo chưa đọc
    setUnReadNotificationCount: (state, action) => {
      state.user.unReadNotificationCount = action.payload;
    },
    //tăng - giảm số lượng thông báo mới chưa đọc
    changeUnReadNotificationCount: (state, action) => {
      //nếu tăng thì action.payload = 1 ngược lại là -1
      state.user.unReadNotificationCount += action.payload;
    },

    //thiết lập mảng unread - các phòng có tin nhắn mà mình chưa đọc
    fetchUnread: (state, action) => {
      const idList = [];
      action.payload.forEach(item=>idList.push(item._id));
      state.user.unread = [
        ...idList
      ];
    },
    //add unread
    addUnread: (state, action) => {
      const conversationId = action.payload;

      //nếu chưa có mới thêm
      const conversationIndex = state.user.unread.findIndex(
        (item) => item === conversationId
      );
      if (conversationIndex < 0) {
        //payload là id của phòng chưa đọc
        state.user.unread.unshift(conversationId);
      }
    },
    //delete unread: ()
    deleteUnread: (state, action) => {
      const conversationId = action.payload;
      
      const conversationIndex = state.user.unread.findIndex(
        (item) => item === conversationId
      );

      const testArr = state.user.unread.filter(item=>true);

    
      if(conversationIndex >= 0){
       
        state.user.unread.splice(conversationIndex,1);
      }
    },

    toggleChangePasswordFormModalVisible: (state, action) => {
      if (action.payload) {
        state.changePasswordFormModalVisible = action.payload;
      } else {
        state.changePasswordFormModalVisible =
          !state.changePasswordFormModalVisible;
      }
    },

    toggleInformationFormModalVisible: (state, action) => {
      if (action.payload) {
        state.informationFormModalVisible = action.payload;
      } else {
        state.informationFormModalVisible = !state.informationFormModalVisible;
      }
    },
  },
});

export const {
  setUser,
  setToken,
  toggleChangePasswordFormModalVisible,
  toggleInformationFormModalVisible,
  updateAvatar,
  updateCover,
  updateUser,
  updateFriendsUser,
  readANotificationSaga,
  readAllNotificationSaga,
  setUnReadNotificationCount,
  changeUnReadNotificationCount,
  deleteUnread,
  addUnread,
  fetchUnread,
} = userSlice.actions;

export default userSlice.reducer;
