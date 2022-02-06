import httpRequest from "../utils/http/httpRequest";

//fetch danh sách nhóm đang quản lý
export const fetchGroupsManaging = (data) =>
  httpRequest.get("/group/managing", {
    params: {
      ...data,
    },
  });

//fetch danh sách nhóm đang tham gia
export const fetchGroupsJoiningRequest = (data) =>
  httpRequest.get("/group/joining", {
    params: {
      ...data,
    },
  });

//fetch danh sách đã gửi yêu cầu tham gia
export const fetchGroupsSentRequest = (data) =>
  httpRequest.get("/group/sent", {
    params: {
      ...data,
    },
  });

//tạo một nhóm mới
export const newGroupRequest = (data) => httpRequest.post("/group", data);

//lấy chi tiết của một nhóm
export const getchGroupDetails = (data) =>
  httpRequest.get("/group", { params: { ...data } });

//update thông tin của nhóm
export const updateGroupInformationsRequest = (data) =>
  httpRequest.put("/group/update-informations", data);

//update cover của nhóm
export const updateGroupCover = (data) =>
  httpRequest.put("/group/update-cover", data);

//gửi yêu cầu tham gia nhóm
export const joinGroupRequest = (data) =>
  httpRequest.put("/group/join-request", data);

//hủy yêu cầu tham gia nhóm
export const cancelJoinGroupRequeset = (data) =>
  httpRequest.put("/group/join-request-cancel", data);

//lấy danh sách yêu cầu tham gia nhóm
export const fetchJoinGroupRequestListRequest = (data) =>
  httpRequest.get("/group/join-request", {
    params: {
      ...data,
    },
  });
//chấp nhận yêu cầu tham gia nhóm
export const acceptJoinGroupRqRequest = (data) =>
  httpRequest.put("/group/accept-join-request", data);

//từ chối yêu cầu tham gia nhóm
export const denyJoinGroupRqRequest = (data) =>
  httpRequest.put("/group/deny-join-request", data);

//lấy danh sách thành viên trong nhóm
export const fetchGroupMembersRequest = (data) =>
  httpRequest.get("/group/members", {
    params: {
      ...data,
    },
  });

//ủy quyền (quyền kiểm duyệt) cho một thành viên trong nhóm
export const setInspectorRoleRequest = (data) =>
  httpRequest.put("/group/members/set-inspector", data);

//hủy ủy quyền (quyền kiểm duyệt) của một thành viên trong nhóm
export const unSetInspectorRoleRequest = (data) =>
  httpRequest.put("/group/members/un-set-inspector", data);

//mời một member ra khỏi nhóm
export const dismissMemberRequest = (data) =>
  httpRequest.put("group/members/dismiss-member", data);

//search user để mời vào nhóm
export const searchUsersToInviteToGroupRequest = (data) =>
  httpRequest.post("group/user-search", data);

//mời một users vào nhóm
export const inviteUserToGroupRequest = (data) =>
  httpRequest.post("group/invite", data);

//rời khỏi nhóm
export const outGroupRequest = (data) => httpRequest.put("group/out", data);

//xóa nhóm
export const deleteGroupRequest = (data) =>
  httpRequest.delete("group/", {
    params: {
      ...data,
    },
  });
