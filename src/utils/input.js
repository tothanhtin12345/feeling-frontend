 //hàm xử lý để input chỉ nhận vào số nguyên
 export const MakeOnlyInteger = (event) => {
    if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
      }
  }