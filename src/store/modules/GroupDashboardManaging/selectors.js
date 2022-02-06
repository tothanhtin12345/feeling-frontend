export const getNewGroupModalVisible = (state) => state.groupDashboardManaging.newGroupModalVisible;
export const getNewGroupLoading = (state) => state.groupDashboardManaging.newGroupLoading;
export const getNewGroupError = (state) => state.groupDashboardManaging.newGroupError;

export const getGroupsManagingList = (state) => state.groupDashboardManaging.groupsManaging;
export const getGroupsManagingSkip = (state) => state.groupDashboardManaging.skip;
export const getGroupsManagingCanLoad = (state) => state.groupDashboardManaging.canLoad;
export const getGroupsManagingLoading = (state) => state.groupDashboardManaging.fetchLoading;
export const getGroupsManagingError = (state) => state.groupDashboardManaging.fetchError;