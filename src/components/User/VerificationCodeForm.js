import { useState, useEffect } from "react";
import { Form, Spin } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
//code của mình
import {
  BigTitleStyled,
  SmallTitleStyled,
  MediumContentStyled,
  SmallActionStyled,
} from "../Styled/Text";
import { RectangleButtonStyled } from "../Styled/Button";
import { TextInputStyled } from "../Styled/Input";
import {
  getForgotPasswordLoading,
  getAccountInfor,
} from "../../store/modules/ForgotPassword/selectors";
import {
  sendVerificationCodeSaga,
  getVerificationCodeSaga,
} from "../../store/modules/ForgotPassword/slice";
const { Item } = Form;
const VerificationCodeFormStyled = styled.div`
  & {
    .form-title {
      margin-bottom: 16px;
      text-align: center;
    }
    .redirect-link {
      text-align: end;
    }

    .form-button {
      margin-top: 8px;
    }
    .to-login {
      margin-top: 16px;
      text-align: start;
    }
    .count-time {
      cursor: pointer;
      text-align: end;
    }
  }
`;

let timeout;
const VerificationCodeForm = () => {
  const [form] = Form.useForm();

  const [countTime, setCountTime] = useState(30);

  const dispatch = useDispatch();

  const accountInfor = useSelector(getAccountInfor);
  const loading = useSelector(getForgotPasswordLoading);

  //nếu không có accountinfor thì điều hướng người dùng quay trở lại trang lấy lại mật khẩu

  //hàm chạy ngược thời gian
  //ta không dùng setInterval mà thay thế = timeout để dễ control hơn
  useEffect(() => {
    if (countTime <= 0) return;
    //trừ đi 1s sau mỗi 1s nếu nó lớn hơn 0 và bé hoặc bằng 30
    timeout = setTimeout(() => {
      setCountTime((currentCountTime) => {
        let newCountTime = currentCountTime - 1;
        return newCountTime;
      });
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [countTime, loading]);

  if (!accountInfor) {
    return <Redirect to="/forgot-password" />;
  }

  //nhấn để gửi lại mã xác nhận lần nữa
  const handleSendCodeAgain = () => {
    //lấy ra email và username để yêu cầu việc gửi lại verification code
    dispatch(getVerificationCodeSaga({ ...accountInfor }));
    setCountTime(30);
  };

  const handleSubmitForm = (values) => {
    //verificationCode
    dispatch(
      sendVerificationCodeSaga({
        ...values,
        ...accountInfor,
      })
    );
  };

  return (
    <Spin spinning={loading}>
      <VerificationCodeFormStyled>
        <div className="form-title">
          <BigTitleStyled>Lấy lại mật khẩu</BigTitleStyled>
        </div>
        <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
          <Item
            label={
              <SmallTitleStyled>
                Nhập mã xác nhận được gửi qua Email của bạn
              </SmallTitleStyled>
            }
            key="verificationCode"
            name="verificationCode"
            validateTrigger={["onBlur"]}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã xác nhận để tiếp tục",
              },
            ]}
          >
            <TextInputStyled />
          </Item>

          <div className="count-time">
            {countTime > 0 && (
              <MediumContentStyled>
                Gửi lại mã xác nhận sau {countTime}
              </MediumContentStyled>
            )}
            {countTime <= 0 && (
              <MediumContentStyled onClick={handleSendCodeAgain}>
                Nhấn để gửi lại mã xác nhận
              </MediumContentStyled>
            )}
          </div>
          <div className="form-button">
            <RectangleButtonStyled width="100%" textcolor="#FFFFFF">
              <SmallTitleStyled>Xác nhận</SmallTitleStyled>
            </RectangleButtonStyled>
          </div>

          <div className="redirect-link to-login">
            <SmallActionStyled to="/login">
              Trở về trang đăng nhập
            </SmallActionStyled>
          </div>
        </Form>
      </VerificationCodeFormStyled>
    </Spin>
  );
};
export default VerificationCodeForm;
