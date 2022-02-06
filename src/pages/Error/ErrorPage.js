import styled from "styled-components";

//code của 
import { BigTitleStyled , SmallTitleStyled} from "../../components/Styled/Text";
import {RectangleButtonStyled} from "../../components/Styled/Button";
import history from "../../utils/history";

const ErrorPageStyled = styled.div`
  
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90vh;
    row-gap: 10px;
  }
  
`;

const ErrorPage = ({errorTitle, urlTo, }) => {
  return (
    <ErrorPageStyled>
      <div className="wrapper">
        <div className="title">
          <BigTitleStyled color="#3e3f5e">{errorTitle}</BigTitleStyled>
        </div>
        <div className="action">
          <RectangleButtonStyled width="100%" onClick={() => {history.replace(urlTo)}}>
            <SmallTitleStyled color="#FFFFFF">Trở về trang chủ</SmallTitleStyled>
          </RectangleButtonStyled>
        </div>
        <div></div>
      </div>
    </ErrorPageStyled>
  );
};
export default ErrorPage;
