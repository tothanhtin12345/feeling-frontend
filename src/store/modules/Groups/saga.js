import { takeEvery, call, put } from "redux-saga/effects";
import { notification } from "antd";

//code của mình

import {
  fetchGroupDetailsSaga,
  fetchGroupDetails,
  setFetchGroupDetailsLoading,
  setGroupDetailsError,
  fetchGroupPost,
  fetchGroupPostSaga,
  setFetchPostLoading,
  setGroupCanLoad,
  changeGroupSkip,
  
} from "./slice";
import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";
import { getchGroupDetails } from "../../../api/group";
import {fetchGroupPostsRequest} from "../../../api/post";

//fetch thông tin chi tiết của một group
function* fetchGroupDetailsWorker(action) {
  try {
    const resData = yield call(getchGroupDetails, action.payload);
    const { group } = resData;

    

    //lưu dữ liệu vào store
    yield put(fetchGroupDetails(group));
  } catch (err) {
    //nếu lỗi là not found thì set trực tiếp trong store để hiện lỗi trang not found ở view
    if (err.code == "ERROR_NOT_FOUND") {
        yield put(setGroupDetailsError(err))
    } else {
      yield call(showError, {
        title: "Đã xảy ra lỗi khi lấy thông tin nhóm",
        content: convertCodeToMessage(err),
      });
    }
  } finally {
    yield put(setFetchGroupDetailsLoading(false));
  }
}

function* fetchGroupPostsWorker(action){
  try{
    const resData = yield call(fetchGroupPostsRequest,action.payload);

    const {posts} = resData;

    const {limit, skip} = action.payload;

    

    if(posts.length < limit ){
     
      yield put(setGroupCanLoad(false));
    }
    

    yield put(fetchGroupPost(posts));

  }
  catch(err){
    yield call(showError, {
      title: "Đã xảy ra lỗi khi lấy dữ liệu bài viết",
      content: convertCodeToMessage(err),
    });
  }
  finally{
    yield put(setFetchPostLoading(false));
  }
}

export function* groupSaga() {
  yield takeEvery(fetchGroupDetailsSaga.toString(), fetchGroupDetailsWorker);
  yield takeEvery(fetchGroupPostSaga.toString(), fetchGroupPostsWorker)
}
