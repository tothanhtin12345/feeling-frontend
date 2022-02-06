import InformationForm from "./InformationForm";
import { ModalStyled } from "../Styled/Modal";
import { MediumTitleStyled } from "../Styled/Text";
import { useDispatch } from "react-redux";
import { toggleInformationFormModalVisible } from "../../store/modules/User/slice";

const InformationFormModal = ({ visible }) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(toggleInformationFormModalVisible(false));
  };
  return (
    <ModalStyled
      zIndex={100006}
      onCancel={handleCloseModal}
      footer={null}
      title={<MediumTitleStyled>Thông tin cá nhân</MediumTitleStyled>}
      visible={visible}
    >
      <InformationForm />
    </ModalStyled>
  );
};
export default InformationFormModal;
