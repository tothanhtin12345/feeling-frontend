//hàm convert code và message của lỗi từ server về thành dạng message mà mình momg muốn
export const convertCodeToMessage = (error) => {
  const { code, message } = error;
  switch (code) {
    case "ERROR_UNDEFINED":
      return "Lỗi không xác định";

    case "ERROR_PASSWORD_EMPTY":
      return "Vui lòng nhập mật khẩu";
    case "ERROR_PASSWORD_MINIMUM_6":
      return "Mật khẩu phải có ít nhất 6 kí tự";
    case "ERROR_PASSWORD_MAXIMUM_18":
      return "Mật khẩu chỉ có tối đa 18 kí tự";
    case "ERROR_PASSWORD_NOT_SAME":
      return "Mật khẩu hiện tại bạn nhập không đúng";

    case "ERROR_CHANGE_PASSWORD_NOT_SUPPORTED":
      return "Tài khoản của bạn không hỗ trợ tính năng đổi mật khẩu";

    default:
      return message;
  }
};
