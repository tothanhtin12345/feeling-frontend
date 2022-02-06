import { Menu } from "antd";
import styled from "styled-components";
//code của mình
import { MediumActionStyled } from "../Styled/Text";

const { Item } = Menu;

const ItemHorizontalMenuStyled = styled(Item)`
  &:after {
    display: none;
  }
  &&& a {
    color: #3e3f5e;
  }
  &&&:hover a {
    color: #adafca;
  }
  &&&.ant-menu-item-selected a {
    color: #3e3f5e;
  }
`;

const HorizontalMenuStyled = styled(Menu)`
  &&&.ant-menu-horizontal {
    border-bottom: 1px solid transparent;
  }
`;

//menu dạng nằm ngang
let commonKey = "horizontal-menu-item-list";
const HorizontalMenu = ({ itemList, className }) => {
  return (
    <HorizontalMenuStyled className={`${className}`} mode="horizontal">
      {itemList.map((item, index) => (
        <ItemHorizontalMenuStyled
          key={`${commonKey}-1-${index}-${item.path}`}
        >
          <MediumActionStyled exact={item.exact} to={item.path}>
            {item.title}
          </MediumActionStyled>
        </ItemHorizontalMenuStyled>
      ))}
    </HorizontalMenuStyled>
  );
};
export default HorizontalMenu;
