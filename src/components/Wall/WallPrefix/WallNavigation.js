import styled from "styled-components";
import { Menu } from "antd";

//code của mình
import { MediumActionStyled } from "../../Styled/Text";
import HorizontalMenu from "../../UI/HorizontalMenu";




const WallNavigationStyled = styled.div`
  
`;
//không dùng nữa
let commonKey = "wall-navigation-item-list";
const WallNavigation = ({ navigationItems = [] }) => {
  return (
    <WallNavigationStyled className="wall-navigation">
      <HorizontalMenu itemList={navigationItems}/>
    </WallNavigationStyled>
  );
};
export default WallNavigation;
