import { takeEvery, call, put } from "redux-saga/effects";

//code của mình
import {
  fetchfriendsSent,
  fetchfriendsSentSaga,
  cancelFriendSent,
  cancelFriendSentSaga,
  changefriendListSentSkip,
  setFriendCardLoading,
  setfriendListSentCanLoad,
  setfriendListSentLoading,
  
} from "./slice";
import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";

import {
  fetchFriendsSentRequest,
  cancelFriendSentRequest,
} from "../../../api/user";

function* fetchFriendsSentWorker(action) {
  try {
    const resData = yield call(fetchFriendsSentRequest, action.payload);
    const { limit } = action.payload;
    const { friendsSent } = resData;
    if (friendsSent.length >= limit) {
      yield put(changefriendListSentSkip(limit));
    } else {
      yield put(setfriendListSentCanLoad(false));
    }

    yield put(fetchfriendsSent(resData));
  } catch (err) {
    yield call(showError, {
      title:
        "Đã xảy ra lỗi trong quá trình lấy danh sách lời mời kết bạn đã gửi",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setfriendListSentLoading(false));
  }
}

function* cancelFriendSentWorker(action) {
  const { wallUserId } = action.payload;
  try {
      const resData = yield call(cancelFriendSentRequest, action.payload);
      yield put(cancelFriendSent({_id: wallUserId}));
  } catch (err) {
    yield call(showError, {
      title:
        "Đã xảy ra lỗi trong quá trình hủy lời mời kết bạn",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setFriendCardLoading({ wallUserId, loadingVal: false }));
  }
}

export function* friendListSentSaga() {
  yield takeEvery(fetchfriendsSentSaga.toString(), fetchFriendsSentWorker);
  yield takeEvery(cancelFriendSentSaga.toString(),cancelFriendSentWorker);
}
