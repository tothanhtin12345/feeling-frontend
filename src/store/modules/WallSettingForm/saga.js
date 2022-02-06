import { takeEvery, put, call } from "@redux-saga/core/effects";
//code của mình
import { convertCodeToMessage } from "./handleError";
import { convertCodeToSuccessMessage } from "./handleSuccess";
import { showError } from "../../../utils/error/showError";

import {
  setWallSettingLoading,
  setWallSettingMessage,
  updateWallSettingSaga,
} from "./slice";

import { updateUserConfigRequest } from "../../../api/user";

import { updateWallUser } from "../Wall/slice";
import { updateUser } from "../User/slice";

function* updateWallSettingWorker(action) {
  try {
    console.log(action.payload);
      const resData = yield call(updateUserConfigRequest,action.payload);
      const {userConfig, message, code} = resData;
     

      yield put(setWallSettingMessage(convertCodeToSuccessMessage({message,code})));
      yield put(updateUser({userConfig}));
      yield put(updateWallUser({userConfig}));

  } catch (err) {
    yield call(showError, {
      title: "Đã xay ra lỗi trong quá trình cập nhật thiết lập tường nhà của bạn",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setWallSettingLoading(false));
  }
}

export function* wallSettingFormSaga() {
  yield takeEvery(updateWallSettingSaga.toString(), updateWallSettingWorker);
}
