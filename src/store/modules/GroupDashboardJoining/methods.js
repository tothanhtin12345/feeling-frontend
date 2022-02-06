//update trạng thái loading của các nút ở group card
export const setCardButtonLoadingMethod = (state, groupId, loadingVal) => {
    //tìm vị trí group đó ra
    const groupIndex = state.groupsJoining.findIndex((item) => item._id === groupId);
    if (groupIndex >= 0) {
      state.groupsJoining[groupIndex].loading = loadingVal;
    }
  };
  
  

export const setShowOutConfirmModalMethod = (state, groupId, val) => {
//tìm group đó ra
const groupIndex = state.groupsJoining.findIndex((item) => item._id === groupId);
if (groupIndex >= 0) {
    state.groupsJoining[groupIndex].outGroupConfirm = val;
}
};