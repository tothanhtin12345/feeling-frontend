import { useHistory } from "react-router";

//code của mình
import { ModalStyled } from "../../Styled/Modal";
import ListTile from "../../UI/ListTile";
import {
  SmallTitleStyled,
  MediumTitleStyled,
  SmallContentStyled,
} from "../../Styled/Text";
import OnlineAvatar from "../../UI/OnlineAvatar";

let commonkey = "tag-to-show";
//modal hiển thị những người đã được gắn thẻ
const AddedTagsModal = ({ visible, tagsToShow, onClose }) => {
  const history = useHistory();

  return (
    <ModalStyled
      
      title={<MediumTitleStyled>Được gắn thẻ</MediumTitleStyled>}
      visible={visible}
      onCancel={onClose}
      footer={null}
      zIndex={10004}
    >
      <div>
        {tagsToShow.map((friend) => (
          <ListTile
            key={`${commonkey}-${friend._id}`}
            avatar={<OnlineAvatar size={40} avatar={friend.avatar ? friend.avatar.files[0].fileUrl : null} />}
            showAction={false}
            title={<SmallTitleStyled>{friend.informations.displayName}</SmallTitleStyled>}
            subTitle={<SmallContentStyled>Được gắn thẻ</SmallContentStyled>}
            onClick={() => history.push(`/wall/${friend._id}`)}
          />
        ))}
      </div>
    </ModalStyled>
  );
};

export default AddedTagsModal;
