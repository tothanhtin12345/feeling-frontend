import { takeEvery, call, put, take } from "redux-saga/effects";

//code của mình
import {
  fetchGroupsSent,
  fetchGroupsSentSaga,
  cancelJoiningRequestSaga,
  cancelJoiningRequest,
  setGroupCardButtonLoading,
  setFetchGroupSentLoading,
  setGroupsSentCanLoad,
  changeGroupSentSkip,
} from "./slice";

import { showError } from "../../../utils/error/showError";
import { convertCodeToMessage } from "./handleError";

import { fetchGroupsSentRequest, cancelJoinGroupRequeset } from "../../../api/group";

function* fetchGroupsSentWorker(action) {
  try {
    const resData = yield call(fetchGroupsSentRequest, action.payload);

    const { groups } = resData;

    const { limit } = action.payload;

    if (groups.length < limit) {
      yield put(setGroupsSentCanLoad(false));
    } 

    yield put(fetchGroupsSent(groups));
  } catch (err) {
    yield call(showError, {
      title:
        "Đã xảy ra lỗi trong quá trình lấy danh sách nhóm đã gửi yêu cầu tham gia",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setFetchGroupSentLoading(false));
  }
}

function* cancelJoiningRequestWorker(action) {
  try {

    const resData = yield call(cancelJoinGroupRequeset,action.payload);

    yield put(cancelJoiningRequest(resData));

  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình hủy yêu cầu tham gia nhóm",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setGroupCardButtonLoading(false));
  }
}

export function* groupsDashboardSentSaga() {
  yield takeEvery(fetchGroupsSentSaga.toString(), fetchGroupsSentWorker);
  yield takeEvery(cancelJoiningRequestSaga.toString(),cancelJoiningRequestWorker);
}
