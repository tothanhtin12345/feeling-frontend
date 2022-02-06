
export const setCardButtonLoadingMethod = (state, userId, loadingVal) => {
   //tìm user đó ra
   const userIndex = state.requestList.findIndex((item) => item._id === userId);
   if (userIndex >= 0) {
     state.requestList[userIndex].loading = loadingVal;
   }
}