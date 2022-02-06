import { useEffect } from "react";
import { Form, Spin } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
//code của mình
import { SmallTitleStyled, MediumContentStyled } from "../Styled/Text";
import { RectangleButtonStyled } from "../Styled/Button";
import { TextInputStyled } from "../Styled/Input";

import {
  setChangePasswordFormMessage,
  changePasswordSaga,
} from "../../store/modules/ChangePasswordForm/slice";
import {
  getChangePasswordFormLoading,
  getChangePasswordFormMessage,
} from "../../store/modules/ChangePasswordForm/selectors";

const { Item } = Form;

const ChangePasswordFormStyled = styled.div``;

const ChangePasswordForm = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const loading = useSelector(getChangePasswordFormLoading);
  const message = useSelector(getChangePasswordFormMessage);

  const handleSubmitForm = (values) => {
    delete values["confirmPassword"]
    dispatch(changePasswordSaga(values));
  };

  const handleFormClick = () => {
    if(message){
      dispatch(setChangePasswordFormMessage(null));
    }
  }

  useEffect(()=>{
    if(!loading){
      form.resetFields();
    }
  },[loading])

  return (
    <ChangePasswordFormStyled>
      {message && (
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <MediumContentStyled color="#615DFA">{message}</MediumContentStyled>
        </div>
      )}
      <Form onClick={handleFormClick} form={form} layout="vertical" onFinish={handleSubmitForm}>
        <Item
          name="currentPassword"
          key="currentPassword"
          label={<SmallTitleStyled>Mật khẩu hiện tại</SmallTitleStyled>}
          validateTrigger={["onBlur"]}
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu hiện tại" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 kí tự" },
            { max: 18, message: "Mật khẩu chỉ có nhiều nhất 18 kí tự" },
          ]}
        >
          <TextInputStyled type="password" />
        </Item>
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
                  throw new Error("Mật khẩu xác nhận phải giống mật khẩu mới");
                }
              },
            },
          ]}
        >
          <TextInputStyled type="password" />
        </Item>

        <Spin spinning={loading}>
          <RectangleButtonStyled width="100%" textcolor="#FFFFFF">
            <SmallTitleStyled>
              {loading ? "Đang thay đổi" : "Thay đổi"}
            </SmallTitleStyled>
          </RectangleButtonStyled>
        </Spin>
      </Form>
    </ChangePasswordFormStyled>
  );
};
export default ChangePasswordForm;
