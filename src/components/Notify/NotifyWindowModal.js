//code của mình
import NotifyWindow from "./NotifyWindow";
import { HeaderModalStyled } from "../Styled/Modal";

const NotifyWindowModal = ({ visible, onCloseModal }) => {
  return (
    <HeaderModalStyled
      onCancel={onCloseModal}
      footer={null}
      closable={null}
      maskStyle={{ backgroundColor: "transparent" }}
      visible={visible}
      zIndex={100010}
    >
      <NotifyWindow id="notify-window-modal-scroll" className="scroll-list"/>
    </HeaderModalStyled>
  );
};
export default NotifyWindowModal;
