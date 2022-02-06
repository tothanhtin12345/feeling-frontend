import { takeEvery, call, put } from "@redux-saga/core/effects";

//code của mình
import {
  submitLoginSaga,
  submitGoogleLoginSaga,
  setLoading,
  verifySaga,
  setIsVerify,
  setVerifyLoading,
  refreshSaga,
  logoutSaga,
} from "./slice";
import { setUser, setToken } from "../User/slice";
import {
  loginRequest,
  verifyRequest,
  refreshRequest,
  googleLoginRequest,
} from "../../../api/auth";
import { saveTokenIntoLocalStorage } from "./methods";
import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";
import { clearAuthToken } from "../../../utils/auth/token";
import history from "../../../utils/history";



//hàm thực hiện công việc xử lý dữ liệu login được gửi từ server
//dành cho cả login thường và login = google
function* handleLogin(resData) {
  const { user } = resData;
  //ta bỏ user vào và hàm này sẽ thực hiện lưu thêm thông tin expirationTime vào trong token
  saveTokenIntoLocalStorage({ user });
  //lưu thông tin user vào trong redux store
  yield put(setUser(user));
  yield put(setToken(user.token));
  yield put(setLoading(false));
}

function* loginWorker(action) {
  try {
    const loginData = action.payload;
    const resData = yield call(loginRequest, loginData);
    yield call(handleLogin,resData);
  } catch (error) {
    yield put(setLoading(false));

    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình đăng nhập",
      content: convertCodeToMessage(error),
    });
  }
}

function* googleLoginWoker(action) {
  try {
    const data = action.payload;

    const resData = yield call(googleLoginRequest, data);
    yield call(handleLogin,resData);
  } catch (error) {
    yield put(setLoading(false));

    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình đăng nhập",
      content: convertCodeToMessage(error),
    });
  }
}

function* refreshWorker(action) {
  try {
    //data là {refresh_token}
    const data = action.payload;
    //refresh thì nhận lại được toàn bộ thông tin của user
    const resData = yield call(refreshRequest, data);
    const { user } = resData;

    //ta bỏ user vào và hàm này sẽ thực hiện lưu thêm thông tin expirationTime vào trong token
    saveTokenIntoLocalStorage({ user });
    //lấy ra token mới và update trong store
    
    yield put(setToken(user.token));
  } catch (err) {
    //có lỗi thì cho giá trị null (thường là do token không hợp lệ hoặc hết hạn)
    //lúc này người dùng đành phải đăng nhập lại
    yield put(setUser(null));
    yield put(setToken(null));
  }
}

function* verifyWorker() {
  try {
    const resData = yield call(verifyRequest);
    const { user } = resData;
    //ta bỏ user vào và hàm này sẽ thực hiện lưu thêm thông tin expirationTime vào trong token
    saveTokenIntoLocalStorage({ user });

    yield put(setUser(user));
    yield put(setToken(user.token));
   
  } catch (err) {
    yield put(setUser(null));
    yield put(setToken(null));
   
    yield call(clearAuthToken);
  }
  finally{
    yield put(setVerifyLoading(false));
    yield put(setIsVerify(true));
  }
}

function* logoutWorker() {
  // yield put(setUser(null));
  // yield put(setToken(null));
  yield call(clearAuthToken);
  history.push("/login");
}

export function* loginSaga() {
  yield takeEvery(submitLoginSaga.toString(), loginWorker);
  yield takeEvery(submitGoogleLoginSaga.toString(), googleLoginWoker);
  yield takeEvery(verifySaga.toString(), verifyWorker);
  yield takeEvery(refreshSaga.toString(), refreshWorker);
  yield takeEvery(logoutSaga.toString(), logoutWorker);
}
