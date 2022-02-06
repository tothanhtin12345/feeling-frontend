import { put, call, takeEvery } from "redux-saga/effects";

//code của mình
import { fetchPostDetailsRequest } from "../../../api/post";
import { showError } from "../../../utils/error/showError";
import { convertCodeToMessage } from "./handleError";
import {
  fetchPostDetailsSaga,
  fetchPostDetails,
  setPostDetailsLoading,
} from "./slice";


function* fetchPostDetailsWorker(action) {
    

  try {
    const {_id, commentId} = action.payload;
    const resData = yield call(fetchPostDetailsRequest,{_id,commentId});
    const {post} = resData;

    // console.log(post);

    yield put(fetchPostDetails(post));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi khi tìm bài viết",
      content: convertCodeToMessage(err),
    });
    yield put(setPostDetailsLoading(false));
  }
}

export function* postDetailsSaga() {
  yield takeEvery(fetchPostDetailsSaga.toString(),fetchPostDetailsWorker);
}
