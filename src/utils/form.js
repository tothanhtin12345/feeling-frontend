//hàm dùng để tạo một form data từ object
export const createFormDataFromObject = (data) => {
    //keys trong data - câu dưới được một mảng key - key dạng chuỗi
    const keysForm = Object.keys(data);
    //tạo form data
    const formData = new FormData();
    keysForm.forEach((key) => {
      formData.append(key, data[key]);
    });
    return formData;
  };