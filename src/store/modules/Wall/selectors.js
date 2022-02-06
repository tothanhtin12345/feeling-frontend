export const getAddPostModalVisible = (state) => state.wall.addPostModalVisible;
export const getWallSettingFormModalVisible = (state) => state.wall.wallSettingFormModalVisible;
export const getWallPosts = (state) => state.wall.posts;
export const getWallLoading = (state) => state.wall.loading;
export const getWallCanLoad = (state) => state.wall.canLoad;
export const getWallPostFirstLoad = (state) => state.wall.postFirstLoad;


export const getWallUser = (state) => state.wall.wallUser;
export const getWallUserId = (state) => state.wall.wallUser?._id;

export const getWallUserAvatar = (state) => state.wall.wallUser?.avatar;
export const getWallUserCover = (state) => state.wall.wallUser?.cover;
export const getWallUserConfig = (state) => state.wall.wallUser?.userConfig;
export const getWallUserInformations = (state) => state.wall.wallUser?.informations;
export const getWallUserCreatedAt = (state) => state.wall.wallUser?.createdAt;
export const getWallUserFriendCount = (state) => state.wall.wallUser?.friendCount;
export const getWallUserFollowerCount = (state) => state.wall.wallUser?.followerCount;

export const getIsCurrentUser = (state) => state.wall.wallUser?.isCurrentUser;
export const getIsFriend = (state) => state.wall.wallUser?.isFriend;
export const getIsFollow = (state) => state.wall.wallUser?.isFollow;
export const getIsRequested = (state) => state.wall.wallUser?.isRequested;
export const getIsSent = (state) => state.wall.wallUser?.isSent;


export const getWallUserLoading = (state) => state.wall.wallUserLoading;
export const getWallError = (state) => state.wall.wallError;
