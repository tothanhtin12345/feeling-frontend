import {
  takeEvery,
  call,
  put,
  take,
  fork,
  cancel,
} from "@redux-saga/core/effects";
import { eventChannel, END } from "redux-saga";
import axios from "axios";
import { notification } from "antd";
//code của mình
import {
  addPostSaga,
  editPostSaga,
  setLoading,
  setUploadFilesLoading,
  uploadFilesSaga,
  setFiles,
  setUploadPercent,
  deleteFile,
  deleteFileSaga,
  reset,
  sharePostSaga,
  deletePostSaga,
} from "./slice";
import { createPostFormData } from "./methods";
import {
  addHomePost,
  updateHomePost,
  deleteHomePost,
  toggleAddPostModalVisible,
} from "../Home/slice";
import {
  addGroupsPost,
  updateGroupsPost,
  deleteGroupsPost,
} from "../Groups/slice";
import {
  updateGroupsDashboardPost,
  deleteGroupsDashboardPost,
} from "../GroupsDashboard/slice";
import { addWallPost, updateWallPost, deleteWallPost } from "../Wall/slice";

import { unSetPostSelected, unSetSharedPost } from "../Post/slice";
import { updatePostDetails, deletePostDetails } from "../PostDetails/slice";
import {
  addPostRequest,
  editPostRequest,
  uploadFilesRequest,
  deleteFileRequest,
  sharePostRequest,
  deletePostRequest,
} from "../../../api/post";

import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";
import { getPathByIndex } from "../../../utils/url";
import { convertCodeToSuccessMessage } from "./handleSuccess";

let source = axios.CancelToken.source();

const createUploadProgressHandler = (emit) => {
  //hàm sẽ được truyền để thực hiện xử lý progress của axios
  const onProgress = ({ total, loaded }) => {
    const percentage = Math.round((loaded * 100) / total);

    //bắn ra dữ liệu
    //thằng nào đang chờ (take) kênh upload này sẽ nhận được dữ liệu bên dưới
    emit(percentage);
  };
  return onProgress;
};

//thiết lập một kênh up dữ liệu có xử lý progress (% quá trình upload)
const createUploadChannel = (request, payload) => {
  let emit;

  //tạo kênh
  //take có thể lắng nghe kênh này nếu emit của kênh này được phát động
  const channel = eventChannel((emitter) => {
    emit = emitter;
    //clear (unsubscribe)
    return () => {
      //clear bằng cách ngưng request axios
      //source ở dòng 21
      source.cancel();
    };
  });
  const uploadPromise = request(
    payload,
    createUploadProgressHandler(emit),
    source.token
  );

  //trả về hàm để  thực hiện request
  //và kênh để take có thể lắng nghe
  return { uploadPromise, channel };
};

//lắng nghe emit của channel
function* onProgressWorker(channel) {
  while (true) {
    //data  ta nhận được là % upload từ emit bắn ra
    const data = yield take(channel);
    console.log(data);
    //ta cập nhật vào trong store
    yield put(setUploadPercent(data));
  }
}

function* uploadFilesWorker(action) {
  const { uploadPromise, channel } = createUploadChannel(
    uploadFilesRequest,
    action.payload
  );

  //chạy hàm lắng nghe emit từ channel
  const uploadTask = yield fork(onProgressWorker, channel);
  try {
    //Vì ở khúc tạo channel ta đã gọi hàm để thực hiện request server
    //nên uploadPromise sẽ là một promise
    //do đó call ta truyền vào một hàm để return lại cái promise này
    const resData = yield call(() => uploadPromise);

    const { files } = resData;
    //lưu các thông tin files từ server vào store
    yield put(setFiles(files));

    cancel(uploadTask);
  } catch (err) {
    console.log(err);
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình upload file",
      content: convertCodeToMessage(err),
    });
    yield put(setUploadPercent(0));
    yield put(setUploadFilesLoading(false));
  }
}

function* deleteFileWorker(action) {
  try {
    const queryParams = action.payload;
    const resData = yield call(deleteFileRequest, queryParams);

    //nếu tới được đây thì đã xóa thành công
    //lấy ra fileId để xóa trong store
    const fileId = queryParams._id;
    yield put(deleteFile(fileId));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình upload file",
      content: convertCodeToMessage(err),
    });
  }
}

