import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { breakpoint } from "./mixin";

//định dạng tự tạo một Menu
export const MainMenuStyled = styled.div`
  padding: 5px 15px 0px 15px;
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: scroll;
  //kích thước của toàn bộ thanh scrollbar (thanh chứa cục scroll và cả cục scroll)
  ::-webkit-scrollbar {
    width: 10px;
  }
  //màu của thanh scrollbar (nằm dưới cục scroll)
  ::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 8px;
  }
  //cái cục scroll
  ::-webkit-scrollbar-thumb {
    background: #ffffff;
  }
  //đổi màu cục scroll khi scroll vào
  :hover::-webkit-scrollbar-thumb {
    background: #ccced2;
  }

  & {
    ul {
      list-style: none;
      padding: 0px;
      display: flex;
      flex-direction: column;
      //cho các phần tử li nằm ở center khi menu ở kích thước nhỏ
      ${({ indrawer }) => {
        if (!indrawer) {
          return `
        align-items: center;
        `;
        }
      }}
    }
  }
  //cho các phần tử li năm full width  khi menu ở kích thước lg
  ${breakpoint.lg`
    & ul{
      align-items: unset;
    }
  `}
`;

//định dạng cho Item của Menu
export const NavLinkMenuItemStyled = styled(NavLink)`
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  height: 40px;
  margin-bottom: 8px;
  column-gap: 15px;

  & {
    //màu cho icon và content ban đầu
    * {
      color: #3e3f5e;
    }
    //định dạng cho thẻ bao icon
    .menu-item-icon {
      width: 26px;
      text-align: center;
    }
    //định dạng cho phần nội dung bị ẩn ban đầu
    ${({ indrawer }) => {
      if (!indrawer) {
        return `
        .menu-item-content {
          display: none;
        }
        `;
      }
    }}
  }

  //khi thẻ NavLink được kích hoạt (active)
  ${({ showactive }) => {
    if (showactive === "true") {
      return `&.active, &:active {
              background-color: #615dfa;

              * {
                color: #ffffff;
              }
            }`;
    }
  }}

  //khi hover và không chứa class active
  &:hover:not(.active) {
    background-color: #eaeafd;
  }

  //khi ở kích thước lg và menu này không nằm trong drawer thì định dạng theo kiểu collapsed
  ${breakpoint.lg`
    justify-content:unset;
    width:100%;
    & .menu-item-content{
      display:block;
      
    }
    
  `}
`;
export const HorizontalMenuWrapperStyled = styled.div`
  width: 100%;
  & {
    ul {
      border: 1px solid transparent;
      border-radius: 15px;
    }
  }
`;
