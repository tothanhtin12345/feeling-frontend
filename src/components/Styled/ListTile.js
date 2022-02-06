import styled from "styled-components";
//code của mình
import { breakpoint } from "./mixin";

export const ListTitleWrapperStyled = styled.div`
  position: relative;

  //nếu người dùng truyền vào một backgroundcolor => người dùng muốn hiển thị màu cố định

  & {
    .list-tile {
      ${({ backgroundcolor }) =>
        backgroundcolor && `background-color:${backgroundcolor};`}
    }
  }

  &:hover {
    .list-tile {
      background-color: ${({ backgroundcolor }) =>
        !backgroundcolor || backgroundcolor === "undefined"
          ? " #f0f2f5"
          : "undefined"};
    }
    .action {
      display: block;
    }
  }
`;

export const ListTileStyled = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 8px;
  cursor: pointer;

  min-width: 0;
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
  //phần lớp bao avatar, title và subtitle
  .prefix {
    display: flex;
    column-gap: 10px;
    align-items: flex-start;
    //đặt min-width ở đây để không tràn text
    min-width: 0;
    //phần chứa title và subtitle

    .main-content {
      display: flex;
      flex-direction: column;
      min-width: 0;
      width: 100%;
      .title {
        //new
        text-align:start;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        //nếu là title dành cho modal messages thì giới hạn chỉ 1 dòng
        //ngược lại là 3 dòng
        -webkit-line-clamp: ${({ type }) => {
          if (type === "Messages") {
            return "1";
          }
          return "3";
        }};
      }
      .sub-title {
      }
    }
  }
`;

export const ListTileActionStyled = styled.div`
  //phần chứa action

  position: absolute;
  right: 5px;
  top: 25%;
  //nếu type của Tile post, hoặc chat-window thì hiện luôn cái dropdown button mà không cần ẩn
  //chỉ xảy ra việc này khi ở màn hình kích thước lg trở lên
  ${breakpoint.lg`
      ${({ type }) => {
        if (type === "Post" || type === "Chat") {
          return "display:block";
        }
        return "display:none";
      }}
    `}
`;
