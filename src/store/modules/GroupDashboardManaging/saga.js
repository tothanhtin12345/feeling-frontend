import { takeEvery, call, put } from "redux-saga/effects";
import { notification } from "antd";
//code của mình
import { showError } from "../../../utils/error/showError";
import { convertCodeToMessage } from "./handlError";
import {
  setNewGroupLoading,
  addNewGroupSaga,
  toggleNewGroupModal,
  addNewGroup,
  setGroupsManagingCanLoad,
  changeGroupsManagingSkip,
  fetchGroupsManging,
  fetchGroupsMangingSaga,
  setFetchGroupsManagingLoading,
  updateGroupInformationsSaga,
} from "./slice";
import {updateGroupDetails, toggleEditGroupInformationsModalVisible} from "../Groups/slice"
import { newGroupRequest, fetchGroupsManaging, updateGroupInformationsRequest } from "../../../api/group";

function* fetchGroupsManagingWorker(action) {
  try {
    //gửi yêu cầu fetch
    const resData = yield call(fetchGroupsManaging, action.payload);

    const { groups } = resData;

    //console.log(groups);

    const { limit } = action.payload;

    

    //kiểm tra số lượng trả về bé hơn limit không, nếu có thì set ngưng việc fetch ngược lại thì tăng limit
    if (groups.length < limit) {
      yield put(setGroupsManagingCanLoad(false));
    } 

    //cập nhật dữ liệu vào trong store
    yield put(fetchGroupsManging(groups));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình lấy dữ liệu",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setFetchGroupsManagingLoading(false));
  }
}

//thêm một nhóm mới
function* newGroupWorker(action) {
  try {
    //gửi yêu cầu tạo nhóm
    const resData = yield call(newGroupRequest, action.payload);
    //lấy ra dữ liệu
    const { group } = resData;

    //thêm dữ liệu vào trong store
    yield put(addNewGroup(group));

    //đóng form
    yield put(toggleNewGroupModal(false));

    //hiện thông báo thành công
    notification.success({
      title: "Thông báo tạo nhóm mới",
      description: "Bạn đã tạo thành công một nhóm mới",
      placement: "bottomRight",
    });
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình tạo nhóm mới",
      content: convertCodeToMessage(err),
    });
  } finally {
    //tắt loading lúc thêm
    yield put(setNewGroupLoading(false));
  }
}

function* updateGroupInformationsWorker(action) {
  try {
    const resData = yield call(updateGroupInformationsRequest, action.payload);
    
    //cập nhật vào store module groups
    yield put(updateGroupDetails(resData));

    //đóng cái form chỉnh sửa thông tin
    yield put(toggleEditGroupInformationsModalVisible(false));

    //hiện thông báo thành công
    notification.success({
      title: "Thông báo cập nhật thông tin nhóm",
      description: "Bạn đã cập nhật thông tin nhóm thành công",
      placement: "bottomRight",
    });
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình cập nhật thông tin nhóm",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setNewGroupLoading(false));
  }
}

export function* groupDashboardManagingSaga() {
  yield takeEvery(addNewGroupSaga.toString(), newGroupWorker);
  yield takeEvery(fetchGroupsMangingSaga.toString(), fetchGroupsManagingWorker);
  yield takeEvery(updateGroupInformationsSaga.toString(),updateGroupInformationsWorker);
}
