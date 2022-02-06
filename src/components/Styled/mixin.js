import {css} from 'styled-components';
// Mixin breakpoint
// ta định nghĩa trước một số đối tượng chứa mẫu styled theo breakpoint
// chúng sẽ nhận tham số là args: những thuộc tính style css
//css được import từ styled-components hỗ trợ cho việc tạo mẫu như thế này
export const breakpoint = {
  xxs: (...args) => css`
    @media (min-width:0px) {
      ${css(...args)}
    }
  `,
  xs: (...args) => css`
    @media (min-width: 480px) {
      ${css(...args)}
    }
  `,
  sm: (...args) => css`
    @media (min-width: 576px) {
      ${css(...args)}
    }
  `,
  md: (...args) => css`
    @media (min-width: 768px) {
      ${css(...args)}
    }
  `,
  lg: (...args) => css`
    @media (min-width: 992px) {
      ${css(...args)}
    }
  `,
  xl: (...args) => css`
    @media (min-width: 1200px) {
      ${css(...args)}
    }
  `,
  xxl: (...args) => css`
    @media (min-width: 1600px) {
      ${css(...args)}
    }
  `,
};
