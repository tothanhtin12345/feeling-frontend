//hàm convert code và message của lỗi từ server về thành dạng message mà mình momg muốn
export const convertCodeToMessage = (error) => {
    const {code, message} = error;
    switch (code) {
      case "ERROR_UNDEFINED":
        return "Lỗi không xác định";
      case "ERROR_AUTHORIZED_GET_MEMBERS":
        return "Bạn không đủ quyền để lấy danh sách thành viên của nhóm";
      case "ERROR_IS_INSPECTOR_ALREADY":
        return "Thành viên này đang là người kiểm duyệt";
      case "ERROR_IS_INSPECTOR_YET":
        return "Thành viên này chưa có quyền hạn";
      case "ERROR_AUTHORIZED":
        return "Bạn không đủ quyền hạn để làm việc này";
      case "ERROR_NOT_MEMBER":
        return "Người dùng này không phải là thành viên của nhóm";
      default:
        return message;
    }
  };
  