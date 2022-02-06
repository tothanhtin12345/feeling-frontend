import styled from "styled-components";
import { Spin } from "antd";
//code của mình
import { RectangleButtonStyled } from "../../Styled/Button";
import { SmallTitleStyled } from "../../Styled/Text";

const WallConfirmSaveImageStyled = styled.div`
  width: 100%;
  position: fixed;
  z-index: 10010;
  top: 0;
  left: 0;
  background-color: #ffffff;
  height: 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 3px;
  padding: 0px 15px;
  transition: 0.3s all;

  & * {
    display: none;
  }
  &.visible {
    height: 64px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }
  &.visible * {
    display: block;
  }
`;

//xác nhận lưu hình đại diện hoặc ảnh bìa
const WallConfirmSaveImage = ({ onConfirm, onCancel, visible, loading }) => {
  return (
    <WallConfirmSaveImageStyled
      className={`${visible === true ? "visible" : ""}`}
    >
      <div>
        <SmallTitleStyled>
          {loading
            ? "Vui lòng chờ trong giây lát"
            : "Bạn có muốn lưu lại hình không ?"}
        </SmallTitleStyled>
      </div>
      {!loading && (
        <RectangleButtonStyled color="#FFFFFF" onClick={onCancel}>
          <SmallTitleStyled>Hủy bỏ</SmallTitleStyled>
        </RectangleButtonStyled>
      )}
      <Spin spinning={loading}>
        <RectangleButtonStyled textcolor="#FFFFFF" onClick={onConfirm}>
          <SmallTitleStyled>
            {loading ? "Đang xử lý" : "Xác nhận"}
          </SmallTitleStyled>
        </RectangleButtonStyled>
      </Spin>
    </WallConfirmSaveImageStyled>
  );
};

export default WallConfirmSaveImage;
