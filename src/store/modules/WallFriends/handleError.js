//hàm convert code và message của lỗi từ server về thành dạng message mà mình momg muốn
export const convertCodeToMessage = (error) => {
  const { code, message } = error;
  switch (code) {
    case "ERROR_UNDEFINED":
      return "Lỗi không xác định";
    case "ERROR_USER_IS_SAME":
      return "Bạn không thể thực hiện thao tác này với chính mình";
    case "ERROR_USER_NOT_FOUND":
      return "Không tìm thấy người dùng, vui lòng thử lại";
    case "ERROR_IS_FRIEND":
      return "Không thể gửi lời mời kết bạn với người bạn hiện tại";
    case "ERROR_FRIEND_REQUESTED_NOT_FOUND":
      return "Không tìm thấy lời mời kết bạn";
    case "ERROR_IS_NOT_FRIEND":
      return "Không tìm thấy người này trong danh sách bạn bè";
      case "ERROR_FRIEND_REQUEST_HAS_ALREADY":
        return "Đã tồn tại một lời mời kết bạn từ phía người dùng kia"
      case "ERROR_FRIEND_SENT_NOT_FOUND":
        return "Không tìm thấy lời mời kết bạn đã gửi";
    default:
      return message;
  }
};
