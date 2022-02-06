//hàm convert code và message của lỗi từ server về thành dạng message mà mình momg muốn
export const convertCodeToMessage = (error) => {
  const { code, message } = error;
  switch (code) {
    case "ERROR_UNDEFINED":
      return "Lỗi không xác định";

    case "ERROR_WALL_USER_SYSTEM_FOLLOWER_COUNT_INVALID":
      return "Giá trị hiển thị người theo dõi không hợp lệ";

    case "ERROR_WALL_USER_SYSTEM_BIRTHDAY_INVALID":
      return "Giá trị hiển thị ngày sinh không hợp lệ";

    case "ERROR_WALL_USER_SYSTEM_NUMBERPHONE_INVALID":
      return "Giá trị hiển thị ngày sinh không hợp lệ";

    case "ERROR_WALL_USER_SYSTEM_WORK_ADDRESS_INVALID":
      return "Giá trị hiển thị địa chỉ làm việc không hợp lệ";
    case "ERROR_WALL_USER_SYSTEM_HOME_ADDRESS_INVALID":
      return "Giá trị hiển thị địa chỉ nơi ở không hợp lệ";

    default:
      return message;
  }
};
