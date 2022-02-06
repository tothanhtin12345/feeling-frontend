//hàm convert code và message của lỗi từ server về thành dạng message mà mình momg muốn
export const convertCodeToSuccessMessage = (success) => {
    const { code, message } = success;
    switch (code) {
        case "SUCCESS_UPDATE_USER_CONFIG":
            return "Cập nhật cài đặt tường nhà thành công";
  
      default:
        return message;
    }
  };
  