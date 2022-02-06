//hàm convert code và message của lỗi từ server về thành dạng message mà mình momg muốn
export const convertCodeToSuccessMessage = (success) => {
    const { code, message } = success;
    switch (code) {
        case "SUCCESS_POST_DELETE":
            return "Bạn đã xóa thành công một bài viết"
  
      default:
        return message;
    }
  };
  