import { takeEvery, put, call } from "redux-saga/effects";

//code của mình
import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";

import { fetchHomePostsRequest } from "../../../api/post";
import {
  fetchHomePost,
  fetchHomePostSaga,
  changeFetchHomePostSkip,
  setFetchHomePostCanLoad,
  setFetchHomePostLoading,
} from "./slice";

function* fetchHomePostWorker(action) {
  try {
    const resData = yield call(fetchHomePostsRequest, action.payload);

    const { posts } = resData;

    const { limit } = action.payload;
  
    if (posts.length < limit) {
      yield put(setFetchHomePostCanLoad(false));
    }

    yield put(fetchHomePost(posts));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi khi lấy dữ liệu bài đăng",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setFetchHomePostLoading(false));
  }
}

export function* homeSaga() {
    yield takeEvery(fetchHomePostSaga.toString(),fetchHomePostWorker);
}
