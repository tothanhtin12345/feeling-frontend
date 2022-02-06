export const updateFriendRequestedMethod = (state, userId, data) => {
    const userIndex = state.friendsRequested.findIndex((item)=>item._id === userId);
   
    if(userIndex >= 0){
        
        
        state.friendsRequested[userIndex] = {
            ...state.friendsRequested[userIndex],
            ...data,
        }
    }

}