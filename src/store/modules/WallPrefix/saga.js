import { takeEvery, call, put, take } from "@redux-saga/core/effects";

//code của mình
import { showError } from "../../../utils/error/showError";
import {
  uploadAvatarSaga,
  uploadCoverSaga,
  setWallPrefixLoading,
  uploadGroupCoverSaga,
} from "./slice";
import { createPostFormData } from "../PostForm/methods";
import { updateAvatarRequest, updateCoverRequest } from "../../../api/user";
import { updateGroupCover } from "../../../api/group";
import { updateAvatar, updateCover } from "../User/slice";
import { convertCodeToMessage } from "./handleError";
import { updateWallUser, addWallPost } from "../../modules/Wall/slice";
import { updateGroupDetails, addGroupsPost, deleteGroupsPost } from "../../modules/Groups/slice";

//upload post chung - dành cho cả avatar và cover và cover nhóm
function* addPostWorker(postData) {
  const postFormData = createPostFormData(postData);
  //ta gọi request update avatar và nhận được một bài post có chứa ảnh avatar ta vừa upload
  let resData;
  if (postData.updateFor === "avatar") {
    resData = yield call(updateAvatarRequest, postFormData);
  }
  if (postData.updateFor === "cover") {
    resData = yield call(updateCoverRequest, postFormData);
  }
  if (postData.updateFor === "group-cover") {
    resData = yield call(updateGroupCover, postFormData);
    return resData;
  }
  const { imagePost } = resData;
  return imagePost;
}

//upload avatar
function* uploadAvatarWorker(action) {
  try {
    const imagePost = yield call(addPostWorker, action.payload);
    //update bài post như là một avatar vào store của người dùng hiện tại
    yield put(updateAvatar(imagePost));
    //update thông tin vào trong wallUser
    yield put(updateWallUser({ avatar: imagePost }));
    //thêm bài post hình ảnh vào danh sách posts của wall
    yield put(addWallPost(imagePost));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình cập nhật ảnh đại diện",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setWallPrefixLoading(false));
  }
}

//upload cover(ảnh bìa)
function* uploadCoverWorker(action) {
  try {
    const imagePost = yield call(addPostWorker, action.payload);
    //update bài post như là một cover vào store của người dùng hiện tại
    yield put(updateCover(imagePost));
    //update thông tin vào trong wallUser
    yield put(updateWallUser({ cover: imagePost }));
    //thêm bài post hình ảnh vào danh sách posts của wall
    yield put(addWallPost(imagePost));
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình cập nhật ảnh bìa",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setWallPrefixLoading(false));
  }
}

//upload cover (ảnh bìa) cho nhóm
function* uploadGroupCoverWorker(action) {
  try {
    const { imagePost, groupId, deletePostId } = yield call(addPostWorker, action.payload);
    console.log(imagePost);
    console.log(groupId);
    //update vào trong thông tin chi tiết của nhóm
    yield put(updateGroupDetails({ groupId, data: { cover: imagePost } }));
    //update vào trong danh sách bài post của nhóm
    yield put(addGroupsPost(imagePost));
    if(deletePostId !== ""){
      yield put (deleteGroupsPost(deletePostId));
    }
  } catch (err) {
    yield call(showError, {
      title: "Đã xảy ra lỗi trong quá trình cập nhật ảnh bìa",
      content: convertCodeToMessage(err),
    });
  } finally {
    yield put(setWallPrefixLoading(false));
  }
}

export function* wallPrefixSaga() {
  yield takeEvery(uploadAvatarSaga.toString(), uploadAvatarWorker);
  yield takeEvery(uploadCoverSaga.toString(), uploadCoverWorker);
  yield takeEvery(uploadGroupCoverSaga.toString(), uploadGroupCoverWorker);
}
