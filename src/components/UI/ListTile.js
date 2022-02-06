//code của mình
import { DropDownButtonStyled } from "../Styled/Button";
import { SmallIconStyled } from "../Styled/Icon";
import { ListTileStyled, ListTileActionStyled, ListTitleWrapperStyled } from "../Styled/ListTile";
//ListTitle là một khung định hình sẵn - - bao gồm
//avatar: tròn
//một title
//một subtitle nằm dưới
//một action là một button nằm ở bên phải - nếu title là dạng big (dành cho phần bài post) thì position: none
//nếu dạng Medium hoặc Small thì position là absolute

//type: "Messages", "Message", "Notify", "Post", "Comment"
//menu - dùng để hiển thị cho button dropdown
const ListTile = ({
  type,
  avatar,
  title,
  subTitle,
  menu,
  onClick,
  showAction = true,
  backgroundcolor,
  dropDownZIndex="10002",
  ...props
}) => {
  return (
    <ListTitleWrapperStyled backgroundcolor={backgroundcolor} className="list-tile-wrapper">
      <ListTileStyled
        
        className="list-tile"
        onClick={onClick ? onClick : () => {}}
        type={type}
      >
        {/* Chứa avatar, title, subtitle */}
        <div className="prefix">
          <div className="avatar">{avatar}</div>
          {/* Chứa title, subtitle */}
          <div className="main-content">
            <div className="title">{title}</div>
            <div className="sub-title">{subTitle}</div>
          </div>
        </div>
      </ListTileStyled>
      {/* Chứa action */}
      {showAction && (
        <ListTileActionStyled className="action">
          <DropDownButtonStyled
            trigger={["click"]}
            overlayStyle={{ zIndex: dropDownZIndex }}
            overlay={menu}
            icon={
              <SmallIconStyled className="fas fa-ellipsis-h"></SmallIconStyled>
            }
          />
        </ListTileActionStyled>
      )}
    </ListTitleWrapperStyled>
  );
};

export default ListTile;
