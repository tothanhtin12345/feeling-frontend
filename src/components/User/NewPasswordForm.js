import { Form, Spin } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
//code của mình
import {
  BigTitleStyled,
  SmallTitleStyled,
 
  SmallActionStyled,
} from "../Styled/Text";
import { RectangleButtonStyled } from "../Styled/Button";
import { TextInputStyled } from "../Styled/Input";
import {
  getForgotPasswordLoading,
  getAccountInfor,
  getVerificationCode,
} from "../../store/modules/ForgotPassword/selectors";
import { newPasswordSaga } from "../../store/modules/ForgotPassword/slice";
const { Item } = Form;
const NewPasswordFormStyled = styled.div`
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
    .to-login {
      margin-top: 16px;
      text-align: start;
    }
  }
`;

const NewPasswordForm = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const loading = useSelector(getForgotPasswordLoading);
  const accountInfor = useSelector(getAccountInfor);
  const verificationCode = useSelector(getVerificationCode);

  const handleSubmitForm = (values) => {
    dispatch(newPasswordSaga({
      newPassword: values.newPassword,
      ...accountInfor,
      verificationCode,
    }))
  };

 

  if(!accountInfor && !verificationCode){
    return <Redirect to="/forgot-password"/>
  }

  return (
    <Spin spinning={loading}>
      <NewPasswordFormStyled>
        <div className="form-title">
          <BigTitleStyled>Đặt lại mật khẩu</BigTitleStyled>
        </div>
        <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
          <Item
            name="newPassword"
            key="newPassword"
            label={<SmallTitleStyled>Mật khẩu mới</SmallTitleStyled>}
            validateTrigger={["onBlur"]}
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 kí tự" },
              { max: 18, message: "Mật khẩu chỉ có nhiều nhất 18 kí tự" },
            ]}
          >
            <TextInputStyled type="password" />
          </Item>
          <Item
            name="confirmPassword"
            key="confirmPassword"
            label={<SmallTitleStyled>Mật khẩu xác nhận</SmallTitleStyled>}
            validateTrigger={["onChange", "onBlur"]}
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu xác nhận" },
              {
                validator: async (rule, value) => {
                  let newPassword = form.getFieldValue("newPassword");
                  if (value !== newPassword) {
                    throw new Error(
                      "Mật khẩu xác nhận phải giống mật khẩu mới"
                    );
                  }
                },
              },
            ]}
          >
            <TextInputStyled type="password" />
          </Item>

          <div className="form-button">
            <RectangleButtonStyled width="100%" textcolor="#FFFFFF">
              <SmallTitleStyled>Xác nhận</SmallTitleStyled>
            </RectangleButtonStyled>
          </div>

          <div className="redirect-link to-login">
            <SmallActionStyled to="/login">
              Quay lại trang đăng nhập
            </SmallActionStyled>
          </div>
        </Form>
      </NewPasswordFormStyled>
    </Spin>
  );
};
export default NewPasswordForm;
