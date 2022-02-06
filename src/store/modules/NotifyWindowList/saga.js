import { takeEvery, put, call } from "redux-saga/effects";

//code của mình
import {
  readNotificationSaga,
  readNotification,
  deleteNotification,
  deleteNotificationSaga,
  fetchNotifications,
  fetchNotificationsSaga,
  setNotifyWindowListCanLoad,
  changetNotifyWindowListSkip,
} from "./slice";
import { showError } from "../../../utils/error/showError";
import { convertCodeToMessage } from "./handleError";
import {
  readNotificationRequest,
  deleteNotificationRequest,
  fetchNotificationsRequest,
} from "../../../api/notification";

function* fetchNotificationWorker(action) {
  try {
    const { skip, limit } = action.payload;
    
    
    const resData = yield call(fetchNotificationsRequest, { skip, limit });
    const { notifications } = resData;
   
    //nếu lấy đủ số limit dữ liệu thì chuẩn bị giá trị skip cho lần tiếp theo
    if (notifications && notifications.length >= limit) {
      
      //tăng thêm 10 cho lần skip tiếp theo
      yield put(changetNotifyWindowListSkip(10));
    }
    //ngược lại không đủ => hết dữ liệu => ngừng skip
    else{
      yield put(setNotifyWindowListCanLoad(false));
    }
    //update trong store
    yield put(fetchNotifications(notifications))
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình đọc thông báo",
      content: convertCodeToMessage(err),
    });
  }
}

function* readNotificationWorker(action) {
  try {
    //_id là  của notification
    const _id = action.payload;
    const resData = yield call(readNotificationRequest, { _id });

    //cập nhật lại là đã đọc trong store
    yield put(readNotification(_id));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình đọc thông báo",
      content: convertCodeToMessage(err),
    });
  }
}

function* deleteNotificationWorker(action) {
  try {
    const notificationId = action.payload;
    const resData = yield call(deleteNotificationRequest, notificationId);
    //hàm đã //Giảm skip đi -1 khi xóa 1 notification để tránh sai xót dữ liệu
    yield put(deleteNotification(notificationId));
   
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình đọc thông báo",
      content: convertCodeToMessage(err),
    });
  }
}

export function* notifyWindowListSaga() {
  yield takeEvery(readNotificationSaga.toString(), readNotificationWorker);
  yield takeEvery(deleteNotificationSaga.toString(), deleteNotificationWorker);
  yield takeEvery(fetchNotificationsSaga.toString(), fetchNotificationWorker);
}
