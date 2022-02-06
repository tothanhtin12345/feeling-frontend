//hàm convert code và message của lỗi từ server về thành dạng message mà mình momg muốn
export const convertCodeToMessage = (error) => {
    const {code, message} = error;
    switch (code) {
      case "ERROR_UNDEFINED":
        return "Lỗi không xác định";

        case "ERROR_INVALID_TOKEN":
            return "Mã xác nhận Email không hợp lệ, vui lòng thử lại";
   
      default:
        return message;
    }
  };
  