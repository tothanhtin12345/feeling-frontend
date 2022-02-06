//hàm convert code và message của lỗi từ server về thành dạng message mà mình momg muốn
export const convertCodeToMessage = (error) => {
    const { code, message } = error;
    switch (code) {
      case "ERROR_UNDEFINED":
        return "Lỗi không xác định";
      
      default:
        return message;
    }
  };
  