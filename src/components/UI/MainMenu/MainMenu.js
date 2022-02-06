import { useMemo } from "react";

import { useSelector, useDispatch } from "react-redux";

//code của mình
import { MainMenuStyled } from "../../Styled/Menu";

import { MediumIconStyled } from "../../Styled/Icon";
import MainMenuItem from "./MainMenuItem";
import OnlineAvatar from "../OnlineAvatar";
import {
  getUserAvatar,
  getUserId,
  getUserInformations,
  getUserRole,
} from "../../../store/modules/User/selectors";
import { readAllNotificationSaga } from "../../../store/modules/User/slice";

const commonKey = "main-menu";

//indrawer: Main menu này có nằm trong drawer không ? nếu có thì không cần thực hiện style collapsed
const MainMenu = ({ indrawer, ...props }) => {
  const dispatch = useDispatch();

  const userId = useSelector(getUserId);
  const avatar = useSelector(getUserAvatar);
  const informations = useSelector(getUserInformations);
  const role = useSelector(getUserRole);

  const MAIN_MENU_ITEM_DATA = useMemo(() => {
    if (!userId) {
      return [];
    }

    const { displayName } = informations;

    const list = [
      //riêng đối với item này chỉ là một dummy - sẽ thay thế lại sau
      {
        key: `${commonKey}/${userId}`,
        icon: (
          <OnlineAvatar
            size={26}
            avatar={avatar ? avatar.files[0].fileUrl : null}
          />
        ),

        content: displayName,
        path: `/wall/${userId}`,
        pathExact: false,
      },
      {
        key: `${commonKey}/`,
        icon: <MediumIconStyled className="fas fa-home"></MediumIconStyled>,

        content: "Trang chủ",
        path: "/",
      },
      {
        key: `${commonKey}/notify`,
        icon: <MediumIconStyled className="fas fa-bell"></MediumIconStyled>,
        onClick: () => {
          dispatch(readAllNotificationSaga());
        },
        content: "Thông báo",
        path: "/notifications",
      },
      {
        key: `${commonKey}/messages`,
        icon: (
          <MediumIconStyled className="fas fa-comment-dots"></MediumIconStyled>
        ),

        content: "Tin nhắn",
        path: "/messages",
        pathExact: false,
      },
      // {
      //   key: `${commonKey}/friends`,
      //   icon: (
      //     <MediumIconStyled className="fas fa-user-friends"></MediumIconStyled>
      //   ),

      //   content: "Bạn bè",
      //   path: `friends`,
      //   pathExact: true,

      // },
      // {
      //   key: `${commonKey}/friends`,
      //   icon: (
      //     <MediumIconStyled className="fas fa-user-friends"></MediumIconStyled>
      //   ),

      //   content: "Bạn bè",
      //   path: `/wall/${userId}/friends`,
      //   pathExact: true,
      //   showactive: false,
      // },
      {
        key: `${commonKey}/groups/dashboard`,
        icon: <MediumIconStyled className="fas fa-users"></MediumIconStyled>,
        pathExact: false,
        content: "Nhóm",
        path: "/groups/dashboard",
      },
      {
        key: `${commonKey}/account`,
        icon: <MediumIconStyled className="fas fa-user-cog"></MediumIconStyled>,

        content: "Tài khoản",
        path: "/account",
      },
    ];

    if (role === "admin") {
      list.push({
        key: `${commonKey}/manager`,
        icon: <MediumIconStyled className="fas fa-user-shield"></MediumIconStyled>,
        pathExact:false,
        content: "Quản lý",
        path: "/manager",
      });
    }

    return list;
  }, [userId, avatar, informations, role]);

  return (
    <MainMenuStyled indrawer={indrawer}>
      <nav>
        <ul>
          {MAIN_MENU_ITEM_DATA.map((item) => (
            <MainMenuItem {...item} indrawer={indrawer} />
          ))}
        </ul>
      </nav>
    </MainMenuStyled>
  );
};

export default MainMenu;
