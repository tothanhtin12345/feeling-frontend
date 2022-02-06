//hàm convert code và message của lỗi từ server về thành dạng message mà mình momg muốn
export const convertCodeToMessage = (error) => {
  const {code, message} = error;
  switch (code) {
    case "ERROR_UNDEFINED":
      return "Lỗi không xác định";

    case "ERROR_DISPLAY_NAME_EMPTY":
      return "Vui lòng nhập họ và tên của bạn";
    case "ERROR_DISPLAY_NAME_MINIUM_3":
      return "Họ và tên phải có ít nhất 3 kí tự";

    case "ERROR_USERNAME_EMPTY":
      return "Vui lòng nhập tên tài khoản của bạn";
    case "ERROR_USERNAME_MINIMUM_5":
      return "Tên tài khoản phải có ít nhất 5 kí tự";
    case "ERROR_USERNAME_MAXIMUM_26":
      return "Tên tài khoản chỉ có tối đa 26 kí tự";
    case "ERROR_USERNAME_EXIST":
      return "Tên tài khoản bạn nhập đã tồn tại, vui lòng chọn một tài khoản khác";

    case "ERROR_PASSWORD_EMPTY":
      return "Vui lòng nhập mật khẩu";
    case "ERROR_PASSWORD_MINIMUM_6":
      return "Mật khẩu phải có ít nhất 6 kí tự";
    case "ERROR_PASSWORD_MAXIMUM_18":
      return "Mật khẩu chỉ có tối đa 18 kí tự";

    case "ERROR_EMAIL_EMPTY":
      return "Vui lòng nhập email";
    case "ERROR_EMAIL_INVALID":
      return "Định dạng của Email không hợp lệ";
    case "ERROR_EMAIL_EXIST":
      return "Email bạn nhập đã tồn tại, vui lòng chọn một email khác";

    default:
      return message;
  }
};
