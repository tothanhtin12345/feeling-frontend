import { Layout } from "antd";
import styled from "styled-components";

//code của mình
import { breakpoint } from "./mixin";
import { HeaderAttr } from "../Contants/CSS-Attributes";

const { Sider } = Layout;

export const SiderStyled = styled(Sider)`
  position: fixed;
  //ban đầu là ẩn
  display: none;

  &.ant-layout-sider {
    background-color: #ffffff;
  }

  //định dạng display: block nếu đạt md

  ${breakpoint.md`
    & {
      display: block;
    }
   `}
`;

//định dạng lại cho Sider
export const MainSiderStyled = styled(SiderStyled)`
  height: 100vh;
  

  margin-top: ${HeaderAttr.height};

  //định dạng cho sider có thêm class sider-right
  //sider-right thường nằm bên trong Main Content mà Main Content đã set margin-top: 64px
  //nên ta bỏ margin-top ở đây
  &.sider-right {
    right: 0;
    margin-top: 0;
  }
`;
