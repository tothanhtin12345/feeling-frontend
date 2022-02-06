import { takeLatest, put, call, takeEvery } from "redux-saga/effects";

//code của mình
import {
  fetchWallFriends,
  fetchWallFriendsSaga,
  fetchWallFriendsRequested,
  fetchWallFriendsRequestedSaga,
  fetchWallFriendsSent,
  fetchWallFriendsSentSaga,
  changeWallFriendsSkip,
  changeWallFriendsRequestedSkip,
  changeWallFriendsSentSkip,
  setWallFriendsCanLoad,
  setWallFriendsRequestedCanLoad,
  setWallFriendsSentCanLoad,
  updateWallFriend,
  updateWallFriendRequested,
  updateWallFriendSent,
  sendWallFriendRequestSaga,
  cancelWallFriendRequestedSaga,
  cancelWallFriendSentSaga,
  followWallUserSaga,
  unFollowWallUserSaga,
  acceptWallFriendRequestedSaga,
  cancelWallFriendSaga,
} from "./slice";

import {
  fetchFriendsRequest,
  fetchFriendsRequestedRequest,
  fetchFriendsSentRequest,
  sendFriendRequest,
  cancelFriendSentRequest,
  cancelFriendRequested,
  followUserRequest,
  unFollowUserRequest,
  acceptFriendRequest,
  cancelFriendRequest,
} from "../../../api/user";
import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";

function* fetchWallFriendsWorker(action) {
  try {
    const limit = 8;
    const { skip, userId, displayName } = action.payload;

    const resData = yield call(fetchFriendsRequest, {
      skip,
      userId,
      limit,
      displayName,
    });
    const { friends } = resData;

    //nếu đủ số limit dữ liệu thì tiếp tục tăng skip
    if (friends.length >= limit) {
      yield put(changeWallFriendsSkip(limit));
    }
    //ngược lại thì set canLoad = false
    else {
      yield put(setWallFriendsCanLoad(false));
    }

    //update trong store
    yield put(fetchWallFriends(friends));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình lấy dữ liệu bạn bè",
      content: convertCodeToMessage(err),
    });
  }
}

function* fetchWallFriendsRequestedWorker(action) {
  try {
    const limit = 8;
    const { skip, userId, displayName } = action.payload;
    const resData = yield call(fetchFriendsRequestedRequest, {
      skip,
      userId,
      limit,
      displayName,
    });
    const { friendsRequested } = resData;

    //nếu đủ số limit dữ liệu thì tiếp tục tăng skip
    if (friendsRequested.length >= limit) {
      yield put(changeWallFriendsRequestedSkip(limit));
    }
    //ngược lại thì set canLoad = false
    else {
      yield put(setWallFriendsRequestedCanLoad(false));
    }
    //update trong store
    yield put(fetchWallFriendsRequested(friendsRequested));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình lấy dữ liệu bạn bè",
      content: convertCodeToMessage(err),
    });
  }
}

function* fetchWallFriendsSentWorker(action) {
  try {
    const limit = 8;
    const { skip, userId, displayName } = action.payload;

    const resData = yield call(fetchFriendsSentRequest, {
      skip,
      userId,
      limit,
      displayName,
    });
    const { friendsSent } = resData;

    //nếu đủ số limit dữ liệu thì tiếp tục tăng skip
    if (friendsSent.length >= limit) {
      yield put(changeWallFriendsSentSkip(limit));
    }
    //ngược lại thì set canLoad = false
    else {
      yield put(setWallFriendsSentCanLoad(false));
    }
    //update trong store
    yield put(fetchWallFriendsSent(friendsSent));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình lấy dữ liệu bạn bè",
      content: convertCodeToMessage(err),
    });
  }
}

function* sendWallFriendRequestWorker(action) {
  try {
    //wallUsreId là của người dùng đang tương tác
    const { wallUserId } = action.payload;

    const resData = yield call(sendFriendRequest, { wallUserId });
    //update trong store
    yield put(updateWallFriend({ isSent: true, _id: wallUserId }));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình gửi lời mời kết bạn",
      content: convertCodeToMessage(err),
    });
  }
}

