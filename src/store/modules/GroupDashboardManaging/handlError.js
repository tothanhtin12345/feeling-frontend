//hàm convert code và message của lỗi từ server về thành dạng message mà mình momg muốn
export const convertCodeToMessage = (error) => {
  const { code, message } = error;
  switch (code) {
    case "ERROR_UNDEFINED":
      return "Lỗi không xác định";

    case "ERROR_GROUP_NAME_EMPTY":
      return "Vui lòng nhập tên nhóm";
    case "ERROR_GROUP_NAME_MIN":
      return "Độ dài tên nhóm quá ngắn";
    case "ERROR_GROUP_NAME_MAX":
      return "Tên nhóm vượt quá độ dài cho phép";
    case "GROUP_DESCRIPTION_MAX":
        return "Mô tả về nhóm vượt quá độ dài cho phép";

    default:
      return message;
  }
};
