import { put, takeEvery, call } from "redux-saga/effects";

//code của minh
import {
  fetchGraphLine,
  fetchGraphLineSaga,
  setGraphLineLoading,
} from "./slice";
import { showError } from "../../../utils/error/showError";
import { convertCodeToMessage } from "./handleError";

import {fetchGraphLineRequest} from "../../../api/manager";

function* fetchGraphLineWorker(action) {
  try {
      const resData = yield call(fetchGraphLineRequest,action.payload)

      yield put(fetchGraphLine(resData));

  } catch (err) {
    yield call(showError, {
      title:
        "Đã xảy ra lỗi trong quá trình lấy dữ liệu cho đồ thị",
      content: convertCodeToMessage(err),
    });
  }
  finally{
      yield put(setGraphLineLoading(false));
  }
}

export function* graphLineSaga() {
  yield takeEvery(fetchGraphLineSaga.toString(),fetchGraphLineWorker);
}
