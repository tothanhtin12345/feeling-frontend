import { Menu } from "antd";
import styled from "styled-components";
//code của mình

const { Item } = Menu;

const DropdownMenuItemStyled = styled(Item)`
  & {
    .ant-dropdown-menu-title-content {
      display: flex;
    }
    .ant-menu-title-content {
      display: flex;
    }
    .icon::after {
      display: table;
      content: "";
      width: 30px;
    }
  }
  &&&.ant-menu-item-selected {
    background-color: #ffffff;
  }

  &:hover {
    background-color: #eaeafd;
  }
`;

//các item thuộc dropdown menu item

//icon: font-awesome
let commonKey = "dropdown-menu-item";
const DropdownMenuItem = ({ icon, title, onClick, itemKey }) => {

  return (
    <DropdownMenuItemStyled key={`${commonKey}-${itemKey}`} onClick={onClick}>
      {icon && <div className="icon">{icon}</div>}
      <div className="title">{title}</div>
    </DropdownMenuItemStyled>
  );
};

export default DropdownMenuItem;
