//hàm convert code và message của lỗi từ server về thành dạng message mà mình momg muốn
export const convertCodeToMessage = (error) => {
  const { code, message } = error;
  switch (code) {
    case "ERROR_UNDEFINED":
      return "Lỗi không xác định";

    case "ERROR_USERNAME_EMPTY":
      return "Vui lòng nhập tên tài khoản của bạn";
    case "ERROR_USERNAME_MINIMUM_5":
      return "Tên tài khoản phải có ít nhất 5 kí tự";
    case "ERROR_USERNAME_MAXIMUM_26":
      return "Tên tài khoản chỉ có tối đa 26 kí tự";

    case "ERROR_EMAIL_EMPTY":
      return "Vui lòng nhập email";
    case "ERROR_EMAIL_INVALID":
      return "Định dạng của Email không hợp lệ";
    case "ERROR_FORGOT_PASSWORD_NOT_SAME":
      return "Tài khoản hoặc email không tồn tại, vui lòng thử lại";
    case "ERROR_FORGOT_PASSWORD_NOT_SUPPORT":
      return "Tài khoản và email bạn nhập không hỗ trợ cho chức năng Quên mật khẩu";

    case "ERROR_ACCOUNT_NOT_EXIST":
      return "Tài khoản không tồn tại, vui lòng thử lại";

    case "ERROR_PASSWORD_EMPTY":
      return "Vui lòng nhập mật khẩu";
    case "ERROR_PASSWORD_MINIMUM_6":
      return "Mật khẩu phải có ít nhất 6 kí tự";
    case "ERROR_PASSWORD_MAXIMUM_18":
      return "Mật khẩu chỉ có tối đa 18 kí tự";

    case "ERROR_VERIFICATION_CODE_EMPTY":
      return "Vui lòng nhập mã xác nhận";
    case "ERROR_VERIFICATION_CODE_NOT_CORRECT":
      return "Mã xác nhận không đúng, vui lòng thử lại";
    case "ERROR_VERIFICATION_CODE_EXPIRED":
      return "Mã xác nhận đã hết hạn, vui lòng thử lại";

    default:
      return message;
  }
};
