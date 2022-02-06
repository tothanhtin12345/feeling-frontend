import { takeEvery, put, call } from "@redux-saga/core/effects";

//code của mình
import { readANotificationSaga,readAllNotificationSaga } from "./slice";
import { readANotificationRequest, readAllNotificationRequest } from "../../../api/user";
import {changeUnReadNotificationCount, setUnReadNotificationCount} from '../User/slice';
import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";

function* readANotificationWorker() {
  try {
    const resData = yield call(readANotificationRequest);
    
    //giảm đi 1 trong store
    yield put(changeUnReadNotificationCount(-1));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình đọc thông báo",
      content: convertCodeToMessage(err),
    });
  }
}

function* readAllNotificationWorker() {
  try {
    const resData = yield call(readAllNotificationRequest);
   
    //set giá trị unReadNotificationCount trong store = 0
    yield put(setUnReadNotificationCount(0));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình đọc thông báo",
      content: convertCodeToMessage(err),
    });
  }
}

export function* userSaga() {
  yield takeEvery(readANotificationSaga.toString(), readANotificationWorker);
  yield takeEvery(readAllNotificationSaga.toString(), readAllNotificationWorker);
}