function* cancelWallFriendRequestedWorker(action) {
  try {
    //wallUsreId là của người dùng đang tương tác
    const { wallUserId } = action.payload;

    const resData = yield call(cancelFriendRequested, { wallUserId });

    yield put(
      updateWallFriendRequested({ _id: wallUserId, isRequested: false })
    );
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình từ chối yêu cầu kết bạn",
      content: convertCodeToMessage(err),
    });
  }
}

function* cancelWallFriendSentWorker(action) {
  try {
    //wallUsreId là của người dùng đang tương tác
    const { wallUserId } = action.payload;
    console.log(action.payload);
    const resData = yield call(cancelFriendSentRequest, { wallUserId });
    //update trong store
    yield put(updateWallFriend({ isSent: false, _id: wallUserId }));

    yield put(updateWallFriendSent({ _id: wallUserId, isSent: false }));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình hủy yêu cầu kết bạn",
      content: convertCodeToMessage(err),
    });
  }
}

function* followWallUserWorker(action) {
  try {
    //payload chứa id người dùng muốn gửi yêu cầu
    const { wallUserId } = action.payload;

    const resData = yield call(followUserRequest, { wallUserId });
    //update trong store
    yield put(updateWallFriend({ isFollow: true, _id: wallUserId }));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình theo dõi người dùng",
      content: convertCodeToMessage(err),
    });
  }
}

function* unFollowWallUserWorker(action) {
  try {
    //payload chứa id người dùng muốn gửi yêu cầu
    const { wallUserId } = action.payload;

    const resData = yield call(unFollowUserRequest, { wallUserId });

    //update trong store
    yield put(updateWallFriend({ isFollow: false, _id: wallUserId }));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình hủy theo dõi người dùng",
      content: convertCodeToMessage(err),
    });
  }
}

function* acceptWallFriendRequestedWorker(action) {
  try {
    //wallUsreId là của người dùng đang tương tác
    const { wallUserId } = action.payload;

    const resData = yield call(acceptFriendRequest, { wallUserId });

    yield put(
      updateWallFriendRequested({ _id: wallUserId, isRequested: false })
    );
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình chấp nhận yêu cầu kết bạn",
      content: convertCodeToMessage(err),
    });
  }
}

function* cancelWallFriendWorker(action) {
  try {
    //payload chứa id người dùng muốn gửi yêu cầu
    const { wallUserId, isWallOfCurrentUser } = action.payload;

    const resData = yield call(cancelFriendRequest, { wallUserId });

    //update trong store - dùng giá trị isWallOfCurrentUser để xét một số điều kiện
    yield put(
      updateWallFriend({ isFriend: false, isFollow: false, _id: wallUserId, isWallOfCurrentUser })
    );
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình hủy kết bạn",
      content: convertCodeToMessage(err),
    });
  }
}

export function* wallFriendsSaga() {
  yield takeLatest(fetchWallFriendsSaga.toString(), fetchWallFriendsWorker);
  yield takeLatest(
    fetchWallFriendsRequestedSaga.toString(),
    fetchWallFriendsRequestedWorker
  );
  yield takeLatest(
    fetchWallFriendsSentSaga.toString(),
    fetchWallFriendsSentWorker
  );

  yield takeEvery(
    sendWallFriendRequestSaga.toString(),
    sendWallFriendRequestWorker
  );
  yield takeEvery(
    cancelWallFriendRequestedSaga.toString(),
    cancelWallFriendRequestedWorker
  );
  yield takeEvery(
    cancelWallFriendSentSaga.toString(),
    cancelWallFriendSentWorker
  );
  yield takeEvery(followWallUserSaga.toString(), followWallUserWorker);
  yield takeEvery(unFollowWallUserSaga.toString(), unFollowWallUserWorker);
  yield takeEvery(
    acceptWallFriendRequestedSaga.toString(),
    acceptWallFriendRequestedWorker
  );
  yield takeEvery(cancelWallFriendSaga.toString(), cancelWallFriendWorker);
}
