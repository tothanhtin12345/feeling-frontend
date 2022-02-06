import { IconButtonStyled } from "../../Styled/Button";
import { MediumIconStyled } from "../../Styled/Icon";
//phần chức năng gắn thẻ
//onClick: khi nhấn vào icon gắn thẻ
const PostTag = ({ onClick }) => {
  return (
    <div>
      <IconButtonStyled
        onClick={onClick}
        icon={
          <MediumIconStyled
            style={{ color: "#23D2E2" }}
            className="fas fa-user-tag"
          ></MediumIconStyled>
        }
      />
    </div>
  );
};

export default PostTag;
