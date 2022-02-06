import { takeEvery, put, call } from "redux-saga/effects";
import { notification } from "antd";
//code của mình

import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";
import {
  searchUserToInvite,
  searchUserToInviteSaga,
  submitInviteUserForm,
  submitInviteUserFormSaga,
  setSearchLoading,
  setSubmitLoading,
  reset,
} from "./slice";

import {
  searchUsersToInviteToGroupRequest,
  inviteUserToGroupRequest,
} from "../../../api/group";

function* searchUserToInviteWoker(action) {
  try {
    const resData = yield call(
      searchUsersToInviteToGroupRequest,
      action.payload
    );

    yield put(searchUserToInvite(resData));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình tìm kiếm người dùng",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setSearchLoading(false));
  }
}

function* inviteUserToGroupWorker(action) {
  try {
    const resData = yield call(inviteUserToGroupRequest, action.payload);

    console.log(resData);

    //reset toàn bộ cái form modal
    yield put(reset());


    //hiện thông báo thành công
    notification.success({
      title: "Thông báo mời bạn vào nhóm",
      description: "Gửi lời mời tham gia nhóm thành công",
      placement: "bottomRight",
    });

    
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá mời người dùng vào nhóm",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setSubmitLoading(false));
  }
}

export function* inviteUserToGroupFormSaga() {
  yield takeEvery(searchUserToInviteSaga.toString(), searchUserToInviteWoker);
  yield takeEvery(submitInviteUserFormSaga.toString(), inviteUserToGroupWorker);
}
