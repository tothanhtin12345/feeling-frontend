import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//phần code của mình
import { getToken, getUser } from "../../store/modules/User/selectors";
import {
  getExpirationTime,
  getRefreshToken,
} from "../../utils/auth/token";
import { refreshSaga } from "../../store/modules/Login/slice";
import { calculateRemaningTime } from "../../utils/time";



//một hook dùng để chạy canh thời gian refresh lại token
let timeout;
const useRefresh = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  let access_token;
  if(token){
    access_token = token.access_token;
  }
  useEffect(() => {
    if (access_token) {

      // console.log("start refresh")
    

      //tính thời gian còn lại (miliseconds)
       //trừ 60000 là trừ đi cho 1 phút ==> khi bé hơn 1 phút thì thực hiện refresh
      const remainingTime = calculateRemaningTime({
        expirationTime:getExpirationTime(),
      }) - 60000;



      //nếu bé hơn 1 phút thì lập tức refresh
      if (remainingTime < 60000) {
        dispatch(refreshSaga({refresh_token:getRefreshToken()}))
        //nếu không thì chờ
      } else {
        timeout = setTimeout(() => {
          dispatch(refreshSaga({refresh_token:getRefreshToken()}))
        }, remainingTime);
      }

       //test
      // const remainingTime = 1000;
      // timeout = setTimeout(() => {
      //   dispatch(refreshSaga({refresh_token:getRefreshToken()}))
      // }, remainingTime);
      
    }
    //clear
    return () => {
      clearTimeout(timeout);
    };
  }, [access_token, dispatch]);
};

export default useRefresh;