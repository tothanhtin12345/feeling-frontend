import styled from "styled-components";
import { Modal } from "antd";

//code của mình

export const ModalStyled = styled(Modal)`
  &&& {
    .ant-modal-content {
      border-radius: 12px;
    }
    .ant-modal-header {
      border-radius: 12px;
    }
    .ant-modal-body {
      padding: 15px;
    }
    .ant-modal-title {
      text-align: center;
    }
  }
`;

export const HeaderActionModalStyled = styled.div`
  display: ${({ visible }) => (visible ? `block` : `none`)};
  background-color: #ffffff;
  & {
    //nếu chứa một modal
    .modal {
      position: fixed;
      right: 20px;
      width: 350px;
      top: 64px;
      z-index: 1;
      border: 1px solid transparent;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      max-height: 85%;
      overflow-x: unset;
      overflow-y: scroll;
      max-width: 90%;
      transition: 0ms;
      .title {
        display: flex;
        justify-content: center;
      }
      .action {
        text-align: end;
      }
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

      //đổi màu của thanh scroll bar khi hover vàu
      /* :hover::-webkit-scrollbar-track {
        background-color: #ccced2;
      } */
    }

    /* .input-search {
      position: absolute;
      left: 0;
      top: -54px;
      z-index: 1;
      width: 350px;
      background-color: blue;
    } */
    /* .white-drop {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 0;
      width: 100%;
      height: 100vh;
      background-color: transparent;
    } */
  }
`;

export const HeaderModalStyled = styled(Modal)`
  &&& {
    top: 64px;
    margin-right: 20px;
    transform-origin: 0px;
    width: 350px !important;

    .ant-modal-content {
      width: 100%;
      /* max-height: 80vh;
      overflow: scroll;
      overflow-y: auto;
      overflow-x: hidden; */
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
      .ant-modal-body {
        padding: 5px;
      }
    }
  }
`;