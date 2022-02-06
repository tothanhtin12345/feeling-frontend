import { Tooltip } from "antd";
import styled from "styled-components";

//code của mình
import { MediumIconStyled } from "../Styled/Icon";

const ErrorOverlayStyled = styled.div`
  position: relative;
  .error-alert {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    display: block;
    width: 100%;
    height: 100%;
    max-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    .fas {
      color: red;
    }
  }
  .content {
    opacity: 0.5;
  }
`;

//một component hiển thị lỗi nằm đè lên một component khác

const ErrorOverlay = ({ error, children, ...props }) => {
  return (
    <ErrorOverlayStyled>
      <Tooltip title={error}>
        <div className="error-alert">
          <MediumIconStyled className="fas fa-exclamation-circle"></MediumIconStyled>
        </div>
      </Tooltip>

      <div className="content">{children}</div>
    </ErrorOverlayStyled>
  );
};

export default ErrorOverlay;
