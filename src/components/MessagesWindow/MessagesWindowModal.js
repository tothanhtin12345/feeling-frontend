//code của mình
import MessageWindow from "./MessagesWindow";
import { HeaderModalStyled } from "../Styled/Modal";

const MessagesWindowModal = ({ visible, onCloseModal }) => {
  return (
    <HeaderModalStyled
      onCancel={onCloseModal}
      footer={null}
      closable={null}
      maskStyle={{ backgroundColor: "transparent" }}
      visible={visible}
      zIndex={10002}
    >
      <MessageWindow id="messages-window-modal-scroll" className="scroll-list"/>
    </HeaderModalStyled>
  );
};
export default MessagesWindowModal;
