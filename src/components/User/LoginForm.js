import { Form, Spin } from "antd";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
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
  submitLoginSaga,
  submitGoogleLoginSaga,
} from "../../store/modules/Login/slice";
import { getLoginLoading } from "../../store/modules/Login/selectors";

const { Item } = Form;
const LoginFormStyled = styled.div`
  & {
    .form-title {
      margin-bottom: 16px;
      text-align: center;
    }
    .redirect-link {
      text-align: end;
    }
    .or-text {
      margin-top: 8px;
      text-align: center;
    }
    .form-button {
      margin-top: 8px;
    }
    .to-register {
      margin-top: 16px;
    }
  }
`;

const LoginForm = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const loading = useSelector(getLoginLoading);

  const handleSubmitForm = (values) => {
    dispatch(submitLoginSaga(values));
  };

  //hàm xử lý đăng nhập = google
  const handleGoogleLoginResponse = (res) => {
    //lấy một số thông tin cần thiết của người dùng ra từ res
    if (!res.profileObj) return;
    console.log(res.profileObj)
    const { name, email } = res.profileObj;
    const data = {name, email, method:"Google"}
    dispatch(submitGoogleLoginSaga(data));
  };

  return (
    <Spin spinning={loading}>
      <LoginFormStyled>
        <div className="form-title">
          <BigTitleStyled>Đăng nhập</BigTitleStyled>
        </div>
        <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
          <Item
            label={<SmallTitleStyled>Tên tài khoản</SmallTitleStyled>}
            key="username"
            name="username"
            validateTrigger={["onBlur"]}
            rules={[
              { required: true, message: "Vui lòng nhập tên tài khoản" },
              { min: 5, message: "Tên tài khoản ít nhất phải từ 5 kí tự" },
              { max: 26, message: "Tên tài khoản chỉ có nhiều nhất 26 kí tự" },
            ]}
          >
            <TextInputStyled />
          </Item>
          <Item
            label={<SmallTitleStyled>Mật khẩu</SmallTitleStyled>}
            key="password"
            name="password"
            validateTrigger={["onBlur"]}
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 kí tự" },
              { max: 18, message: "Mật khẩu chỉ có nhiều nhất 18 kí tự" },
            ]}
          >
            <TextInputStyled type="password" />
          </Item>
          <div className="redirect-link">
            <NavLink to="forgot-password">
              <MediumContentStyled>Quên mật khẩu ?</MediumContentStyled>
            </NavLink>
          </div>
          <div className="form-button">
            <RectangleButtonStyled
              type="submit"
              width="100%"
              textcolor="#FFFFFF"
            >
              <SmallTitleStyled>Đăng nhập</SmallTitleStyled>
            </RectangleButtonStyled>
          </div>
          <div className="or-text">
            <MediumContentStyled>Hoặc</MediumContentStyled>
          </div>
          <div className="form-button">
            <GoogleLogin
              clientId="376161456792-n8ituaf0smrceb3v17su3uudmnm8p8f7.apps.googleusercontent.com"
              onSuccess={handleGoogleLoginResponse}
              onFailure={handleGoogleLoginResponse}
              render={(renderProps) => (
                <RectangleButtonStyled
                  color="#FF4D4F"
                  width="100%"
                  textcolor="#FFFFFF"
                  type="button"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <SmallTitleStyled>Đăng nhập bằng Google</SmallTitleStyled>
                </RectangleButtonStyled>
              )}
            />
          </div>
          <div className="redirect-link to-register">
            <SmallActionStyled to="/register">
              Đi đến trang đăng ký
            </SmallActionStyled>
          </div>
        </Form>
      </LoginFormStyled>
    </Spin>
  );
};
export default LoginForm;
