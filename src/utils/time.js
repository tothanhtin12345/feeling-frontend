//expirationTime là chuỗi isoString
export const calculateRemaningTime = ({expirationTime}) => {
  const currentTime = new Date().getTime();
  const expiredTime = new Date(expirationTime).getTime();
  const remainingTime = expiredTime - currentTime;
  return remainingTime;
}