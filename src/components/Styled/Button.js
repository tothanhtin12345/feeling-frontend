import styled from "styled-components";
import { MediumIconStyled, SmallIconStyled } from "./Icon";
import { Dropdown } from "antd";
import { Button } from "antd";

//định dạng cho các button icon font-awesome
export const IconButtonStyled = styled(Button)`
  cursor: pointer;
  height: 38px;
  width:38px;

  border: 1px solid transparent;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  ${({color})=>color && `background-color:${color};`}

  &&&.ant-btn-icon-only {
    /* width: auto; */
  }

  &.ant-btn:hover {
    border: 1px solid transparent;
    outline: none;
  }

  &:active,
  &.active,
  &:focus {
    border: 1px solid transparent;
    outline: none;
  }
`;
//định dạng cho các button icon nằm trên header
export const HeaderIconButtonStyled = styled(IconButtonStyled)`
  background-color: #f0f2f5;
  padding: 10px;
  &:focus {
    background-color: #f0f2f5;
  }
  &:hover {
    background-color: #eaeafd;
  }
  &:active,
  &.active {
    background-color: #615dfa;
    ${MediumIconStyled}, ${SmallIconStyled} {
      color: #ffffff;
    }
  }
`;

//định dạng cho dropdown icon button
export const DropDownButtonStyled = styled(Dropdown.Button)`
  & {
    .ant-btn:nth-child(1) {
      display: none;
    }
    .ant-dropdown-trigger {
      /* border: 1px solid #F0F2F5; */
      border: none;
      border-radius: 100%;
      background-color: #ffffff;

      :hover {
        background-color: #f0f2f5;
      }
    }
    .ant-dropdown-open {
      border-radius: 100%;
    }
    .ant-dropdown-open::after {
    }
  }
  &.ant-btn-group > .ant-btn:last-child:not(:first-child) {
    border-top-right-radius: 100%;
    border-bottom-right-radius: 100%;
  }
`;

//định dạng cho dropdown button dạng hình chữ nhật
export const ReactangleDropDownButtonStyled = styled(Dropdown.Button)`
  & {
    .ant-btn:nth-child(1) {
      display: none;
    }
    .ant-dropdown-trigger {
      /* border: 1px solid #F0F2F5; */
      border: 1px solid transparent;
      border-radius: 8px;
      background-color: #f0f2f5;

      :hover {
        background-color: #f0f2f5;
      }
    }
    .ant-dropdown-open {
      border-radius: 8px;
    }
  }
  &.ant-btn-group > .ant-btn:last-child:not(:first-child) {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

//định dạng nút dropdown button trên header
//định dạng cho dropdown icon button
export const DropDownHeaderButtonStyled = styled(Dropdown.Button)`
  & {
    .ant-btn {
      width: 40px;
      height: 40px;
    }
    .ant-dropdown-trigger {
      /* border: 1px solid #F0F2F5; */
      border: none;
      border-radius: 100%;
      background-color: #f0f2f5;

      :hover {
        background-color: #615dfa;
        * {
          color: #ffffff;
        }
      }
    }
    .ant-dropdown-open {
      border-radius: 100%;
      background-color: #615dfa;
      * {
        color: #ffffff;
      }
    }
    .ant-dropdown-open::after {
    }
    //bỏ đi cái button do antd tự tạo
    .ant-btn-default:nth-child(1) {
      display: none;
    }
  }
  &.ant-btn-group > .ant-btn:last-child:not(:first-child) {
    border-top-right-radius: 100%;
    border-bottom-right-radius: 100%;
  }

  &.ant-btn-group {
    .ant-btn {
      :focus,
      :hover {
        z-index: 0;
      }
    }
  }
`;

//dành cho cửa sổ chat
export const ChatWindowButtonStyled = styled(IconButtonStyled)`
  &&& {
    border: none;
  }
  &&&:hover {
    border-color: transparent;
  }
`;

//dropdown dành cho input chat
export const ChatDropDownButtonStyled = styled(Dropdown.Button)`
  & {
    .ant-btn:nth-child(1) {
      display: none;
    }
    .ant-dropdown-trigger {
      /* border: 1px solid #F0F2F5; */
      border: none;
      border-radius: 100%;
      background-color: transparent;
      width: 12px;
      height: 12px;

      :hover {
        background-color: #ffffff;
      }
    }
    .ant-dropdown-open {
      border-radius: 100%;
      i {
        color: #615dfa;
      }
    }
    .ant-dropdown-open::after {
    }
  }
  &.ant-btn-group > .ant-btn:last-child:not(:first-child) {
    border-top-right-radius: 100%;
    border-bottom-right-radius: 100%;
  }
`;

export const IconUploadButtonStyled = styled(IconButtonStyled)`
  .fas {
    color: #ff4d4f;
  }
  &:hover {
    background-color: #eaeafd;
    border: 1px solid transparent;
  }
  &:active,
  &.active {
    border: 1px solid transparent;
    background-color: #615dfa;
    ${MediumIconStyled}, ${SmallIconStyled} {
      color: #ffffff;
    }
  }
`;

export const RemoveFileIconButtonStyled = styled(IconButtonStyled)`
  .fas {
    color: #3e3f5e;
  }
  &:hover {
    background-color: #e4e6eb;
    border: 1px solid transparent;
  }
  &:active,
  &.active {
    border: 1px solid transparent;
    background-color: #e4e6eb;
  }
`;

export const RectangleButtonStyled = styled.button`
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 5px 5px;
  cursor: pointer;
  transition: all 0.2s;

  background-color: ${({ color }) => (color ? color : "#615DFA")};

  ${({ width }) => width && `width:${width};`}

  span {
    ${({ textcolor }) => textcolor && `color:${textcolor};`}
  }

  &:disabled {
    background-color: #ccced2;
    cursor: unset;
  }

  &:hover:not(.text,.post-action-button){
    background-color:#FFFFFF;
    border-color:${({ color }) => (color ? color : "#615DFA")};
    color:${({ color }) => (color ? color : "#615DFA")};
    span, i{
      color:${({ color }) => (color ? color : "#615DFA")} !important;;
      
      
    }
    
  }
  &:hover.text{
    border-color:${({ textcolor }) => (textcolor ? textcolor : "#615DFA")};
    
  }

`;
//dành cho các nút thích, chia sẻ, comment trên bài viết
export const RectanglePostButtonStyled = styled(RectangleButtonStyled)`
  background-color: ${({ color }) => (color ? color : "transparent")};
  &:hover {
    background-color: #eaeafd;
  }
`;

//nút dành cho các phần setting
export const RectangleSettingButtonStyled = styled(RectangleButtonStyled)`
  background-color: #f0f2f5;
  padding: 5px 20px;
  &:hover {
    background-color: #eaeafd;
  }
  &.ant-dropdown-open {
    background-color: #615dfa;

    span,
    i {
      color: #ffffff;
    }
  }
`;
