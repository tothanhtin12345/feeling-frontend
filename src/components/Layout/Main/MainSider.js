//code của mình
import { MainSiderStyled } from "../../Styled/Sider";
import { SiderAttr } from "../../Contants/CSS-Attributes";

const MainSider = ({ className, children, ...props }) => {
  return (
    <MainSiderStyled
      
      collapsedWidth={SiderAttr.collapsedWidth}
      breakpoint="lg"
      width={SiderAttr.width}
      className={className}
    >
      {children}
    </MainSiderStyled>
  );
};

export default MainSider;
