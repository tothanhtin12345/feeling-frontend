import { takeEvery, put, call } from "redux-saga/effects";

//code của mình
import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";
import {
  fetchFriends,
  fetchFriendsSaga,
  followFriendSaga,
  unFollowFriendSaga,
  cancelFriend,
  cancelFriendSaga,
  updateFriend,
  setFriendCardLoading,
  setFriendListCanLoad,
  setFriendListLoading,
  changeFriendListSkip,
} from "./slice";

import {
  fetchFriendsRequest,
  followUserRequest,
  unFollowUserRequest,
  cancelFriendRequest,
} from "../../../api/user";

function* fetchFriendsWorker(action) {
  try {
    const resData = yield call(fetchFriendsRequest, action.payload);

    const { limit } = action.payload;
    const { friends } = resData;
    if (friends.length >= limit) {
      yield put(changeFriendListSkip(limit));
    } else {
      yield put(setFriendListCanLoad(false));
    }
    yield put(fetchFriends(resData));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình lấy danh sách bạn bè",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setFriendListLoading(false));
  }
}

function* followFriendWorker(action) {
  const { wallUserId } = action.payload;
  try {
    const resData = yield call(followUserRequest, action.payload);

    yield put(updateFriend({ data: { isFollow: true }, _id: wallUserId }));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình theo dõi bạn bè",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setFriendCardLoading({ wallUserId, loadingVal: false }));
  }
}

function* unFollowFriendWorker(action) {
  const { wallUserId } = action.payload;
  try {
    const resData = yield call(unFollowUserRequest, action.payload);

    yield put(updateFriend({ data: { isFollow: false }, _id: wallUserId }));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình hủy theo dõi bạn bè",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setFriendCardLoading({ wallUserId, loadingVal: false }));
  }
}

function* cancelFriendWorker(action) {
  const { wallUserId } = action.payload;
  try {
    const resData = yield call(cancelFriendRequest,action.payload);
    yield put(cancelFriend({_id:wallUserId}))
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình hủy kết bạn",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setFriendCardLoading({ wallUserId, loadingVal: false }));
  }
}

export function* friendListSaga() {
  yield takeEvery(fetchFriendsSaga.toString(), fetchFriendsWorker);
  yield takeEvery(followFriendSaga.toString(), followFriendWorker);
  yield takeEvery(unFollowFriendSaga.toString(), unFollowFriendWorker);
  yield takeEvery(cancelFriendSaga.toString(), cancelFriendWorker);
}
