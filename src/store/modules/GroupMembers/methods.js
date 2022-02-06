//update trạng thái loading của các nút ở user card

export const setCardButtonLoadingMethod = (state, userId, loadingVal) => {
   //tìm user đó ra
   const userIndex = state.members.findIndex((item) => item._id === userId);
   if (userIndex >= 0) {
     state.members[userIndex].loading = loadingVal;
   }
}


//update trạng thái dismissConfirm ở mỗi user card
export const setDissmissConfirmMethod = (state, userId, val) => {
  //tìm user đó ra
  const userIndex = state.members.findIndex((item) => item._id === userId);
  if (userIndex >= 0) {
    state.members[userIndex].dismissConfirm = val;
  }
}

//update một member
export const updateMemberMethod = ({ state, userId, data }) => {
  const memberIndex = state.members.findIndex((item) => item._id === userId);

  if (memberIndex >= 0) {
    state.members[memberIndex] = {
      ...state.members[memberIndex],
      ...data,
    };
  }
}