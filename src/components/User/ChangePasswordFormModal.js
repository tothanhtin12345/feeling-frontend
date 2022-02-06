//code của mình
import ChangePasswordForm from "./ChangePasswordForm";
import { ModalStyled } from "../Styled/Modal";
import { MediumTitleStyled } from "../Styled/Text";
import { useDispatch } from "react-redux";
import { toggleChangePasswordFormModalVisible } from "../../store/modules/User/slice";

const ChangePasswordFormModal = ({ visible }) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(toggleChangePasswordFormModalVisible(false));
  };

  return (
    <ModalStyled
      zIndex={100006}
      onCancel={handleCloseModal}
      title={<MediumTitleStyled>Đổi mật khẩu</MediumTitleStyled>}
      visible={visible}
      footer={null}
    >
      <ChangePasswordForm />
    </ModalStyled>
  );
};
export default ChangePasswordFormModal;
