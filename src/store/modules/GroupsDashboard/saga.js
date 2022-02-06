import { takeEvery, call, put } from "redux-saga/effects";

//code của mình
import {
  fetchGroupDashboardPosts,
  fetchGroupDashboardPostsSaga,
  setGroupDashboardFetchLoading,
  setGroupDashboardCanload,
  changeGroupDashboardSkip,
} from "./slice";

import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";

import { fetchGroupDashboardPostsRequest } from "../../../api/post";

function* fetchGroupDashboardPostsWorker(action) {
  try {
    const resData = yield call(fetchGroupDashboardPostsRequest, action.payload);

    const { posts } = resData;

    
    const { limit, skip } = action.payload;

    if (posts.length < limit) {
      yield put(setGroupDashboardCanload(false))
    }

    yield put(fetchGroupDashboardPosts(posts));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi khi lấy dữ liệu bài đăng",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setGroupDashboardFetchLoading(false));
  }
}

export function* groupDashboardSaga() {
  yield takeEvery(fetchGroupDashboardPostsSaga.toString(),fetchGroupDashboardPostsWorker);
}
