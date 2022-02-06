import styled from "styled-components";
import { NavLink } from "react-router-dom";

//định dạng cho phần Title

const TitleStyled = styled.span`
  font-weight: bold;
  color: #3e3f5e;
`;

export const BigTitleStyled = styled(TitleStyled)`
  font-size: 20px;
  color: ${({ color }) => (color ? color : "#615dfa")};
`;

export const MediumTitleStyled = styled(TitleStyled)`
  font-size: 16px;
  ${({ color }) => color && `color:${color};`}
`;

export const SmallTitleStyled = styled(TitleStyled)`
  font-size: 14px;
  ${({ color }) => color && `color:${color};`}
`;

//định dạng cho phần nội dung

const ContentStyled = styled.span`
  color: #3e3f5e;
`;

export const BigContentStyled = styled(ContentStyled)`
  ${({ color }) => color && `color:${color};`}
  font-size: 20px;
`;

export const MediumContentStyled = styled(ContentStyled)`
  ${({ color }) => color && `color:${color};`}
  font-size: 14px;
`;

export const SmallContentStyled = styled(ContentStyled)`
  ${({ color }) => color && `color:${color};`}
  font-size: 12px;
`;

//định dạng cho phần chữ có chức năng mở rộng - đi đến trang khác
const ActionStyled = styled(NavLink)`
  font-weight: bold;
  color: #3e3f5e;

  //khi nút được nhấn
  &.active {
    color: #615dfa !important;
  }
  //khi muốn nút đổi sang màu tím
  &.purple {
    color: #615dfa !important;
  }
`;

export const BigActionStyled = styled(ActionStyled)`
  ${({ color }) => color && `color:${color};`}
  font-size: 20px;
`;
export const MediumActionStyled = styled(ActionStyled)`
  ${({ color }) => color && `color:${color};`}
  font-size: 16px;
`;
export const SmallActionStyled = styled(ActionStyled)`
  ${({ color }) => color && `color:${color};`}
  font-size: 14px;
`;
