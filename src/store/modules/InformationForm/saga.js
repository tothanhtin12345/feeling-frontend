import { takeEvery, call, put } from "@redux-saga/core/effects";

//code của mình
import { updateUserInformationRequest } from "../../../api/user";
import {
  updateUserInformationSaga,
  setInformationFormLoading,
  setInformationFormMessage,
} from "./slice";
import { updateUser } from "../User/slice";
import {updateWallUser} from '../Wall/slice';
import { convertCodeToSuccessMessage } from "./handleSuccess";
import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";

function* updateUserInformationWorker(action) {
  try {
    const resData = yield call(updateUserInformationRequest, action.payload);
    const { informations, code, message } = resData;

    //update vào thông tin của người dùng
    yield put(updateUser({informations}));
    //update vào thông tin của wall user
    yield put(updateWallUser({informations}));
    yield put(
      setInformationFormMessage(convertCodeToSuccessMessage({ code, message }))
    );
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình cập nhật thông tin cá nhân",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setInformationFormLoading(false));
  }
}

export function* informationFormSaga() {
  yield takeEvery(
    updateUserInformationSaga.toString(),
    updateUserInformationWorker
  );
}
