import { Menu } from "antd";
import { useDispatch } from "react-redux";
//code của mình
import DropdownMenuItem from "../UI/DropdownMenuItem";
import { SmallIconStyled } from "../Styled/Icon";
import { SmallTitleStyled } from "../Styled/Text";
import Window from "../UI/Window";
import {toggleChangePasswordFormModalVisible, toggleInformationFormModalVisible} from '../../store/modules/User/slice';

import { toggleHeaderActionButton } from "../../store/modules/Header/slice";
import { logoutSaga } from "../../store/modules/Login/slice";

const commonKey = "header-button-usersetting";

const UserSettingWindow = ({ expand = false, ...props }) => {
  const dispatch = useDispatch();

  //hàm đóng modal
  const handleCloseUserSettingWindowModal = () => {
    dispatch(toggleHeaderActionButton("UserSetting"))
  }
  return (
    <Window
      title="Cài đặt tài khoản"
      expand={false}
      content={
        <Menu key="user-setting-window-key">
          <DropdownMenuItem
            key={`${commonKey}-information`}
            icon={
              <SmallIconStyled className="fas fa-user-edit"></SmallIconStyled>
            }
            title={<SmallTitleStyled>Thông tin cá nhân</SmallTitleStyled>}
            onClick={() => {
              handleCloseUserSettingWindowModal()
              dispatch(toggleInformationFormModalVisible(true));
            }}
          />
          <DropdownMenuItem
             key={`${commonKey}-change-password`}
            icon={<SmallIconStyled className="fas fa-lock"></SmallIconStyled>}
            title={<SmallTitleStyled>Đổi mật khẩu</SmallTitleStyled>}
            onClick={() => {
              handleCloseUserSettingWindowModal()
              dispatch(toggleChangePasswordFormModalVisible(true));
            }}
          />
          <DropdownMenuItem
             key={`${commonKey}-logout`}
            icon={<SmallIconStyled className="fas fa-sign-out-alt"></SmallIconStyled>}
            title={<SmallTitleStyled>Đăng xuất</SmallTitleStyled>}
            onClick={() => {
              handleCloseUserSettingWindowModal()
              dispatch(logoutSaga());
            }}
          />
        </Menu>
      }
    />
  );
};

export default UserSettingWindow;
