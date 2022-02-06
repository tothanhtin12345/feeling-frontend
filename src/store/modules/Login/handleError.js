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

    case "ERROR_PASSWORD_EMPTY":
      return "Vui lòng nhập mật khẩu";
    case "ERROR_PASSWORD_MINIMUM_6":
      return "Mật khẩu phải có ít nhất 6 kí tự";
    case "ERROR_PASSWORD_MAXIMUM_18":
      return "Mật khẩu chỉ có tối đa 18 kí tự";

    case "ERROR_ACCOUNT_NOT_EXIST":
      return "Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại";

    case "ERROR_ACCOUNT_NOT_VERIFY_EMAIL":
      return "Tài khoản chưa được kích hoạt, vui lòng kiểm tra Email bạn dùng để đăng ký tài khoản để kích hoạt tài khoản";
    case "ERROR_EMAIL_EXIST":
      return "Email bạn chọn để tạo tài khoản đã tồn tại, vui lòng chọn một email khác";
    default:
      return message;
  }
};
