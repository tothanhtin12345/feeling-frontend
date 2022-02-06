import httpRequest from "../utils/http/httpRequest";

//fetch dữ liệu đồ thị
export const fetchGraphLineRequest = (data) =>
  httpRequest.get("/manager/line-graph-data", {
    params: {
      ...data,
    },
  });

//fetch danh sách người dùng cho phần quản lý
export const fetchUsersManagerRequest = (data) =>
  httpRequest.get("/manager/users", {
    params: {
      ...data,
    },
  });

  //fetch danh sách nhóm cho phần quản lý
export const fetchGroupsManagerRequest = (data) =>
httpRequest.get("/manager/groups", {
  params: {
    ...data,
  },
});

//fetch danh sách bài viết cho người quản lý
export const fetchPostsManagerRequest = (data) =>
  httpRequest.get("/manager/posts", {
    params: {
      ...data,
    },
  });

  