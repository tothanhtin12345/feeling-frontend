//hàm convert code và message của lỗi từ server về thành dạng message mà mình momg muốn
export const convertCodeToMessage = (error) => {
  const { code, message } = error;
  switch (code) {
    case "ERROR_UNDEFINED":
      return "Lỗi không xác định";
    case "ERROR_USER_INFORMATION_DISPLAYNAME_EMPTY":
      return "Vui lòng nhập tên hiển thị";
    case "ERROR_USER_INFORMATION_DISPLAYNAME_LENGTH_3":
      return "Tên hiển thị ít nhất phải từ 3 kí tự";
    case "ERROR_USER_INFORMATION_GENDER_EMPTY":
      return "Vui lòng chọn giới tính";
    case "ERROR_USER_INFORMATION_GENDER_INVALID":
      return "Giá trị giới tính không hợp lệ";

    case "ERROR_ACCOUNT_NOT_EXIST":
      return "Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại";

    default:
      return message;
  }
};
