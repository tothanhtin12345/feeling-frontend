//update trạng thái loading của các nút ở group card
export const setCardButtonLoadingMethod = (state, groupId, loadingVal) => {
    //tìm vị trí group đó ra
    const groupIndex = state.groupsSent.findIndex((item) => item._id === groupId);
    if (groupIndex >= 0) {
      state.groupsSent[groupIndex].loading = loadingVal;
    }
  };
  
  

export const setShowCancelGroupModalMethod = (state, groupId, val) => {
//tìm group đó ra
const groupIndex = state.groupsSent.findIndex((item) => item._id === groupId);
if (groupIndex >= 0) {
    state.groupsSent[groupIndex].cancelGroupConfirm = val;
}
};