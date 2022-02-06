import { takeEvery, call, put } from "redux-saga/effects";

//code của mình
import {
  setEmailVerificationLoading,
  setEmailVerificationMessage,
  verifyEmailSaga,
} from "./slice";

import history from "../../../utils/history";
import { verifyEmailRequest } from "../../../api/auth";

import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";

function* verifyEmailWorker(action) {
  try {
    const resData = yield call(verifyEmailRequest, action.payload);

    const { code } = resData;
    let message = "";
    if (code === "SUCCESS_VERIFY_IS_OK") {
      message =
        "Email của bạn đã được xác nhận thành công, bây giờ bạn có thể đăng nhập vào tài khoản để tham gia với chúng tôi.";
    } else if (code === "SUCCESS_VERIFY_IS_EXPIRED") {
      message =
        "Mã xác nhận email của bạn đã hết hạn. Chúng tôi đã gửi lại một mã mới đến email của bạn, vui lòng kiểm tra lại";
    }

    yield put(setEmailVerificationMessage(message));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình xác nhận email",
      content: convertCodeToMessage(err),
    });
    yield put(setEmailVerificationMessage("Đã xảy ra lỗi trong quá trình xác nhận email, vui lòng thử lại"));
  } finally {
    yield put(setEmailVerificationLoading(false));
  }
}

export function* emailVerificationSaga() {
  yield takeEvery(verifyEmailSaga.toString(), verifyEmailWorker);
}
