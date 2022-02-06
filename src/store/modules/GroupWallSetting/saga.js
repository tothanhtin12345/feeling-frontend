import { takeEvery, put, call } from "redux-saga/effects";

//code của mình
import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";
import {
  joinGroupRequest,
  cancelJoinGroupRequeset,
  outGroupRequest,
  deleteGroupRequest,
} from "../../../api/group";
import { notification } from "antd";

import {
  joinGroupSaga,
  joinGroupCompleted,
  cancelJoinGroupCompleted,
  cancelJoinGroupSaga,
  outGroupSaga,
  toggleOutGroupConfirmModalVisible,
  setOutGroupConfirmModalLoading,
  toggleDeleteGroupConfirmModalVisible,
  setDeleteGroupConfirmModalLoading,
  deleteGroupSaga,
} from "./slice";

import { updateGroupDetails, reset } from "../Groups/slice";

import history from "../../../utils/history";

function* joinGroupWorker(action) {
  try {
    //gửi request yêu cầu tham gia
    const resData = yield call(joinGroupRequest, action.payload);

    //cập nhật vào dữ liệu group details của group mà người dùng đang xem
    yield put(updateGroupDetails(resData));
  } catch (error) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá gửi yêu cầu tham gia nhóm",
      content: convertCodeToMessage(error),
    });
  } finally {
    //gọi hàm đã gửi yêu cầu xong để nó set lại các giá trị loadin thành false
    yield put(joinGroupCompleted());
  }
}

function* cancelJoinGroupWorker(action) {
  try {
    //gửi request yêu cầu tham gia
    const resData = yield call(cancelJoinGroupRequeset, action.payload);

    //cập nhật vào dữ liệu group details của group mà người dùng đang xem
    yield put(updateGroupDetails(resData));
  } catch (error) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình hủy yêu cầu tham gia nhóm",
      content: convertCodeToMessage(error),
    });
  } finally {
    //gọi hàm đã gửi yêu cầu xong để nó set lại các giá trị loadin thành false
    yield put(cancelJoinGroupCompleted());
  }
}

function* outGroupWorker(action) {
  try {
    const resData = yield call(outGroupRequest, action.payload);

    console.log(resData);

    //cập nhật lại dữ liệu trong details của nhóm
    yield put(updateGroupDetails(resData));

    notification.success({
      title: "Thông báo rời khỏi nhóm",
      description: "Bạn đã rời khỏi nhóm thành công",
      placement: "bottomRight",
    });
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình rời nhóm",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(toggleOutGroupConfirmModalVisible(false));
    yield put(setOutGroupConfirmModalLoading(false));
  }
}

function* deleteGroupWorker(action) {
  try {

    console.log(action.payload)

    const resData = yield call(deleteGroupRequest, action.payload);

    //điều hướng người dùng đến trang group manager
    history.push("/groups/dashboard/managing");

    //reset cái store của group
    yield put(reset());

    //hiển thị thông báo
    notification.success({
      title: "Thông báo xóa nhóm",
      description: "Nhóm của bạn đã được xóa",
      placement: "bottomRight",
    });
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình xóa nhóm",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(toggleDeleteGroupConfirmModalVisible(false));
    yield put(setDeleteGroupConfirmModalLoading(false));
  }
}

export function* groupWallSettingSaga() {
  yield takeEvery(joinGroupSaga.toString(), joinGroupWorker);
  yield takeEvery(cancelJoinGroupSaga.toString(), cancelJoinGroupWorker);
  yield takeEvery(outGroupSaga.toString(), outGroupWorker);
  yield takeEvery(deleteGroupSaga.toString(), deleteGroupWorker);
}
