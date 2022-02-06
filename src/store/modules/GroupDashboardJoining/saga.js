import { takeEvery, call, put } from "redux-saga/effects";
import { notification } from "antd";
//code của mình

import { showError } from "../../../utils/error/showError";
import { convertCodeToMessage } from "./handleError";

import {
  fetchGroupsJoining,
  fetchGroupsJoiningSaga,
  setGroupsJoiningCanLoad,
  setGroupsJoiningFectchLoading,
  changeGroupJoiningSkip,
  outGroup,
  outGroupSaga,
  setShowOutConfirmModal,
  setGroupCardButtonLoading,
} from "./slice";

import { fetchGroupsJoiningRequest, outGroupRequest } from "../../../api/group";

function* fetchGroupsJoiningWorker(action) {
  try {
    console.log(action.payload);

    const resData = yield call(fetchGroupsJoiningRequest, action.payload);

    const { groups } = resData;

    const { limit } = action.payload;

    if (groups.length < limit) {
      yield put(setGroupsJoiningCanLoad(false));
    } 

    yield put(fetchGroupsJoining(groups));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình lấy danh sách nhóm đang tham gia",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setGroupsJoiningFectchLoading(false));
  }
}

function* outGroupWorker(action) {
  const { groupId } = action.payload;
  try {
    const  resData  = yield call(outGroupRequest, action.payload);

    console.log(resData);

    //cập nhật lại dữ liệu trong store

    yield put(outGroup({groupId}));

    //hiện thông báo thành công
    notification.success({
      title: "Thông báo rời nhóm",
      description: "Bạn đã rời nhóm thành công",
      placement: "bottomRight",
    });


  } catch (err) {
    //tắt loading ở group card button
    yield put(setGroupCardButtonLoading({ groupId, loadingVal: false }));

    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình rời khỏi nhóm",
      content: convertCodeToMessage(err),
    });
  } finally {
    //đóng modal xác nhận
    yield put(setShowOutConfirmModal({ groupId, showModal: false }));
  }
}

export function* groupDashboardJoiningSaga() {
  yield takeEvery(fetchGroupsJoiningSaga.toString(), fetchGroupsJoiningWorker);
  yield takeEvery(outGroupSaga.toString(), outGroupWorker);
}
