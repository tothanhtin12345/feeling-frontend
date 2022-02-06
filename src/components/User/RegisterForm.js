import { Form, Spin, Radio } from "antd";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//code của mình
import {
  BigTitleStyled,
  SmallTitleStyled,
  SmallActionStyled,
} from "../Styled/Text";
import { RectangleButtonStyled } from "../Styled/Button";
import { TextInputStyled } from "../Styled/Input";
import { submitRegisterSaga } from "../../store/modules/Register/slice";
import { getRegisterLoading } from "../../store/modules/Register/selectors";
import { RadioStyled } from "../Styled/Input";
const { Item } = Form;
const RegisterFormStyled = styled.div`
  & {
    .form-title {
      margin-bottom: 16px;
      text-align: center;
    }
    .redirect-link {
      text-align: start;
    }

    .form-button {
      margin-top: 8px;
    }
    .to-login {
      margin-top: 16px;
    }
  }
`;

const RegisterForm = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const loading = useSelector(getRegisterLoading);

  const handleSubmitForm = (values) => {
    if (loading) return;
    console.log(values);
    delete values.confirmPassword;
    dispatch(submitRegisterSaga(values));
  };
  return (
    <Spin size="large" spinning={loading}>
      <RegisterFormStyled>
        <div className="form-title">
          <BigTitleStyled>Đăng ký</BigTitleStyled>
        </div>
        <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
          <Item
            label={<SmallTitleStyled>Họ và tên</SmallTitleStyled>}
            key="displayName"
            name="displayName"
            validateTrigger={["onBlur"]}
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên" },
              { min: 3, message: "Họ và tên ít nhất phải từ 3 kí tự" },
            ]}
          >
            <TextInputStyled />
          </Item>
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
          <Item
            name="confirmPassword"
            key="confirmPassword"
            label={<SmallTitleStyled>Mật khẩu xác nhận</SmallTitleStyled>}
            validateTrigger={["onChange", "onBlur"]}
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu xác nhận" },
              {
                validator: async (rule, value) => {
                  let password = form.getFieldValue("password");
                  if (value !== password) {
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
          <Item
            label={<SmallTitleStyled>Địa chỉ Email</SmallTitleStyled>}
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
          <Item
          name="gender"
          key="gender"
          label={<SmallTitleStyled>Giới tính</SmallTitleStyled>}
          required
          initialValue="male"
        >
          <Radio.Group>
            <RadioStyled value="male">Nam</RadioStyled>
            <RadioStyled value="female">Nữ</RadioStyled>
          </Radio.Group>
        </Item>

          <div className="form-button">
            <RectangleButtonStyled width="100%" textcolor="#FFFFFF">
              <SmallTitleStyled>Đăng ký</SmallTitleStyled>
            </RectangleButtonStyled>
          </div>

          <div className="redirect-link to-login">
            <SmallActionStyled to="/login">
              Trở về trang đăng nhập
            </SmallActionStyled>
          </div>
        </Form>
      </RegisterFormStyled>
    </Spin>
  );
};
export default RegisterForm;
