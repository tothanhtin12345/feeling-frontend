import styled from "styled-components";
import { Modal } from "antd";

//code của mình
import { ModalStyled } from "./Modal";
import { SmallTitleStyled } from "./Text";
import { breakpoint } from "./mixin";

export const PostFormModalStyled = styled(ModalStyled)`
  &&& {
    .ant-modal-body {
      .list-tile {
        background-color: transparent;
        cursor: unset;
        padding: 0px;
      }
    }
    .button-area {
      margin-top: 32px;
    }
    .post-input-area{
      max-height: 300px;
      overflow: scroll;
      overflow-y: auto;
      overflow-x: hidden;
      margin-bottom: 16px;
    }
  }
`;

export const AddTagModalStyled = styled(ModalStyled)`
  &&& {
    .tags-added {
      margin-bottom: 8px;

      .tags-list {
        width: 100%;
        padding: 5px;
        margin-top: 8px;
        border: 1px solid #ccced2;

        min-height: 50px;
        max-height: 100px;
        overflow: scroll;
        overflow-y: auto;
        overflow-x: unset;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        align-items: flex-start;
      }
    }
    .search-area {
      .search-result {
        margin-top: 8px;
        max-height:300px;
        min-height: 300px;
        overflow: scroll;
        overflow-y: auto;
        overflow-x: hidden;
      }
    }
  }
`;

//định dạng cho một bài post
export const PostItemStyled = styled.div`
  padding: 5px 0px;
  border: 1px solid transparent;
  border-radius:15px;
  & {
    .list-tile-wrapper {
      .list-tile {
        cursor: unset;
      }
      .list-tile:hover {
        background-color: transparent;
      }
    }
    .post-item-content {
      display: flex;
      padding: 0px 15px;
      margin: 8px 0px;
      .content {
        word-wrap: break-word;
        overflow: hidden;
      }
    }
    //khu vực chứa các thông tin tương tác và các hành động tương tác
    .post-item-reaction {
      padding: 0px 10px;
    }
  }
`;

//phần chứa image và video
export const PostMediaStyled = styled.div`
  padding: 10px;
  /* max-height: 200px;
  overflow: scroll;
  overflow-y: auto;
  overflow-x: unset; */
  margin-bottom: 8px;
  & {
    .file-item {
      position: relative;
      border: 1px solid transparent;
      video {
        width: 100%;
      }
    }
    .remove-file {
      position: absolute;
      right: 5px;
      top: 5px;
    }
  }
`;

//phần chứa các button thêm image, gắn thẻ
export const PostActionStyled = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccced2;
  border-radius: 15px;
  padding: 10px 10px;

  & {
    .aciton-title {
    }
    .action-content {
      display: flex;
      column-gap: 10px;
      align-items: center;
    }
  }
`;

// định dạng cho modal chứa một bài post
export const PostItemModalStyled = styled(ModalStyled)`
  width: 100%;
  max-width: 100%;
  max-height: 100vh;
  border-radius: 0;
  //bỏ cách top (theo position)
  top: 0;
  &&& {
    .ant-modal-content {
      height: 100vh;
      max-height: 100vh;
      border-radius: 0;
    }
    .ant-modal-header {
      border-radius: 0;
    }
    .ant-modal-body{
      height: 100%;
      max-height: 100%;
      overflow: scroll;
      overflow-y: auto;
      overflow-x: hidden;
      ${breakpoint.md`
        overflow:hidden;
        
      `}
    }
  }
  //mặc định của antd modal là sẽ cách top 16px khi đạt kích thước bên dưới
  //do đó ta loại bỏ nó ra
  @media (max-width: 767px){
    margin: 0;
  }
`;
// export const PostItemModalStyled = styled.div`
//   position: fixed;
//   z-index: 10005;
//   width: 100%;
//   height: 100vh;
//   max-width: 100%;
//   max-height: 100vh;
//   top: 0;
//   left: 0;
//   background-color: #FFFFFF;
//   overflow-y: hidden;
// `;