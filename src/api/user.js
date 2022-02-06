import httpRequest from "../utils/http/httpRequest";

export const updateUserInformationRequest = (data) =>
  httpRequest.put("/user/update-information", data);

export const updateAvatarRequest = (data) =>
  httpRequest.put("/user/update-avatar", data);

export const updateCoverRequest = (data) =>
  httpRequest.put("/user/update-cover", data);

export const getDetailsUserRequest = (userId) =>
  httpRequest.get("/user/details", {
    params: {
      userId,
    },
  });

//change password
export const changePasswordRequest = (data) =>
  httpRequest.put("/user/change-password", data);

//update config
export const updateUserConfigRequest = (data) =>
  httpRequest.put("/user/update-config", data);

//send-friend-request
export const sendFriendRequest = (data) =>
  httpRequest.put("user/send-friend-request", data);

//cancel-friend-sent
export const cancelFriendSentRequest = (data) =>
  httpRequest.put("user/cancel-friend-sent", data);

//cancel-friend-requested
export const cancelFriendRequested = (data) =>
  httpRequest.put("user/cancel-friend-requested", data);

//follow
export const followUserRequest = (data) => httpRequest.put("user/follow", data);

//unfollow
export const unFollowUserRequest = (data) =>
  httpRequest.put("user/unfollow", data);

//accept-friend
export const acceptFriendRequest = (data) =>
  httpRequest.put("user/accept-friend", data);

//cancel-friend
export const cancelFriendRequest = (data) =>
  httpRequest.put("user/cancel-friend", data);

//read a notification
export const readANotificationRequest = () =>
  httpRequest.put("user/read-a-notification");

//read all notification
export const readAllNotificationRequest = () =>
  httpRequest.put("user/read-all-notification");

//fetch friends
export const fetchFriendsRequest = (data) =>
  httpRequest.get("user/friends", {
    params: {
      ...data,
    },
  });

//fetch friends requested
export const fetchFriendsRequestedRequest = ({
  skip,
  limit,
  displayName,
  userId,
}) =>
  httpRequest.get("user/friends-requested", {
    params: {
      skip,
      limit,
      displayName,
      userId,
    },
  });

//fetch friends sent
export const fetchFriendsSentRequest = (data) =>
  httpRequest.get("user/friends-sent", {
    params: {
      ...data,
    },
  });

//fetch tag friends
export const fetchTagFriendsRequest = (displayName, tags, skip, limit) =>
  httpRequest.post(
    "user/friends-tag",
    { tags },
    {
      params: {
        displayName,
        skip,
        limit,
      },
    }
  );

//fetch photos của 1 người
export const fetchPhotosRequest = ({ userId, skip, limit }) =>
  httpRequest.get("/user/photos", {
    params: {
      userId,
      skip,
      limit,
    },
  });
//xóa photo của người dùng hiện tại
export const deletePhotoRequest = ({ fileId }) =>
  httpRequest.delete("/user/photo", {
    params: {
     fileId,
    },
  });