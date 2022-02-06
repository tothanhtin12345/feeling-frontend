import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //danh sách notifications
  notifications: [],
  loading: false,
  skip:0,
  limit: 10,
  canLoad: true,
};

const notifyWindowListSlice = createSlice({
  name: "notifyWindowList",
  initialState,
  reducers: {

    //fetch notifications
    fetchNotificationsSaga:(state,action) => {
      action.payload = {
        ...action.payload,
        skip: state.skip,
        limit: state.limit,
      }
      state.loading = true;
    },
    fetchNotifications:(state,action) => {
      
     
      state.notifications = [
        ...state.notifications,
        ...action.payload,
      ]
      state.loading = false;
    },

    //đánh dấu là đã đọc một thông báo cụ thể
    readNotificationSaga: (state, action) => {},
    readNotification: (state, action) => {
      const notificationIndex = state.notifications.findIndex(
        (item) => item._id === action.payload
      );
      if (notificationIndex >= 0) {
        state.notifications[notificationIndex].read = true;
      }
    },
    //thêm một notification vào mảng
    addNotification: (state, action) => {
      //tăng skip lên 1 để tránh sai xót dữ liệu
      state.skip += 1;
      state.notifications.unshift(action.payload);
      
    },
    //thay thế một notification và đưa nó lên đỉnh dầu
    replaceAndMoveAnotificationToTop:(state,action) => {
      const notification = action.payload;
      const index = state.notifications.findIndex((item)=>item._id === notification._id);
      //nếu nó có tồn tại thì xóa nó ra khỏi vị trí hiện tại
      if(index >=0){
        state.notifications.splice(index,1);
      }
      else{
        //nếu chưa có thì ta sẽ tiến hành thêm, do đó ta sẽ tăng skip trước
        state.skip += 1;
      }
      
      state.notifications.unshift(notification);

    },
    //xóa một notification
    deleteNotificationSaga: (state, action) => {},
    deleteNotification: (state, action) => {
      const notificationId = action.payload;
      const notificationIndex = state.notifications.findIndex(
        (item) => item._id === notificationId
      );
      if (notificationIndex >= 0) {
        state.notifications.splice(notificationIndex, 1);
      }
      //giảm skip đi 1 để tranh sai xót dữ liệu
      if(state.skip > 0){
        state.skip -= 1;
      }
    },
    //tăng (bỏ bào số dương) - giảm (bỏ vào số âm)
    changetNotifyWindowListSkip: (state,action) => {
      state.skip += action.payload;
    },
    setNotifyWindowListCanLoad: (state,action) => {
      state.canLoad = action.payload;
    },
  },
});

export const {
  readNotificationSaga,
  readNotification,
  addNotification,
  replaceAndMoveAnotificationToTop,
  deleteNotification,
  deleteNotificationSaga,
  setNotifyWindowListCanLoad,
  changetNotifyWindowListSkip,
  fetchNotificationsSaga,
  fetchNotifications,
} = notifyWindowListSlice.actions;

export default notifyWindowListSlice.reducer;
