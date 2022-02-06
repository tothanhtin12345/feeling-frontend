import { takeEvery, call, put } from "@redux-saga/core/effects";
import { Modal } from "antd";
//code của mình
import {
  setAccountInfor,
  setLoading,
  setVerificationCode,
  sendVerificationCodeSaga,
  getVerificationCodeSaga,
  newPasswordSaga,
  resetState,
} from "./slice";
import {
  forgotPasswordRequest,
  sendVerificationCodeRequest,
  newPasswordRequest,
} from "../../../api/auth";
import history from "../../../utils/history";
import { showError } from "../../../utils/error/showError";
import { convertCodeToMessage } from "./handleError";

//hàm này sẽ gửi thông tin email và username lên server để nhận về một verification code
function* getVerificationCodeWorker(action) {
  try {
    const data = action.payload;
    yield call(forgotPasswordRequest, data);

    //lưu các thông tin người dùng vừa nhập vào trong store
    const { email, username } = data;
    yield put(setAccountInfor({ email, username }));

    yield put(setLoading(false));
    history.push("/verification-code");
  } catch (err) {
    yield put(setLoading(false));
    yield call(showError, {
      title: "Đã có lỗi xảy ra trong quá trình lấy lại mật khẩu",
      content: convertCodeToMessage(err),
    });
  }
}

//hàm gửi mã xác minh lên server
function* sendVerificationCodeWorker(action) {
  //data là {verificationCode, email, username}
  try {
    const data = action.payload;
    const resData = yield call(sendVerificationCodeRequest, data);
    //tới đây thì dữ liệu đều oke
    //set mã người dùng vừa nhập vào trong store
    yield put(setVerificationCode(data.verificationCode));
    yield put(setLoading(false));
    //điều hướng đến trang nhập mật khẩu mới
    history.push("/new-password");
  } catch (err) {
    yield put(setLoading(false));
    yield call(showError, {
      title: "Đã có lỗi xảy ra trong quá trình lấy lại mật khẩu",
      content: convertCodeToMessage(err),
    });
  }
}

//hàm đặt mật khẩu mới
function* newPasswordWoker(action) {
  try {
    //data bao gồm username, email, newPassword và verificationCode
    const data = action.payload;
    const resData = yield call(newPasswordRequest, data);
    //tới bước này thì đã thành công
    //reset state
    yield put(resetState());
    //hiển thị modal xác nhận
    Modal.confirm({
      zIndex: 10010,
      title: "Đặt lại mật khẩu thành công",
      content: "Bạn đã đặt lại mật khẩu thành công, vui lòng đăng nhập lại",
     
      onOk: () => {
        history.push("/login");
      },
      onCancel: () => {
        history.push("/login");
      },
    });
    
  } catch (err) {
  
    yield put(setLoading(false));
    yield call(showError, {
      title: "Đã có lỗi xảy ra trong quá trình lấy lại mật khẩu",
      content: convertCodeToMessage(err),
    });
  }
}

export function* forgotPasswordSaga() {
  yield takeEvery(
    getVerificationCodeSaga.toString(),
    getVerificationCodeWorker
  );
  yield takeEvery(
    sendVerificationCodeSaga.toString(),
    sendVerificationCodeWorker
  );
  yield takeEvery(newPasswordSaga.toString(), newPasswordWoker);
}
