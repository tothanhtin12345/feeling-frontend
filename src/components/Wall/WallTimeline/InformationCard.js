import styled from "styled-components";
//code của mình

import {
  SmallTitleStyled,
  MediumContentStyled,
  MediumTitleStyled,
} from "../../Styled/Text";

const InformationCardStyled = styled.div`
  padding: 10px 15px;
  margin-bottom: 16px;
  background-color: #ffffff;
  border: 1px solid transparent;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  .information-wrapper {
    margin-top: 16px;

    .information-item {
      margin-bottom: 8px;
      display: flex;
      column-gap: 10px;
      align-items: flex-start;

      .content-title,
      .content-main {
        word-break: break-all;
      }
    }
  }
`;

const commonKey = "card-information";

//một loại card chứa các thông tin thường được hiển thị ở wall (cả individual và group)
//title: title của card
//informations: một mảng các thông tin cần hiển thị
const InformationCard = ({ title, informations }) => {
  return (
    <InformationCardStyled>
      <div className="card-title">
        <MediumTitleStyled>{title}</MediumTitleStyled>
      </div>
      <div className="information-wrapper">
        {informations.map((item, index) => (
          <div
            className="information-item"
            key={`${commonKey}-ifcard-${index}`}
          >
            <div className="information-item-icon">
              {/* <SmallIconStyled className="fas fa-clock"></SmallIconStyled> */}
              {item.icon}
            </div>
            <div className="information-item-content">
              <div className="content-title">
                <SmallTitleStyled>{item.title}</SmallTitleStyled>
              </div>
              <div className="content-main">
                <MediumContentStyled>{item.content}</MediumContentStyled>
              </div>
            </div>
          </div>
        ))}
      </div>
    </InformationCardStyled>
  );
};
export default InformationCard;
