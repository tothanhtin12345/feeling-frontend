import { takeEvery, put, call } from "redux-saga/effects";

//code của mình

import { showError } from "../../../utils/error/showError";
import { convertCodeToMessage } from "./handleError";

import {
  fetchTableData,
  fetchTableDataSaga,
  setManagerTableLoading,
} from "./slice";

import {
  fetchGroupsManagerRequest,
  fetchPostsManagerRequest,
  fetchUsersManagerRequest,
} from "../../../api/manager";

function* fetchTableDataWorker(action) {
  try {
    //fetch cái gì ? posts - groups - users
    const { type } = action.payload;
    let resData = { data: [], documentCount: 0 };

    if (type === "users") {
       resData = yield call(fetchUsersManagerRequest, action.payload);
    }
    else if(type === "groups"){
      resData = yield call(fetchGroupsManagerRequest, action.payload)
    }
    else if(type === "posts"){
      resData = yield call(fetchPostsManagerRequest, action.payload)
    }

    //gắn type vào để xử lý trong slice
    resData.type = type;

    yield put(fetchTableData(resData));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi khi lấy dữ liệu",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setManagerTableLoading(false));
  }
}

export function* managerTableSaga() {
  yield takeEvery(fetchTableDataSaga.toString(), fetchTableDataWorker);
}
