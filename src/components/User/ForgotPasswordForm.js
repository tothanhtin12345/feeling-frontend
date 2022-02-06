import { Form, Spin } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
//code của mình
import {
  BigTitleStyled,
  SmallTitleStyled,
  SmallActionStyled,
} from "../Styled/Text";
import { RectangleButtonStyled } from "../Styled/Button";
import { TextInputStyled } from "../Styled/Input";
import { getVerificationCodeSaga } from "../../store/modules/ForgotPassword/slice";
import { getForgotPasswordLoading } from "../../store/modules/ForgotPassword/selectors";
const { Item } = Form;
const ForgotPasswordFormStyled = styled.div`
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
  }
`;

const ForgotPasswordForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const loading = useSelector(getForgotPasswordLoading);

  const handleSubmitForm = (values) => {
    dispatch(getVerificationCodeSaga(values));
  };

  return (
    <Spin spinning={loading}>
      <ForgotPasswordFormStyled>
        <div className="form-title">
          <BigTitleStyled>Quên mật khẩu</BigTitleStyled>
        </div>
        <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
          <Item
            label={<SmallTitleStyled>Tên tài khoản</SmallTitleStyled>}
            key="username"
            name="username"
            validateTrigger={["onBlur"]}
            rules={[
              { required: true, message: "Vui lòng nhập tên tài khoản" },
              { min: 6, message: "Tên tài khoản ít nhất phải từ 6 kí tự" },
              { max: 26, message: "Tên tài khoản chỉ có nhiều nhất 26 kí tự" },
            ]}
          >
            <TextInputStyled />
          </Item>
          <Item
            label={
              <SmallTitleStyled>Địa chỉ Email của tài khoản</SmallTitleStyled>
            }
            key="email"
            name="email"
            validateTrigger={["onBlur"]}
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ Email" },
              { type: "email", message: "Vui lòng nhập đúng định dạng Email" },
            ]}
          >
            <TextInputStyled />
          </Item>

          <div className="form-button">
            <RectangleButtonStyled width="100%" textcolor="#FFFFFF">
              <SmallTitleStyled>Lấy lại mật khẩu</SmallTitleStyled>
            </RectangleButtonStyled>
          </div>

          <div className="redirect-link to-login">
            <SmallActionStyled to="/login">
              Trở về trang đăng nhập
            </SmallActionStyled>
          </div>
        </Form>
      </ForgotPasswordFormStyled>
    </Spin>
  );
};
export default ForgotPasswordForm;
