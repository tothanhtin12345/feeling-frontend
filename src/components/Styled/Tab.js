import styled from 'styled-components';
import { breakpoint } from './mixin';

export const ChatTabStyled = styled.div`
  z-index: 10001;

  & {
    .tab-chat {
      border: 1px solid transparent;
      border-radius: 10px 10px 0px 0px;
      width: 350px;
      max-width: 80%;
      height: 70%;
      background-color: #FFFFFF;
      //ẩn tab khi ở kích thước màn hình nhỏ
      display: none;
      position: fixed;
      bottom: 0;
      right: 5%;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    .second-tab{
      right: calc(350px + 8%)
    }
  }

  ${breakpoint.sm`
    /* Hiện lại first-tab khi kích thước màn hình lớn hơn sm */
    .first-tab {
      display: block;
    }
  `}

  ${breakpoint.lg`
    /* Hiện lại second-tab khi kích thước màn hình lớn hơn lg */
    .second-tab {
      display: block;
    }
  `}
`;