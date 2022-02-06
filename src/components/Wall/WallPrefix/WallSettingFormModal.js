import {useDispatch} from 'react-redux';
//code của mình
import {ModalStyled} from '../../Styled/Modal';
import WallSettingForm from './WallSettingForm';
import { MediumTitleStyled } from '../../Styled/Text';
import {toggleWallSettingFormModalVisible} from '../../../store/modules/Wall/slice';
const WallSettingFormModal = ({visible}) => {
  const dispatch = useDispatch();
  const handleOnCloseModal = () => {
    dispatch(toggleWallSettingFormModalVisible(false));
  }
  return (
    <ModalStyled
      onCancel={handleOnCloseModal}
      visible={visible}
      footer={null}
      zIndex={10006}
      title={<MediumTitleStyled>Cài đặt tường nhà</MediumTitleStyled>}
    >
      <WallSettingForm/>
    </ModalStyled>
  )
}

export default WallSettingFormModal;