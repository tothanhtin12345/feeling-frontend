import { Layout} from "antd";
import styled from "styled-components";

//code của mình
import { SiderAttr, HeaderAttr } from "../Contants/CSS-Attributes";
import { breakpoint } from "./mixin";

const { Content } = Layout;


export const ContentStyled = styled(Content)`
  /* border: 1px solid black; */
`;

export const MainContentStyled = styled(ContentStyled)`
  margin-top: ${HeaderAttr.height};
  //cách margin left 90px khi đạt md
  ${breakpoint.md`
    & {
      margin-left: ${SiderAttr.collapsedWidth};
    }
     
  `}
  //cách margin left 300px khi đạt lg
  ${breakpoint.lg`
    & {
      margin-left: ${SiderAttr.width};
    }
  `}
`;

export const SubContentStyled = styled(ContentStyled)`
  margin-top: 0;

  //nếu kế bên là phần tử SubSider
  &.near-sub-sider{
    /* border: 1px solid black; */
  }

  ${breakpoint.md`
    &.near-sub-sider {
      margin-right: ${SiderAttr.collapsedWidth};
    }
     
  `}
  //cách margin left và right 300px khi đạt lg
  ${breakpoint.lg`
    &.near-sub-sider {
      margin-right: ${SiderAttr.width};
    }
  `}

`