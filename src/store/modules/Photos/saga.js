import { takeEvery, put, call } from "redux-saga/effects";

//code của mình
import { convertCodeToMessage } from "./handleError";
import { showError } from "../../../utils/error/showError";
import {
  fetchPhotos,
  fetchPhotosSaga,
  setFetchPhotosLoading,
  deletePhoto,
  deletePhotoSaga,
  setDeletePhotoLoading,
} from "./slice";
import { updateAvatar, updateCover } from "../User/slice";
import { fetchPhotosRequest, deletePhotoRequest } from "../../../api/user";
import { deleteHomePost, deleteFileHomePost } from "../Home/slice";
import {
  deleteWallPost,
  deleteFileWallPost,
  updateWallUser,
} from "../Wall/slice";
import { deleteGroupsPost, deleteFileGroupsPost } from "../Groups/slice";
import {
  deleteGroupsDashboardPost,
  deleteFileGroupsDashboardPost,
} from "../GroupsDashboard/slice";
function* fetchPhotosWorker(action) {
  try {
    const { userId, skip, limit } = action.payload;
    const resData = yield call(fetchPhotosRequest, { skip, limit, userId });
    const { isCurrentUser, photos } = resData;
    yield put(fetchPhotos({ isCurrentUser, photos }));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi khi lấy dữ liệu hình ảnh",
      content: convertCodeToMessage(err),
    });
    yield put(setFetchPhotosLoading(false));
  }
}

function* deletePhotoWorker(action) {
  try {
    const fileId = action.payload;

    const resData = yield call(deletePhotoRequest, { fileId });
    const { isAvatar, isCover, deletePost, postId, userId } = resData;
    // console.log(resData)
    //xóa file trong photos
    yield put(deletePhoto(fileId));
    //nếu là ảnh đại diện thì xóa ảnh đại diện
    if (isAvatar) {
      //dòng này chỉ mới update được người dùng đang xài hệ thống
      yield put(updateAvatar(undefined));
      //ta phải update luôn cái trang tường nhà người dùng đang ở để thực hiên jviec thay đổi avatar
      yield put(updateWallUser({ wallUserId: userId, avatar: undefined }));
    }
    if (isCover) {
      //dòng này chỉ mới update được người dùng đang xài hệ thống
      yield put(updateCover(undefined));
      //ta phải update luôn cái trang tường nhà người dùng đang ở để thực hiên jviec thay đổi avatar
      yield put(updateWallUser({ wallUserId: userId, cover: undefined }));
    }
    //xóa bài post ở các nơi
    if (deletePost) {
      yield put(deleteWallPost(postId));
      yield put(deleteHomePost(postId));
      yield put(deleteGroupsDashboardPost(postId));
      yield put(deleteGroupsPost(postId));
    }
    //xóa file trong bài post
    else {
      yield put(deleteFileWallPost({ postId, fileId }));
      yield put(deleteFileHomePost({ postId, fileId }));
      yield put(deleteFileGroupsDashboardPost({ postId, fileId }));
      yield put(deleteFileGroupsPost({ postId, fileId }));
    }
    //nếu là ảnh bìa thì xóa ảnh bìa và bài post có ảnh bìa
    //nếu có yêu cầu xóa hoàn toàn bài post (khi bài post thường chỉ có 1 file, không có nội dung và file duy nhất này bị xóa)
    //nếu không có cài nào trường hợp trên thì xóa file trong bài post
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi khi lấy dữ liệu hình ảnh",
      content: convertCodeToMessage(err),
    });
    yield put(setDeletePhotoLoading(false));
  }
}

export function* photosSaga() {
  yield takeEvery(fetchPhotosSaga.toString(), fetchPhotosWorker);
  yield takeEvery(deletePhotoSaga.toString(), deletePhotoWorker);
}
