import { takeEvery, put, call } from "redux-saga/effects";

//code của mình
import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";

import {
  fetchFriendsRequested,
  fetchFriendsRequestedSaga,
  acceptFriendRequested,
  acceptFriendRequestedSaga,
  cancelFriendRequested,
  cancelFriendRequestedSaga,
  changefriendListRequestedSkip,
  setFriendCardLoading,
  setfriendListRequestedCanLoad,
  setfriendListRequestedLoading,
} from "./slice";

import { addFriend } from "../FriendList/slice";

import {
  fetchFriendsRequestedRequest,
  acceptFriendRequest,
  cancelFriendRequested as cancelFriendRequestedRequest,
} from "../../../api/user";

function* fetchFriendsRequestedWorker(action) {
  try {
    const resData = yield call(fetchFriendsRequestedRequest, action.payload);
    console.log(resData);
    const { friendsRequested } = resData;
    const { limit } = action.payload;
    if (friendsRequested.length >= limit) {
      yield put(changefriendListRequestedSkip(limit));
    } else {
      yield put(setfriendListRequestedCanLoad(false));
    }

    yield put(fetchFriendsRequested(resData));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình lấy danh sách lời mời kết bạn",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setfriendListRequestedLoading(false));
  }
}

function* acceptFriendWorker(action) {
  const { wallUserId } = action.payload;
  try {
    const resData = yield call(acceptFriendRequest, action.payload);
    
    yield put(acceptFriendRequested({ _id: wallUserId }));
    //thêm vào danh sách bạn bè
    yield put(addFriend(resData))
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình chấp nhận yêu cầu kết bạn",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setFriendCardLoading({ wallUserId, loadingVal: false }));
  }
}

function* cancelFriendRequestedWorker(action) {
  const { wallUserId } = action.payload;
  try {
    const resData = yield call(cancelFriendRequestedRequest, action.payload);
    yield put(cancelFriendRequested({ _id: wallUserId }));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình từ chối yêu cầu kết bạn",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setFriendCardLoading({ wallUserId, loadingVal: false }));
  }
}

export function* friendListRequestedSaga() {
  yield takeEvery(
    fetchFriendsRequestedSaga.toString(),
    fetchFriendsRequestedWorker
  );
  yield takeEvery(acceptFriendRequestedSaga.toString(), acceptFriendWorker);
  yield takeEvery(cancelFriendRequestedSaga.toString(), cancelFriendRequestedWorker)
}
