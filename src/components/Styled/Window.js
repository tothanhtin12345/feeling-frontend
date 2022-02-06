import styled from "styled-components";

export const WindowStyled = styled.div`
  padding: 5px;
  &.scroll-list {
    max-height: 80vh;
    overflow: scroll;
    overflow-y: auto;
    overflow-x: hidden;
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
  }
  & {
    .window-title {
      text-align: center;
    }
    .window-action {
      text-align: end;
    }
    .content {
    }
  }
`;
