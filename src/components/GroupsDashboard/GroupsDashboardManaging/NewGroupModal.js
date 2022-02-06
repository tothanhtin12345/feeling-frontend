import { Form, Spin } from "antd";
import { useSelector } from "react-redux";
//code của mình
import { ModalStyled } from "../../Styled/Modal";
import { MediumTitleStyled, SmallTitleStyled } from "../../Styled/Text";
import { TextInputStyled, TextAreaStyled } from "../../Styled/Input";
import { RectangleButtonStyled } from "../../Styled/Button";

import { getNewGroupLoading } from "../../../store/modules/GroupDashboardManaging/selectors";
const { Item } = Form;

//type: add hoặc update
const NewGroupModal = ({
  visible,
  onSubmit,
  onCancel,
  groupName = "",
  groupDes = "",
  type="add"
}) => {
  const [form] = Form.useForm();

  const newGroupLoading = useSelector(getNewGroupLoading);

  const handleOnCloseModal = () => {
    //nếu đang xử lý nộp form thì không phép đóng modal
    if (newGroupLoading) return;

    onCancel();
  };

  const handleSubmit = (values) => {
    // console.log(values);
    onSubmit(values);
  };

  const title = type ==="add" ? "Tạo nhóm mới" : "Cập nhật thông tin nhóm";
  const buttonTitle = type ==="add" ? "Tạo nhóm" : "Cập nhật";
  const buttonTitleLoading = type ==="add" ? "Đang tạo nhóm" : "Đang cập nhật";
  return (
    <ModalStyled
      onCancel={handleOnCloseModal}
      visible={visible}
      footer={null}
      zIndex={10006}
      title={<MediumTitleStyled>{title}</MediumTitleStyled>}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Item
          label={<SmallTitleStyled>Tên nhóm</SmallTitleStyled>}
          key="groupName"
          name="groupName"
          validateTrigger={["onBlur"]}
          rules={[
            { required: true, message: "Vui lòng nhập tên nhóm" },
            { min: 6, message: "Tên nhóm phải có ít nhất 6 kí tự" },
            { max: 30, message: "Tên nhóm chỉ có tối đa 30 kí tự" },
          ]}
          initialValue={groupName}
        >
          <TextInputStyled type="text" />
        </Item>
        <Item
          label={<SmallTitleStyled>Mô tả về nhóm</SmallTitleStyled>}
          key="groupDes"
          name="groupDes"
          validateTrigger={["onChange", "onBlur"]}
          rules={[
            {
              validator: async (rule, value) => {
                if (value && value.length > 100) {
                  throw new Error("Mô tả chỉ được đạt đến 100 kí tự");
                }
              },
            },
          ]}
          initialValue={groupDes}
        >
          <TextAreaStyled></TextAreaStyled>
        </Item>
        <Spin spinning={newGroupLoading}>
          <RectangleButtonStyled
            style={{ marginTop: "16px" }}
            type="submit"
            width="100%"
            textcolor="#FFFFFF"
          >
            <SmallTitleStyled>
              {newGroupLoading ? buttonTitleLoading : buttonTitle}
            </SmallTitleStyled>
          </RectangleButtonStyled>
        </Spin>
      </Form>
    </ModalStyled>
  );
};

export default NewGroupModal;
