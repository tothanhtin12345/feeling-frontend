export const updateFriendMethod = (state, userId, data) => {
    const userIndex = state.friends.findIndex((item)=>item._id === userId);
   
    if(userIndex >= 0){
        
        
        state.friends[userIndex] = {
            ...state.friends[userIndex],
            ...data,
        }
    }

}