import { Tooltip, Modal } from "antd";

//code của mình
import { NavLinkMenuItemStyled } from "../../Styled/Menu";
import { SmallTitleStyled } from "../../Styled/Text";
import useConfirmNavigation from "../../../hooks/url/useConfirmNavigation";

//pathExact: liệu có cần phải chính xác đường dẫn navlink để active className không
const MainMenuItem = ({
  path,
  pathExact = true,
  icon,
  content,
  indrawer,
  onClick,
  showactive= true,
  ...props
}) => {
 
const {confirmNavigationHandler} = useConfirmNavigation();
 
const handleOnclick = () => {
  //thực hiện hàm onClick bên ngoài truyền vào (nếu có)
  if(onClick){
    onClick();
  }
}

  return (
    <li>
      <Tooltip zIndex={10001} title={content} placement="right">
        <NavLinkMenuItemStyled
          showactive={showactive ? "true" : "false"}
          exact={pathExact}
          indrawer={indrawer}
          to={path}
          onClick={handleOnclick}
        >
          <div className="menu-item-icon">{icon}</div>
          <div className="menu-item-content">
            <SmallTitleStyled>{content}</SmallTitleStyled>
          </div>
        </NavLinkMenuItemStyled>
      </Tooltip>
    </li>
  );
};

export default MainMenuItem;
