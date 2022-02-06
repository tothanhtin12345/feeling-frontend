import {Drawer} from 'antd';
import styled from 'styled-components';

export const MainDrawerStyled = styled(Drawer)`
z-index: 10001;

&&&{
  .ant-drawer-content{
    height: auto;
  }
  .ant-drawer-body{
    padding: 5px 0px 0px 0px;
  }
}
`;