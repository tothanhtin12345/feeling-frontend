//lấy post được chọn (!=null khi nhấn vào file media của bài post)
export const getPostSelected = (state) => state.post.postSelected;
//lấy post được chọn để chia sẻ
export const getSharedPost = (state) => state.post.sharedPost;