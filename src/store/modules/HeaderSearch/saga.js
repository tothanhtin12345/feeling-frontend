import { takeEvery, debounce, takeLatest, call, put } from "redux-saga/effects";

//code của mình
import {
  doHeaderSearchSaga,
  giveSearchResult,
  setHeaderSearchLoading,
} from "./slice";

import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";
import {
    searchRequest,
} from "../../../api/search";

function* doHeaderSearchWorker(action) {
  try {
    
    const resData = yield call(searchRequest,action.payload);

    yield put(giveSearchResult(resData));


  } catch (err) {
    yield call(showError, {
        title: "Đã xảy ra lỗi khi tìm kiếm",
        content: convertCodeToMessage(err),
      });
  }
  finally{
      yield put(setHeaderSearchLoading(false));
  }
}

export function* headerSearchSaga() {
  yield takeLatest(doHeaderSearchSaga.toString(), doHeaderSearchWorker);
}
