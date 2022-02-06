export const updateFriendSentMethod = (state, userId, data) => {
    const userIndex = state.friendsSent.findIndex((item)=>item._id === userId);
   
    if(userIndex >= 0){
        
        
        state.friendsSent[userIndex] = {
            ...state.friendsSent[userIndex],
            ...data,
        }
    }

}