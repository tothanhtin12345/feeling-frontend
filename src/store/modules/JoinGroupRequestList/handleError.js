//hàm convert code và message của lỗi từ server về thành dạng message mà mình momg muốn
export const convertCodeToMessage = (error) => {
    const {code, message} = error;
    switch (code) {
      case "ERROR_UNDEFINED":
        return "Lỗi không xác định";
      
      case "ERROR_AUTHORIZED":
        return "Bạn không có quyền để truy cập dữ liệu";

      case "ERROR_USER_NOT_REQUEST":
        return "Người dùng này chưa gửi yêu cầu tham gia nhóm";
      
      
      
      default:
        return message;
    }
  };
  