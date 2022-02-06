//hàm convert code và message của lỗi từ server về thành dạng message mà mình momg muốn
//hàm này ở ngữ cảnh có thể dùng cho các component dùng hook request để fetch dữ liệu chứ không dùng saga
export const convertCodeToMessage = (error) => {
  const { code, message } = error;
  switch (code) {
    case "ERROR_UNDEFINED":
      return "Lỗi không xác định";

    case "ERROR_POST_INFORMATION_EMPTY":
      return "Thông tin về bài post không đủ";
    case "ERROR_POST_NOT_FOUND":
      return "Bài viết không tồn tại hoặc đã bị xóa";
    case "ERROR_POST_ID_NOT_FOUND":
      return "Không tìm thấy dữ liệu id của bài đăng";

    case "ERROR_CONVERSATION_NOT_FOUND":
      return "Không tìm thấy cuộc hội thoại";
    case "ERROR_USERS_CAN_NOT_FOUND":
      return "Không tìm thấy những người dùng này";
    case "ERROR_MESSAGE_ID_NOT_FOUND":
      return "Giá trị tin nhắn không hợp lệ";
    case "ERROR_MESSAGE_NOT_FOUND":
      return "Không tìm thấy tin nhắn";
    case "ERROR_MESSAGE_CAN_NOT_BE_DELETE":
      return "Tin nhắn này không thể bị xóa";

    case "ERROR_POST_REPORT_ID_NOT_FOUND":
      return "Không tìm thấy dữ liệu id của bài báo cáo";
    case "ERROR_POST_REPORT_CONTENT_EMPTY":
      return "Nội dung báo cáo bài đăng không được để trống";
    case "ERROR_POST_REPORT_MIN_LENGTH_12":
      return "Độ dài nội dung báo cáo phải có ít nhất 12 kí tự";
    case "ERROR_DELETE_POST_REPORT_ROLE":
      return "Bạn không được phép xóa nội dung này";
    case "ERROR_DELETE_POST_REPORT_NOT_FOUND":
      return "Không tìm thấy nội dung bạn muốn xóa";
    default:
      return message;
  }
};
