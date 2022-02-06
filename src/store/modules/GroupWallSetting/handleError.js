//hàm convert code và message của lỗi từ server về thành dạng message mà mình momg muốn
export const convertCodeToMessage = (error) => {
  const { code, message } = error;
  switch (code) {
    case "ERROR_UNDEFINED":
      return "Lỗi không xác định";
    case "ERROR_JOIN_IS_MEMBER":
      return "Không thể yêu cầu tham gia khi đang là thành viên";

    case "ERROR_JOIN_GROUP_REQUESTED":
      return "Bạn đã gửi yêu cầu tham gia rồi";
    case "ERROR_CANCEL_JOIN_NOT_SEND":
      return "Bạn chưa gửi yêu cầu tham gia nào";

    case "ERROR_AUTHORIZED_GET_MEMBERS":
      return "Bạn không phải là thành viên của nhóm này";

    case "ERROR_GROUP_LARGE_MEMBERS":
      return "Bạn không thể xóa một nhóm đang có một lượng lớn thành viên tham gia";

    default:
      return message;
  }
};
