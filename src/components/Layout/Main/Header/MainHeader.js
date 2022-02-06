import { useState, useEffect } from "react";

import { useLocation } from "react-router";
import { Button, Badge } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//code của mình
import { MainDrawerStyled } from "../../../Styled/Drawer";
import { HeaderStyled } from "../../../Styled/Header";
import { BigTitleStyled, SmallTitleStyled } from "../../../Styled/Text";
import { BigIconStyled, SmallIconStyled } from "../../../Styled/Icon";
import MainMenu from "../../../UI/MainMenu/MainMenu";
import NewGroupModal from "../../../Chat/NewGroupModal/NewGroupModal";
import NewMessageModal from "../../../Chat/NewMessageModal/NewMessageModal";
import OnlineAvatar from "../../../UI/OnlineAvatar";

import {
  toggleHeaderActionButton,
  resetHeader,
} from "../../../../store/modules/Header/slice";

import { getHeaderButtonSelected } from "../../../../store/modules/Header/selectors";

import MainHeaderSearch from "./MainHeaderSearch";

import { HeaderIconButtonStyled } from "../../../Styled/Button";

import MessagesWindowModal from "../../../MessagesWindow/MessagesWindowModal";
import NotifyWindowModal from "../../../Notify/NotifyWindowModal";
import UserSettingWindowModal from "../../../User/UserSettingWindowModal";
import { readAllNotificationSaga } from "../../../../store/modules/User/slice";
import {
  getUserId,
  getUserInformations,
  getUserAvatar,
  getUnReadNotificationCount,
} from "../../../../store/modules/User/selectors";
import {
  getNewGroupChatModalVisible,
  getNewMessageModalVisible,
} from "../../../../store/modules/Chat/selectors";
import { getUnreadMessagesCount } from "../../../../store/modules/User/selectors";
import { toggleNewGroupChatModalVisible } from "../../../../store/modules/Chat/slice";

//hàm nhận vào một displayName và lấy ra phần cuối cùng trong displayname
const parseDisplayName = (displayName) => {
  const displayNameArray = displayName.split(" ");
  const nameToshow = displayNameArray[displayNameArray.length - 1];
  return nameToshow;
};

const MainHeader = ({ className, ...props }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [drawerVisible, setDrawerVisible] = useState(false);

  const buttonSelectedName = useSelector(getHeaderButtonSelected);

  const userId = useSelector(getUserId);
  const userInformations = useSelector(getUserInformations);
  const userAvatar = useSelector(getUserAvatar);
  const unReadNotificationCount = useSelector(getUnReadNotificationCount);

  const newMessageModalVisible = useSelector(getNewMessageModalVisible);
  const newGroupChatModalVisible = useSelector(getNewGroupChatModalVisible);

  const unreadMessageCount = useSelector(getUnreadMessagesCount);

  const handleToggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
    //reset trạng thái của header luôn
    dispatch(resetHeader());
  };

  //thay đổi trạng thái giữa các nút được chọn trên header
  const toggleHeaderButton = (selectedButtonName) => {
    dispatch(toggleHeaderActionButton(selectedButtonName));

    //nếu người dùng nhấn vào nút thông báo
    if (selectedButtonName === "Notify") {
      //nếu người dùng nhấn lúc nó chưa mở => bây giờ nó sẽ mở
      //ta set giá trị unReadNotificationCount về = 0
      if (selectedButtonName !== buttonSelectedName) {
        dispatch(readAllNotificationSaga());
      }
    }
  };

  //reset trạng thái nếu path url thay đổi
  useEffect(() => {
    //reset trạng thái
    return () => {
      dispatch(resetHeader());
    };
  }, [location.pathname]);

  if (!userId) {
    return <div></div>;
  }

  return (
    <HeaderStyled className={className}>
      <div className="header-items">
        <div className="header-section">
          <NavLink to="/">
            <BigTitleStyled>Feeling</BigTitleStyled>
          </NavLink>
          <Button
            className="drawer-button"
            onClick={handleToggleDrawer}
            type="text"
          >
            <BigIconStyled className="fas fa-bars"></BigIconStyled>
          </Button>
          <MainHeaderSearch />
        </div>
        <div className="header-section right-section">
          {/* Nút để đi đến trang cá nhân */}
          <NavLink className="avatar-button" to={`/wall/${userId}`}>
            <OnlineAvatar
              size={26}
              avatar={userAvatar ? userAvatar.files[0].fileUrl : null}
            />
            <div>
              <SmallTitleStyled>
                {parseDisplayName(userInformations.displayName)}
              </SmallTitleStyled>
            </div>
          </NavLink>

          {/* Nút để hiện phần messages */}
          <Badge count={unreadMessageCount} overflowCount={99} offset={[-9, 4]} size="default">
            <HeaderIconButtonStyled
              onClick={toggleHeaderButton.bind(null, "Messages")}
              className={buttonSelectedName === "Messages" ? "active" : ""}
            >
              <SmallIconStyled className="fas fa-comment-dots"></SmallIconStyled>
            </HeaderIconButtonStyled>
          </Badge>

          {/* Nút để hiện phần thông báo */}
          <Badge
            count={unReadNotificationCount}
            overflowCount={99}
            offset={[-9, 4]}
            size="default"
          >
            <HeaderIconButtonStyled
              onClick={toggleHeaderButton.bind(null, "Notify")}
              className={buttonSelectedName === "Notify" ? "active" : ""}
            >
              <SmallIconStyled className="fas fa-bell"></SmallIconStyled>
            </HeaderIconButtonStyled>
          </Badge>

          {/* Nút để hiện phần setting account */}
          <HeaderIconButtonStyled
            onClick={toggleHeaderButton.bind(null, "UserSetting")}
            className={buttonSelectedName === "UserSetting" ? "active" : ""}
          >
            <SmallIconStyled className="fas fa-user-cog"></SmallIconStyled>
          </HeaderIconButtonStyled>
        </div>
      </div>

      {/* Phần drawer để hiện cái menu - hoạt động khi ở trạng thái kích thước đt */}
      <MainDrawerStyled
        closable={false}
        onClose={handleToggleDrawer}
        placement="left"
        width={250}
        visible={drawerVisible}
      >
        <MainMenu indrawer={"true"} />
      </MainDrawerStyled>

      {/* Hiển thị modal thì nhấn vào một số nút trên header */}
      {/* <HeaderActionModal/> */}
      {buttonSelectedName === "Messages" && (
        <MessagesWindowModal
          onCloseModal={toggleHeaderButton.bind(null, "Messages")}
          visible={true}
        />
      )}
      {buttonSelectedName === "Notify" && (
        <NotifyWindowModal
          onCloseModal={toggleHeaderButton.bind(null, "Notify")}
          visible={true}
        />
      )}
      {buttonSelectedName === "UserSetting" && (
        <UserSettingWindowModal
          onCloseModal={toggleHeaderButton.bind(null, "UserSetting")}
          visible={true}
        />
      )}
      {newMessageModalVisible && (
        <NewMessageModal visible={newMessageModalVisible} />
      )}
      {newGroupChatModalVisible && (
        <NewGroupModal onClose={()=>dispatch(toggleNewGroupChatModalVisible(false))} visible={newGroupChatModalVisible} />
      )}
    </HeaderStyled>
  );
};

export default MainHeader;
