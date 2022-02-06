import { call, takeEvery, put } from "redux-saga/effects";
//code của mình
import {
  setChangePasswordFormLoading,
  changePasswordSaga,
  setChangePasswordFormMessage,
} from "./slice";
import { changePasswordRequest } from "../../../api/user";

import { showError } from "../../../utils/error/showError";
import { convertCodeToMessage } from "./handleError";
import { convertCodeToSuccessMessage } from "./handleSuccess";


function* changePasswordWorker(action) {
  try {
    const resData = yield call(changePasswordRequest, action.payload);
    const { message, code } = resData;

    

    yield put(
      setChangePasswordFormMessage(convertCodeToSuccessMessage({ message, code }))
    );
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình thay đổi mật khẩu",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setChangePasswordFormLoading(false));
  }
}

export function* changePasswordFormSaga() {
  yield takeEvery(changePasswordSaga.toString(), changePasswordWorker);
}
