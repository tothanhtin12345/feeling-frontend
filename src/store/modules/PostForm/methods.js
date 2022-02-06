export const createPostFormData = ({
  files = [],
  filesToDelete = [],
  content,
  title,
  tags = [],
  privacy,
  type,
  _id,
  sharedPost,
  groupId,
}) => {
  const formData = new FormData();
  //thêm file
  files.forEach((file) => {
    formData.append("files", file);
  });

  //thêm thông tin file để xóa (gồm một đối tượng chứa _id, path)
  //sẽ có nếu dùng chức năng chỉnh sửa bài viết
  filesToDelete.forEach((fileInfo) => {
    formData.append("filesToDelete[]", JSON.stringify(fileInfo));
  });
  //thêm tags
  tags.forEach((tag) => {
    formData.append("tags[]", tag);
  });
  if (content) {
    formData.append("content", content);
  }
  if (privacy) {
    formData.append("privacy", privacy);
  }
  if (type) {
    formData.append("type", type);
  }
  if (_id) {
    formData.append("_id", _id || "");
  }

  if (sharedPost) {
    formData.append("sharedPost", sharedPost);
  }
  if (title) {
    formData.append("title", title);
  }

  if(groupId){
    formData.append("groupId", groupId);
  }

  return formData;
};
