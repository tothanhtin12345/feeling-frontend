import { WindowStyled } from "../Styled/Window";

//code của mình
import { MediumTitleStyled, SmallActionStyled } from "../Styled/Text";

//Window là chỗ chứa các Room Chat ở dạng danh sách hoặc thông báo hoặc thiết lập người dùng
// có thể dùng chung với header action modal
// hoặc dùng cho phần Messages hay Notify được mở từ thanh Sider (Hoặc Drawer)
const Window = ({id,className, title, content, path, expand = true, ...props }) => {
  return (
    <WindowStyled id={id} className={`${className}`}>
      <div className="window-title">
        <MediumTitleStyled>{title}</MediumTitleStyled>
      </div>
      {expand && (
        <div className="window-action">
          <SmallActionStyled
            style={{ padding: "0px 5px" }}
            className="purple"
            to={path}
          >
            Xem tất cả
          </SmallActionStyled>
        </div>
      )}
      <div  className="content">
        {content}
      </div>
    </WindowStyled>
  );
};

export default Window;
