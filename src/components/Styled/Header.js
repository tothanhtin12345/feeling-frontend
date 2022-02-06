import { Layout} from "antd";
import styled from "styled-components";

//code của mình
import { breakpoint } from "./mixin";
import { SmallTitleStyled } from "./Text";

const { Header } = Layout;

//định dạng lại cho Header
export const HeaderStyled = styled.div`
  position: fixed;
  z-index: 10000;
  background-color: #FFFFFF;
  width: 100%;
  padding: 0 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  &{
    
    .header-items{
      height: 64px;
      display: flex;
      justify-content: space-between;
    }
    .header-section{
      display: flex;
      align-items: center;
      column-gap: 10px;
      position: relative;
      
    }
    .drawer-button{
      display: block;
    }
    //định dạng cho cái nút navlink avtar
    .avatar-button{
      //khi ở kích thước thấp thì không hiển thị
      display: none;
      align-items: center;
      column-gap: 2px;
      border-radius: 100px;
      padding: 5px 20px 5px 5px;
     
    }

    .avatar-button.active{
      background-color: #615DFA;
      ${SmallTitleStyled}{
        color: #FFFFFF;
      }
    }

    .avatar-button:hover:not(.active){
      background-color: #EAEAFD;
    }
    .right-section{
      display: none;
    }

    ${breakpoint.md`
      .drawer-button{
        display:none;
      }
      .avatar-button{
        display:flex;
      }
    `}

    ${breakpoint.sm`
     
      .right-section{
        display:flex;
      }
    `}

  }
`;

