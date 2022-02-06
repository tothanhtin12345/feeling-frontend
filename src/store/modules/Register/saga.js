import { takeEvery, call, put } from "@redux-saga/core/effects";

//code của mình
import { setLoading, submitRegisterSaga } from "./slice";

import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";
import { showSuccess } from "../../../utils/success/showSuccess";
import history from "../../../utils/history";
import { registerRequest } from "../../../api/auth";
function* registerWorker(action) {
  try {
    const registerFormData = action.payload;
    const resData = yield call(registerRequest, registerFormData);
    yield put(setLoading(false));

    const { code } = resData;

    if (code === "SUCCESS_REGISTER_NOT_VERIFY_EMAIL") {
      yield call(showSuccess, {
        title: "Đăng ký tài khoản thành công",
        content:
          "Bạn đã đăng ký tài khoản thành công, vui lòng kiểm tra Email của bạn và kích hoạt tài khoản.",
      });
    }

    history.replace("/login");
  } catch (error) {
    yield put(setLoading(false));
    showError({
      title: "Đã xảy ra lỗi khi đăng ký",
      content: convertCodeToMessage(error),
    });
  }
}

export function* registerSaga() {
  yield takeEvery(submitRegisterSaga.toString(), registerWorker);
}
