import { takeEvery, put, call } from "redux-saga/effects";
//code của mình

import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";
import { searchRequest } from "../../../api/search";

import {
  setSearchPageLoading,
  doSearchPageSaga,
  giveSearchPageResult,
  setSearchPageCanload,
  changeSearchPageSkip,
} from "./slice";

function* doSearchPagehWorker(action) {
    try {
      
      const resData = yield call(searchRequest,action.payload);
      

      const {limit, type } = action.payload;

      //nếu type search là users thì tính theo mảng users và ngược lại
      const list = type === "users" ? resData.users : resData.groups;

      //nếu search đủ search số lượng limit thì tăng skip
      if(list.length >= limit){
        yield put(changeSearchPageSkip(limit))
      }
      //ngược lại thi set canload = false
      else{
        yield put(setSearchPageCanload(false));
      }


      yield put(giveSearchPageResult({...resData,type}));
  
  
    } catch (err) {
      yield call(showError, {
          title: "Đã xảy ra lỗi khi tìm kiếm",
          content: convertCodeToMessage(err),
        });
    }
    finally{
        yield put(setSearchPageLoading(false));
    }
  }

export function* searchPageSaga() {
 yield takeEvery(doSearchPageSaga.toString(),doSearchPagehWorker)
}
