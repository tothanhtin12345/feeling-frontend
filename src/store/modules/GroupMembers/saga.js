import { takeEvery, put, call, takeLatest } from "redux-saga/effects";

//code của mình
import {
  fetchGroupMembersSaga,
  fetchGroupmembers,
  changeGroupMembersSkip,
  setGroupMembersCanLoad,
  setGroupMembersLoading,
  setCardButtonLoading,
  setInspectorRoleSaga,
  setInspectorRole,
  unSetInspectorRole,
  unSetInspectorRoleSaga,
  dismissMember,
  dismissMemberSaga,
  setShowConFirmDismissModal,
} from "./slice";

import {
  fetchGroupMembersRequest,
  setInspectorRoleRequest,
  unSetInspectorRoleRequest,
  dismissMemberRequest,
} from "../../../api/group";
import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";

function* fetchGroupMembersWorker(action) {
  try {
    const resData = yield call(fetchGroupMembersRequest, action.payload);

    const { members, groupId } = resData;

    const { limit } = action.payload;

    
    if (members.length >= limit) {
      yield put(changeGroupMembersSkip(limit));
    } else {
      yield put(setGroupMembersCanLoad(false));
    }

    yield put(fetchGroupmembers(members));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình lấy dữ liệu",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setGroupMembersLoading(false));
  }
}

function* setInspecRoleWorker(action) {
  const { userId, groupId } = action.payload;
  try {

    const resData = yield call(setInspectorRoleRequest,action.payload);

    yield put(setInspectorRole(resData));

  } catch (err) {

    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình ủy quyền",
      content: convertCodeToMessage(err),
    });

  }
  finally{
    yield put(setCardButtonLoading({ userId, loadingVal: false }));
  }
}

function* unSetInspectorWorker(action){
  const { userId, groupId } = action.payload;
  try {

    const resData = yield call(unSetInspectorRoleRequest,action.payload);

    yield put(unSetInspectorRole(resData));

  } catch (err) {

    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình bãi quyền",
      content: convertCodeToMessage(err),
    });

  }
  finally{
    yield put(setCardButtonLoading({ userId, loadingVal: false }));
  }
}

function* dismissMemberWorker(action){
  const { userId, groupId } = action.payload;
  try{
    const resData = yield call(dismissMemberRequest, action.payload);
    yield put(dismissMember(resData));
  }
  catch(err){
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình mời thành viên ra khỏi nhóm",
      content: convertCodeToMessage(err),
    });
  }
  finally{
    //đóng cái form xác nhận
    yield put(setShowConFirmDismissModal({userId, showModal: false}));
    yield put(setCardButtonLoading({ userId, loadingVal: false }));
  }
}

export function* groupMembersSaga() {
  yield takeLatest(fetchGroupMembersSaga.toString(), fetchGroupMembersWorker);
  yield takeEvery(setInspectorRoleSaga.toString(),setInspecRoleWorker);
  yield takeEvery(unSetInspectorRoleSaga.toString(),unSetInspectorWorker);
  yield takeEvery(dismissMemberSaga.toString(), dismissMemberWorker)
}
