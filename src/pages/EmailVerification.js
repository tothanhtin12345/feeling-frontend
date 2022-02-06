
import { Spin } from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {useEffect} from "react";
//code của mình
import { MediumTitleStyled, BigTitleStyled } from "../components/Styled/Text";
import { MediumContentStyled } from "../components/Styled/Text";
import { SmallActionStyled } from "../components/Styled/Text";

import { getEmailVerificationLoading,getEmailVerificationMessage } from "../store/modules/EmailVerification/selectors";
import {verifyEmailSaga, verifyEmailAgain, reset } from "../store/modules/EmailVerification/slice";

const EmailVerification = () => {

  const dispatch = useDispatch()

  const loading = useSelector(getEmailVerificationLoading);
  const message = useSelector(getEmailVerificationMessage);

  //lấy đối tượng get params ở dạng query
  const urlParams = new URLSearchParams(window.location.search);

  //token(mã để xác minh email)
  const token = urlParams.get("token");

  


  //nếu có mã token thì thực hiện verify trên server
  useEffect(()=>{
    if(!token) return;

    dispatch(verifyEmailSaga({token}));


    return () => {
      dispatch(reset());
    }
  },[token])
  

  // //nếu không có token thì trả ra lại trang đăng nhập 
  if(!token){
    return <Redirect to={"/login"}/>
  }

  if(!loading && !message){
    return <div></div>
  }

  
  //nếu không loading và không có message thì trả về div

  //nếu đang loading thì trả về spin

  //nếu không loading và có message thì hiển thị message

  return (
      <Spin spinning={loading}>
    <div>
      <div style={{textAlign:"center",marginTop:"8px"}}>
        <BigTitleStyled>Xác nhận Email</BigTitleStyled>
      </div>
      <div style={{textAlign:"center",marginTop:"8px"}}>
        <MediumContentStyled>
          {message}
        </MediumContentStyled>
      </div>
      <div className="redirect-link to-login" style={{textAlign:"end",marginTop:"15px"}}>
            <SmallActionStyled to="/login">
              Trở về trang đăng nhập
            </SmallActionStyled>
          </div>
    </div>
    </Spin>
  );
};

export default EmailVerification;
