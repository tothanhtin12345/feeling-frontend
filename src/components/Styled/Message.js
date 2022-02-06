import styled from "styled-components";

//code của mình
import { breakpoint } from "./mixin";
import { MediumContentStyled } from "./Text";
import { DropDownButtonStyled } from "./Button";
export const MessageStyled = styled.div`
  display: flex;
  align-items: flex-end;
  column-gap: 5px;
  ${({ ofMe }) => ofMe === true && "flex-direction: row-reverse;"}
  min-width: 0;
  margin: 4px 0px;
  & {
    .message-wrapper {
      display: flex;

      flex-direction: column;
      align-items: ${({ ofMe }) => (ofMe === true ? "flex-end" : "flex-start")};
      max-width: 100%;

      width: 100%;
      .message {
        width: fit-content;
        max-width: 90%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        column-gap: 10px;
        ${({ ofMe }) => ofMe === true && "flex-direction: row-reverse;"}

        .message-text {
          ${({ ofMe }) =>
            ofMe === true ? "margin-left: auto ;" : "margin-right: auto ;"};

          padding: 10px;

          width: fit-content;
          //nếu hàng quá dài thì xuống hàng
          overflow-wrap: break-word;
          word-break: break-all;
          margin-top: 2px;
          padding: 10px;
          border-radius: 15px;
          background-color: ${({ ofMe }) =>
            ofMe === true ? "#615DFA" : "#F0F2F5"};
        }
        //nếu tin nhắn có thêm image thì xóa background
        .message-text.image {
          background-color: transparent;
        }
        ${MediumContentStyled} {
          ${({ ofMe }) => ofMe === true && "color: #FFFFFF"};
          display: block;
        }

        //thực hiện ẩn khi ở chế độ lg trở đi
        ${breakpoint.lg`
          ${DropDownButtonStyled} {
          visibility: hidden;
        }
        `}
      }
      .message:hover {
        ${DropDownButtonStyled} {
          visibility: visible;
        }
      }
    }
  }
`;
