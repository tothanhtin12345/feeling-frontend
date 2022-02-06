import {
  takeEvery,
  takeLatest,
  call,
  put,
  take,
} from "@redux-saga/core/effects";

//code của mình
import {
  fetchWallUserSaga,
  setWallUser,
  setWallUserLoading,
  setWallError,
  fetchWallPosts,
  fetchWallPostsSaga,
  changeWallSkip,
  setWallCanLoad,
  setWallLoading,
} from "./slice";
import { getDetailsUserRequest } from "../../../api/user";
import { fetchWallPostsRequest } from "../../../api/post";
import { showError } from "../../../utils/error/showError";
import { convertCodeToMessage } from "./handleError";

function* fetchWallUserWorker(action) {
  try {
    const userId = action.payload;
    const resData = yield call(getDetailsUserRequest, userId);
    const { user } = resData;

    yield put(setWallUser(user));
  } catch (err) {
    yield put(setWallError(err));
  } finally {
    yield put(setWallUserLoading(false));
  }
}

//lấy các bài viết của một tường nhà
function* fetchWallPostsWorker(action) {
  try {
    const { limit, lastId } = action.payload;



    
    
    const resData = yield call(fetchWallPostsRequest, action.payload);
    const { posts } = resData;
    // console.log(posts)
    //tăng skip nếu trả đủ dữ liệu limit
    if (posts.length < limit) {
      yield put(setWallCanLoad(false));
    } 

    //update dữ liệu trong store
    yield put(fetchWallPosts(posts));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình lấy dữ liệu bài đăng",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setWallLoading(false));
  }
}

export function* wallSaga() {
  yield takeEvery(fetchWallUserSaga.toString(), fetchWallUserWorker);
  yield takeLatest(fetchWallPostsSaga.toString(),fetchWallPostsWorker);
}
