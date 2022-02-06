import { takeLatest, put, call } from "redux-saga/effects";

//code của mình
import {
  fetchTagFriends,
  fetchTagFriendsSaga,
  setTagFriendsLoading,
} from "./slice";
import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";
import { fetchTagFriendsRequest } from "../../../api/user";

function* fetchTagFriendsWorker(action) {
  try {
    const { displayName, tags = [] } = action.payload;
    const limit = 10;
    const skip = 0;
    const resData = yield call(fetchTagFriendsRequest, displayName, tags, skip, limit);
    const { friends } = resData;
    yield put(fetchTagFriends(friends));
  } catch(err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình lấy danh sách bạn bè",
      content: convertCodeToMessage(err),
    });
    yield put(setTagFriendsLoading(false));
  }
}

export function* addTagModalSaga() {
  yield takeLatest(fetchTagFriendsSaga.toString(), fetchTagFriendsWorker);
}
