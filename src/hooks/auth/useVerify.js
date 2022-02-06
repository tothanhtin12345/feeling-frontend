import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
//phần code của mình
import { calculateRemaningTime } from "../../utils/time";
import { getExpirationTime } from '../../utils/auth/token';
import { verifySaga, setVerifyLoading } from '../../store/modules/Login/slice';
import {getVerifyLoading} from '../../store/modules/Login/selectors';

//hook để verify access_token
const useVerify = () => {

  const dispatch = useDispatch();
  const verifyLoading = useSelector(getVerifyLoading);

  useEffect(()=>{
    //khi reset state (điển hình là lúc logout) khi verifyLoading cũng trở lại là true
    //do đó, ta phải kiểm xem nếu như verifyLoading === false thì không thực hiện việc verify
    //nếu === true thì vẫn phải thực hiện cho đúng quy trình
    //nếu verify không có tài khoản thì nó vẫn set lại = false như bth
    if(!verifyLoading) return;
    // console.log("verify")

    //gọi hàm tính toán thời gian còn lại
    const remainingTime = calculateRemaningTime({
      expirationTime: getExpirationTime(),
    })
    //nếu thời hạn > 0 mới thực hiện verify
    if(remainingTime > 0){
      dispatch(verifySaga());
    }
    else{
      dispatch(setVerifyLoading(false))
    }
  },[dispatch,verifyLoading]);
}

export default useVerify;