//code của mình
import UserSettingWindow from "./UserSettingWindow";
import { HeaderModalStyled } from "../Styled/Modal";

const UserSettingWindowModal = ({ visible, onCloseModal }) => {
  return (
    <HeaderModalStyled
    
      onCancel={onCloseModal}
      footer={null}
      closable={null}
      maskStyle={{ backgroundColor: "transparent" }}
      visible={visible}
      zIndex={100010}
    >
      <UserSettingWindow />
    </HeaderModalStyled>
  );
};
export default UserSettingWindowModal;
