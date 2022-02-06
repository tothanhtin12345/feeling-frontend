//hàm convert code và message của lỗi từ server về thành dạng message mà mình momg muốn
export const convertCodeToMessage = (error) => {
  const { code, message } = error;
  switch (code) {
    case "ERROR_UNDEFINED":
      return "Lỗi không xác định";

    case "ERROR_FILE_INVALID":
      return "File phải là hình ảnh hoặc video, vui lòng thử lại";

    case "ERROR_FILE_IMAGE_LIMIT_10MBS":
      return "File hình ảnh có kích thước tối đa là 10mbs, vui lòng thử lại";

    case "ERROR_POST_NOT_ENOUGH_DATA":
      return "Bài đăng phải có hình ảnh hoặc nội dung";

    case "ERROR_FILE_NOT_EXIST":
      return "File bạn vừa tải lên không tồn tại trong hệ thống, vui lòng thử lại";

    case "ERROR_NOT_FOUND":
      return "Không tìm thấy thông tin";

    case "ERROR_AUTHORIZED":
      return "Bạn không đủ quyền hạn để thực hiện thao tác này";

    default:
      return message;
  }
};
