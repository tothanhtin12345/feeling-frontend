import styled from "styled-components";
import { BigTitleStyled } from "../Styled/Text";
//code của mình

//styled cho cái thằng string thông báo không có dữ liệu
const NoDataTitleStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0px;

  & {
    ${BigTitleStyled} {
      @keyframes fadingTitle {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      animation-name: fadingTitle;
      animation-duration: 0.3s;
    }
  }
`;

const NoDataTitle = ({ message }) => {
  return (
    <NoDataTitleStyled>
      <BigTitleStyled color="#3e3f5e">{message}</BigTitleStyled>
    </NoDataTitleStyled>
  );
};

export default NoDataTitle;
