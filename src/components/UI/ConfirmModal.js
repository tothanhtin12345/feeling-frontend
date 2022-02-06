import { Spin, Space } from "antd";
//code của mình
import { ModalStyled } from "../Styled/Modal";
import {
  MediumTitleStyled,
  MediumContentStyled,
  SmallTitleStyled,
} from "../Styled/Text";
import { RectangleButtonStyled } from "../Styled/Button";

const ConfirmModal = ({ onConfirm, onCancel, title, content, loading }) => {
  return (
    <ModalStyled
      onCancel={loading ? () => {} : onCancel}
      onConfirm={onConfirm}
      title={<MediumTitleStyled>{title}</MediumTitleStyled>}
      footer={[
        <div
          key="footer-wrapper-confirm"
          style={{
            display: "flex",
            columnGap: "1px",
            justifyContent: "flex-end",
          }}
        >
          <RectangleButtonStyled
            onClick={onCancel}
            key="modal-button-confirm-cancel"
            style={{ marginRight: "10px" }}
            textcolor={loading ? "#FFFFFF" : "#3e3f5e"}
            color="#FFFFFF"
            disabled={loading}
            className="text"
          >
            <SmallTitleStyled>Hủy bỏ</SmallTitleStyled>
          </RectangleButtonStyled>
          ,
          <Spin spinning={loading} key="modal-button-confirm-confirm">
            <RectangleButtonStyled onClick={onConfirm} textcolor="#FFFFFF">
              <SmallTitleStyled>
                {loading ? "Đang xử lý" : "Xác nhận"}
              </SmallTitleStyled>
            </RectangleButtonStyled>
          </Spin>
          ,
        </div>,
      ]}
      visible={true}
      zIndex={10010}
    >
      <MediumContentStyled key="modal-confirm-content">
        {content}
      </MediumContentStyled>
    </ModalStyled>
  );
};

export default ConfirmModal;
