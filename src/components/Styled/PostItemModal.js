import styled from "styled-components";
import { breakpoint } from "./mixin";

export const PostItemModalFileStyled = styled.div`
  width: 100%;

  align-items: center;
  background: black;
  justify-content: center;
  display: none;
  &.active {
    display: flex;
  }

  & {
    img {
      width: 100%;
      height: 50vh;
      object-fit: contain;
      //đạt 100vh khi ở chế độ màn hình lớn
      ${breakpoint.md`
        height: 100vh;
      `}
    }
    video {
      max-width: 100%;
      height: 50vh;
      object-fit: contain;
      ${breakpoint.md`
        height: 100vh;
      `}
    }
  }
`;

export const PostItemModalContainerStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  .post-item-modal-files {
    width: 100%;
    position: relative;

    .arrow,
    .close-button {
     
      cursor: pointer;
      position: absolute;
      width: 45px;
      height: 45px;
      background-color: #eaeafd;
      border: 1px solid transparent;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      display: flex;
      ${breakpoint.md`
      display: none;
    `}
    }
    .arrow-next {
      top: 50%;
      right: 1%;
    }
    .arrow-previous {
      top: 50%;
      left: 1%;
    }
   
  }
  .post-item-modal-files:hover {
    .arrow {
      display: flex;
    }
  }

  .post-item-modal-information {
    min-height: 100%;
    max-height: 100vh;

    //khi ở màn hình lớn thì cho phép scroll phần information bên phải
    //còn khi ở kích thước nhỏ (<md) thì scroll cả modal
    ${breakpoint.md`
    overflow: scroll;
    overflow-y: auto;
    overflow-x: hidden;
  `}
    width: 100%;

    padding: 0px 0px 15px 0px;
  }

  //khi ở kích thước lớn thì modal chia 7/3
  //khi ở kích thước nhỏ thì modal chia 1/1
  ${breakpoint.md`
    .post-item-modal-files{
      width:70%;
    }
    .post-item-modal-information{
      width:30%;
    }
  `}

  .close-button {
    cursor: pointer;
    position: absolute;
    width: 45px;
    height: 45px;
    background-color: #eaeafd;
    border: 1px solid transparent;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    top: 2%;
    left: 1%;
    
  }
  
`;
