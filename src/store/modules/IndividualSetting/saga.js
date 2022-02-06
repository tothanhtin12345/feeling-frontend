import { takeEvery, put, call } from "redux-saga/effects";

//code của mình
import {
  sendFriendRequest,
  cancelFriendSentRequest,
  cancelFriendRequested,
  followUserRequest,
  unFollowUserRequest,
  acceptFriendRequest,
  cancelFriendRequest,
} from "../../../api/user";
import {
  sendFriendRequestSaga,
  cancelFriendRequestedSaga,
  cancelFriendSentSaga,
  cancelFriendSaga,
  acceptFriendRequestedSaga,
  followUserSaga,
  unFollowUserSaga,
  setIndividualSettingLoading,
  setShowCancelFriendConfirmModal,
} from "./slice";
import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";

import { updateWallUser } from "../Wall/slice";
import { updateFriendsUser } from "../User/slice";

//gửi lời mời kết bạn
function* sendFriendRequestWorker(action) {
  try {
    //payload chứa id người dùng muốn gửi yêu cầu
    const { wallUserId } = action.payload;
    console.log(wallUserId);
    const resData = yield call(sendFriendRequest, { wallUserId });
    //update wall user
    yield put(updateWallUser({ isSent: true }));
    //update trong danh sách bạn của người dùng (sẽ làm sau - dựa theo wallUserId)
    yield put(updateFriendsUser({ isSent: true, wallUserId }));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình gửi lời mời kết bạn",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setIndividualSettingLoading(false));
  }
}

//hủy yêu cầu kết bạn của người khác đến mình
function* cancelFriendRequestedWorker(action) {
  try {
    //payload chứa id người dùng muốn gửi yêu cầu
    const { wallUserId } = action.payload;
    const resData = yield call(cancelFriendRequested, { wallUserId });
    //update wall user
    yield put(updateWallUser({ isRequested: false }));
    //update trong danh sách bạn của người dùng (sẽ làm sau - dựa theo wallUserId)
    yield put(updateFriendsUser({ isRequested: false, wallUserId }));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình từ chối yêu cầu kết bạn",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setIndividualSettingLoading(false));
  }
}

//hủy yêu cầu kết bạn đã gửi
function* cancelFriendSentWorker(action) {
  try {
    //payload chứa id người dùng muốn gửi yêu cầu
    const { wallUserId } = action.payload;
    const resData = yield call(cancelFriendSentRequest, { wallUserId });
    //update wall user
    yield put(updateWallUser({ isSent: false }));
    //update trong danh sách bạn của người dùng (sẽ làm sau - dựa theo wallUserId)
    yield put(updateFriendsUser({ isSent: false, wallUserId }));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình hủy yêu cầu kết bạn",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setIndividualSettingLoading(false));
    
  }
}

//theo dõi người dùng
function* followUserWorker(action) {
  try {
    //payload chứa id người dùng muốn gửi yêu cầu
    const { wallUserId } = action.payload;

    const resData = yield call(followUserRequest, { wallUserId });
    //update wall user
    yield put(updateWallUser({ isFollow: true }));
    //update trong danh sách bạn của người dùng (sẽ làm sau - dựa theo wallUserId)
    yield put(updateFriendsUser({ isFollow: true, wallUserId }));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình theo dõi người dùng",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setIndividualSettingLoading(false));
  }
}

//hủy theo dõi người dùng
function* unFollowUserWorker(action) {
  try {
    //payload chứa id người dùng muốn gửi yêu cầu
    const { wallUserId } = action.payload;
    const resData = yield call(unFollowUserRequest, { wallUserId });
    //update wall user
    yield put(updateWallUser({ isFollow: false }));
    //update trong danh sách bạn của người dùng (sẽ làm sau - dựa theo wallUserId)
    yield put(updateFriendsUser({ isFollow: false, wallUserId }));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình hủy theo dõi người dùng",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setIndividualSettingLoading(false));
  }
}

function* acceptFriendWorker(action) {
  try {
    //payload chứa id người dùng muốn gửi yêu cầu
    const { wallUserId } = action.payload;
    const resData = yield call(acceptFriendRequest, { wallUserId });
    //update wall user
    yield put(
      updateWallUser({
        isFriend: true,
        isRequested: false,
        isSent: false,
        isFollow: true,
      })
    );
    //update trong danh sách bạn của người dùng (sẽ làm sau - dựa theo wallUserId)
    yield put(
      updateFriendsUser({
        isFriend: true,
        isRequested: false,
        isSent: false,
        isFollow: true,
        wallUserId,
      })
    );
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình chấp nhận yêu cầu kết bạn",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setIndividualSettingLoading(false));
  }
}

function* cancelFriendWorker(action) {
  try {
    //payload chứa id người dùng muốn gửi yêu cầu
    const { wallUserId } = action.payload;
    const resData = yield call(cancelFriendRequest, { wallUserId });
    //update wall user
    yield put(updateWallUser({ isFriend: false, isFollow: false }));
    //update trong danh sách bạn của người dùng (sẽ làm sau - dựa theo wallUserId)
    yield put(
      updateFriendsUser({ isFriend: false, isFollow: false, wallUserId })
    );
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình hủy kết bạn",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setIndividualSettingLoading(false));
    yield put(setShowCancelFriendConfirmModal(false));
  }
}

export function* individualSettingSaga() {
  yield takeEvery(sendFriendRequestSaga.toString(), sendFriendRequestWorker);
  yield takeEvery(
    cancelFriendRequestedSaga.toString(),
    cancelFriendRequestedWorker
  );
  yield takeEvery(cancelFriendSentSaga.toString(), cancelFriendSentWorker);
  yield takeEvery(followUserSaga.toString(), followUserWorker);
  yield takeEvery(unFollowUserSaga.toString(), unFollowUserWorker);
  yield takeEvery(acceptFriendRequestedSaga.toString(), acceptFriendWorker);
  yield takeEvery(cancelFriendSaga.toString(), cancelFriendWorker);
}
