import styled from 'styled-components';
import { breakpoint } from './mixin';
export const OnlineListStyled = styled.div`
  padding: 5px;
  height: 100%;
  max-height: calc(100vh - 66px);
  overflow: scroll;
  overflow-x: unset;
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
    .online-prefix {
      display: flex;
      justify-content: center;
      padding: 0px 10px;

      .online-button {
        display: none;
      }

      ${breakpoint.lg`
        .online-button{
          display:block;
        }
      `}
    }
    ${breakpoint.lg`
        .online-prefix{
          justify-content: space-between;
        }
      `}
  }

  //định dạng cho item user - group
  &&& {
    .prefix {
      justify-content: center;
      width: 100%;
    }
    .main-content {
      flex-direction: row;
      justify-content: space-between;
      display: none;
    }

    .sub-title {
      white-space: nowrap;
    }

    ${breakpoint.lg`
      .main-content{
        display: flex;
      }
      
    `}
  }
`;
