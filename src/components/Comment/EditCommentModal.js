import { useState } from "react";
//code của mình
import { ModalStyled } from "../Styled/Modal";
import { Form, Spin } from "antd";
import { TextInputStyled } from "../Styled/Input";
import { RectangleButtonStyled } from "../Styled/Button";
import { SmallTitleStyled, MediumTitleStyled } from "../Styled/Text";
import CommentInput from "./CommentInput";
const { Item } = Form;
const EditCommentModal = ({
  visible,
  onCancel,
  onEdit,
  textDefaultValue,
  loading,
}) => {
  //dùng để lưu trữ giá trị khi có thay đổi ở input
  const [textValue, setTextValue] = useState(textDefaultValue);

 

  //hàm xử lý khi nội dung ô nhập comment thay đổi
  const handleTextChange = (text) => {
    setTextValue(text);
  };

  const handleConfirmClick = () => {
    //gọi hàm chỉnh sửa  
    onEdit(textValue);
  }

  return (
    <ModalStyled
      zIndex={100006}
      onCancel={onCancel}
      footer={null}
      title={<MediumTitleStyled>Chỉnh sửa bình luận</MediumTitleStyled>}
      visible={visible}
    >
      <div>
        <div style={{ marginBottom: "8px" }}>
          <SmallTitleStyled>Nhập bình luận của bạn</SmallTitleStyled>
        </div>
        <CommentInput
          textDefaultValue={textValue}
          onChangeInput={handleTextChange}
          onEnterInput={() => {}}
          topEmoji={false}
        />
        <div style={{marginTop:"24px"}}>
        <Spin spinning={loading}>
          <RectangleButtonStyled width="100%" textcolor="#FFFFFF" onClick={handleConfirmClick}>
            <SmallTitleStyled>{loading ? "Đang trong quá trình cập nhật" : "Xác nhận"}</SmallTitleStyled>
          </RectangleButtonStyled>
        </Spin>
        </div>
      </div>
    </ModalStyled>
  );
};
export default EditCommentModal;
