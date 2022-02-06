import { takeLatest, put, call, takeEvery } from "redux-saga/effects";

//code của mình
import {
  fetchConversations,
  fetchConversationsSaga,
  setMessagesWindowLoading,
  setMessagesWindowCanLoad,
  changeMessagesWindowSkip,
} from "./slice";

import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";
import {fetchConversationsRequest} from "../../../api/conversation";

function* fetchConversationsWorker(action) {
  try {
      const limit = 10;
      const {skip} = action.payload;

      const resData = yield call(fetchConversationsRequest,{skip,limit});

      

      const {conversations} = resData;
      if(conversations.length >= limit){
        yield put(changeMessagesWindowSkip(limit));
      }
      else{
        
          yield put(setMessagesWindowCanLoad(false));
      }

      yield put(fetchConversations(conversations));

  } catch (err) {
    yield put(setMessagesWindowLoading(false));
    yield call(showError, {
      title: "Đã xảy ra lỗi khi lấy thông tin các cuộc trò chuyện",
      content: convertCodeToMessage(err),
    });
  }
}

export function* messagesWindowSaga() {
  yield takeLatest(fetchConversationsSaga.toString(),fetchConversationsWorker);
}
