import httpRequest from "../utils/http/httpRequest";

//upload file
export const uploadFilesRequest = (data, onUploadProgress, cancelToken) =>
  httpRequest.post("/file/media-upload", data, {
    onUploadProgress,
    cancelToken,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

//xóa một file
export const deleteFileRequest = (queryParams) =>
  httpRequest.delete("/file/remove-file", { params: queryParams });

//thêm một bài post
export const addPostRequest = (data) => httpRequest.post("/post", data);

//chỉnh sửa một bài post
export const editPostRequest = (data) => httpRequest.put("/post", data);

//chia sẻ một bài post
export const sharePostRequest = (data) => httpRequest.post("/post/share", data);

//xóa một bài post
export const deletePostRequest = (data) =>
  httpRequest.delete("/post", { params: { deletePostId: data } });

//fetch posts wall
export const fetchWallPostsRequest = (data) =>
  httpRequest.get("/post/wall", { params: { ...data } });
//fetch group posts
export const fetchGroupPostsRequest = (data) =>
  httpRequest.get("/post/group", { params: { ...data } });

//fetch group-dashboard posts
export const fetchGroupDashboardPostsRequest = (data) =>
  httpRequest.get("/post/group-dashboard", { params: { ...data } });

//fetch home posts
export const fetchHomePostsRequest = (data) =>
  httpRequest.get("/post/home", { params: { ...data } });

//lấy chi tiết một bài post
export const fetchPostDetailsRequest = ({ _id, commentId }) =>
  httpRequest.get("/post/details", { params: { _id, commentId } });
