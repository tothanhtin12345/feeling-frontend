import {setAuthToken} from '../../../utils/auth/token';


//convert thời gian hết hạn gửi từ server (ở dạng seconds) thành dạng ISO String
export const convertToExpirationTime = ({expires_in}) => {
  // console.log(expires_in);
  const expirationTime = new Date(
    new Date().getTime() + Number.parseInt(expires_in) * 1000
  );
  return expirationTime.toISOString();
};


//lưu token vào local storage (bao gồm các bước tính toán thời gian, convert,..) dựa vào user
//đồng thời lưu expirationTime vào trong token của đối tượng user
export const saveTokenIntoLocalStorage = ({user}) => {
   //lưu thông tin token vào trong local
   const {token:{access_token, expires_in, }, refresh_token} = user;
   const expirationTime = convertToExpirationTime({expires_in}); //một chuỗi ISO về ngày hết hạn
   setAuthToken({
     access_token,
     expirationTime,
     refresh_token,
     expires_in,
   })
   user.token.expirationTime = expirationTime;
}