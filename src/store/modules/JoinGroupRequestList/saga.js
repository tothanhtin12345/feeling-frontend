import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

//code của mình
import { showError } from "../../../utils/error/showError";
import { convertCodeToMessage } from "./handleError";

import {
  fetchJoinGroupRequestListSaga,
  fetchJoinGroupRequestList,
  setJoinGroupRequestListLoading,
  setJoinGroupRequestListCanLoad,
  changeJoinGroupRequestListSkip,
  setCardButtonLoading,
  denyJoinGroupRequest,
  denyJoinGroupRequestSaga,
  acceptJoinGroupRequest,
  acceptJoinGroupRequestSaga,
} from "./slice";

import {
  fetchJoinGroupRequestListRequest,
  denyJoinGroupRqRequest,
  acceptJoinGroupRqRequest,
} from "../../../api/group";

import {addGroupMember} from "../GroupMembers/slice";

function* fetchJoinGroupRequestListWorker(action) {
  try {
    const resData = yield call(
      fetchJoinGroupRequestListRequest,
      action.payload
    );

    const { joinGroupRequestList } = resData;

    const { limit } = action.payload;

    console.log(joinGroupRequestList)

    console.log(joinGroupRequestList.length );

    if (joinGroupRequestList.length >= limit) {
      yield put(changeJoinGroupRequestListSkip(limit));
    } else {
      yield put(setJoinGroupRequestListCanLoad(false));
    }

    yield put(fetchJoinGroupRequestList(joinGroupRequestList));
  } catch (err) {
    yield call(showError, {
      title:
        "Đã xảy ra lỗi trong quá trình lấy dữ liệu những người dùng yêu cầu tham gia nhóm",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setJoinGroupRequestListLoading(false));
  }
}

function* denyJoinGroupRequestWorker(action) {
  const { userId } = action.payload;
  try {
    const resData = yield call(denyJoinGroupRqRequest, action.payload);

    //cập nhật vào trong store
    yield put(denyJoinGroupRequest(resData));
  } catch (err) {
    //xảy ra lỗi thì ta cũng set lại cái card button loading
    yield put(setCardButtonLoading({ userId, loadingVal: false }));
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình từ chối yêu cầu người dùng",
      content: convertCodeToMessage(err),
    });
  }
}

function* acceptJoinGroupRequestWorker(action) {
  const { userId } = action.payload;
  try {
    const resData = yield call(acceptJoinGroupRqRequest, action.payload);

    //cập nhật vào trong store
    yield put(acceptJoinGroupRequest(resData));

    //thêm vào danh sách hiện tại
    yield put(addGroupMember(resData));

  } catch (err) {
    //xảy ra lỗi thì ta cũng set lại cái card button loading
    yield put(setCardButtonLoading({ userId, loadingVal: false }));
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình chấp nhận yêu cầu người dùng",
      content: convertCodeToMessage(err),
    });
  }
}

export function* joinGroupRequestListSaga() {
  yield takeLatest(
    fetchJoinGroupRequestListSaga.toString(),
    fetchJoinGroupRequestListWorker
  );
  yield takeEvery(
    denyJoinGroupRequestSaga.toString(),
    denyJoinGroupRequestWorker
  );

  yield takeEvery(
    acceptJoinGroupRequestSaga.toString(),
    acceptJoinGroupRequestWorker
  );
}
