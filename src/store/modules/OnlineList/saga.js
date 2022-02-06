import { takeEvery, put, call } from "redux-saga/effects";

//code của mình
import {
  fetchOnlineUsers,
  fetchOnlineGroupsChat,
  fetchOnlineGroupsChatSaga,
  fetchOnlineUsersSaga,
  addOnlineUserSaga,
  addOnlineUser,
  setGroupsLoading
  
} from "./slice";
import { showError } from "../../../utils/error/showError";
import { convertCodeToMessage } from "./handleError";
import {
  getConversationIdForEachUser,
  fetchConversationsRequest,
} from "../../../api/conversation";

//gọi lên backend để bổ sung thêm cho mỗi người dùng thông tin conversationId
function* fetchOnlineUsersWorker(action) {
  try {
    const usersOnline = action.payload;
    const usersId = [];
    usersOnline.forEach((item) => usersId.push(item._id));
    //nếu mảng rỗng thì không cần làm gì thêm cả
    if (usersId.length <= 0) return;
    const resData = yield call(getConversationIdForEachUser, { usersId });

    //lưu ý - kết quả trả về là một object
    // với mỗi phần tử là cặp key - value = userId - conversationid
    const { usersIdWithConversationId } = resData;

    //ta cập nhật thêm conversationId cho usersOnline
    for (let i = 0; i < usersOnline.length; i++) {
      const userId = usersOnline[i]._id;
      const conversationId = usersIdWithConversationId[userId];
      usersOnline[i].conversationId = conversationId;
    }
    //cập nhật lại trong store
    yield put(fetchOnlineUsers(usersOnline));
  } catch (err) {
    console.log(err);
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình xử lý thông tin người dùng online",
      content: convertCodeToMessage(err),
    });
  }
}

//tương tự như hàm fetchOnlineUsersWorker - nhưng ta chỉ xử lý 1 user - còn hàm kia thì nhiều user
function* addOnlineUserWorker(action) {
  try {
    const user = action.payload;
    const usersId = [user._id];
    const resData = yield call(getConversationIdForEachUser, { usersId });

    //lưu ý - kết quả trả về là một object
    // với mỗi phần tử là cặp key - value = userId - conversationid
    const { usersIdWithConversationId } = resData;

    user.conversationId = usersIdWithConversationId[user._id];

    yield put(addOnlineUser(user));
  } catch (err) {
    console.log(err);
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình xử lý thông tin người dùng online",
      content: convertCodeToMessage(err),
    });
  }
}

//lấy thêm danh sách những group chat người dùng đang tham gia - 5 phòng có updated mới nhất
function* fetchOnlineGroupsChatWorker() {
  try {
    const resData = yield call(fetchConversationsRequest, {
      limit: 5,
      skip: 0,
      type: "group",
      updatedAt: -1,
    });
    const {conversations} = resData;

    yield put(fetchOnlineGroupsChat(conversations));


  } catch (err) {
    console.log(err);
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá lấy dữ liệu nhóm chat online",
      content: convertCodeToMessage(err),
    });
    yield put(setGroupsLoading(false));
  }
}

export function* onlineListSaga() {
  yield takeEvery(fetchOnlineUsersSaga.toString(), fetchOnlineUsersWorker);
  yield takeEvery(
    fetchOnlineGroupsChatSaga.toString(),
    fetchOnlineGroupsChatWorker
  );
  yield takeEvery(addOnlineUserSaga.toString(), addOnlineUserWorker);
}