function* addPostWorker(action) {
  try {
    const newPost = action.payload;

    const postFormData = createPostFormData(newPost);
    const resData = yield call(addPostRequest, postFormData);
    const { post } = resData;

    const currentPath = getPathByIndex(1);

    //nếu path tại ví trị 1 === "" => ở timeline - thực hiện set post ở timeline
    if (currentPath === "") {
      //cập nhật vào trong store của home
      yield put(addHomePost(post));
    } else if (currentPath === "groups") {
      //cập nhật vào posts trong store của groups cụ thể
      //tạm thời đóng - để tránh bị lỗi - khi hoàn thành chức năng tạo nhóm sẽ mở lại
      yield put(addGroupsPost(post));
    } else if (currentPath === "wall") {
      yield put(addWallPost(post));
    }

    //reset state của postform
    yield put(reset());
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình tạo bài đăng",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setLoading(false));
  }
}

function* editPostWorker(action) {
  try {
    const editPost = action.payload;
    const formData = createPostFormData(editPost);
    const resData = yield call(editPostRequest, formData);
    const { post } = resData;

    const currentPath = getPathByIndex(1);

    //nếu path tại ví trị 1 === "" => ở timeline - thực hiện edit post ở timeline
    if (currentPath === "") {
      yield put(updateHomePost(post));
    } else if (currentPath === "groups") {
      const nextPath = getPathByIndex(2);
      if (nextPath === "dashboard") {
        yield put(updateGroupsDashboardPost(post));
      } else {
        yield put(updateGroupsPost(post));
      }
    } else if (currentPath === "post") {
      const nextPath = getPathByIndex(2);
      if (nextPath === "details") {
        yield put(updatePostDetails(post));
      }
    } else if (currentPath === "wall") {
      yield put(updateWallPost(post));
    }

    //reset state của postform
    yield put(reset());
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình chỉnh sửa bài đăng",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setLoading(false));
  }
}

function* sharePostWorker(action) {
  try {
    //vì share sẽ không đính kèm thêm file của mình nên không cần phải tạo form data
    const newPost = action.payload;

    const resData = yield call(sharePostRequest, newPost);
    const { post } = resData;

    const currentPath = getPathByIndex(1);

    //nếu path tại ví trị 1 === "" => ở timeline - thực hiện set post ở timeline
    if (currentPath === "") {
      //cập nhật vào trong store của home
      yield put(addHomePost(post));
      //nếu đang ở tường nhà
    } else if (currentPath === "wall") {
      let nextPath = getPathByIndex(2);
      //và đang ở tường nhà của chính mình thì mới cập nhật lên
      //(so sánh chủ bài viết mới về và giá trị thứ hai trên path (chính là _id người dùng))
      if (post.owner._id === nextPath) {
        yield put(addWallPost(post));
      }
    }

    //xóa cái post được chọn để chia sẻ trong store
    yield put(unSetSharedPost());
    //reset state của postform
    yield put(reset());
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình tạo bài đăng",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setLoading(false));
  }
}

function* deletePostWorker(action) {
  try {
    const deletePostId = action.payload;
    const resData = yield call(deletePostRequest, deletePostId);

    //xóa bài post ở giao diện
    const currentPath = getPathByIndex(1);
    //nếu path tại ví trị 1 === "" => ở timeline - thực hiện edit post ở timeline
    if (currentPath === "") {
      yield put(deleteHomePost(deletePostId));
    } else if (currentPath === "groups") {
      const nextPath = getPathByIndex(2);
      if (nextPath === "dashboard") {
        yield put(deleteGroupsDashboardPost(deletePostId));
      } else {
        yield put(deleteGroupsPost(deletePostId));
      }
    } else if (currentPath === "post") {
      const nextPath = getPathByIndex(2);
      if (nextPath === "details") {
        yield put(deletePostDetails(deletePostId));
      }
    } else if (currentPath === "wall") {
      yield put(deleteWallPost(deletePostId));
    }
    yield put(reset());
    notification.success({
      title: "Thông báo xóa bài viết",
      description: convertCodeToSuccessMessage(resData),
      placement: "bottomLeft",
    });
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình tạo bài đăng",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setLoading(false));
  }
}

export function* postFormSaga() {
  yield takeEvery(addPostSaga.toString(), addPostWorker);
  yield takeEvery(uploadFilesSaga.toString(), uploadFilesWorker);
  yield takeEvery(deleteFileSaga.toString(), deleteFileWorker);
  yield takeEvery(editPostSaga.toString(), editPostWorker);
  yield takeEvery(sharePostSaga.toString(), sharePostWorker);
  yield takeEvery(deletePostSaga.toString(), deletePostWorker);
}
