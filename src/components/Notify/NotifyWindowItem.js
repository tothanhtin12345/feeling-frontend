import { Menu } from "antd";
import Moment from 'react-moment';
import htmlParse from "html-react-parser";
import history from '../../utils/history';
import {useDispatch} from 'react-redux';
import { NavLink } from "react-router-dom";
//code của mình
import ListTile from "../UI/ListTile";
import { SmallContentStyled, MediumContentStyled, SmallTitleStyled } from "../Styled/Text";
import { SmallIconStyled } from "../Styled/Icon";
import DropdownMenuItem from "../UI/DropdownMenuItem";
import OnlineAvatar from '../UI/OnlineAvatar'
import { deleteNotificationSaga,readNotificationSaga } from "../../store/modules/NotifyWindowList/slice";

const commonkey ="notify-window-item";

//các item của cửa sổ hiển thị thông báo
const NotifyWindowItem = ({ _id, avatar, content, createdAt, updatedAt, read, url }) => {

  const dispatch = useDispatch();

  const notifyMenu = (
    <Menu style={{ width: 300 }}>
     
      <DropdownMenuItem
        key={`${commonkey}-menu-item-0-${_id}`}
        icon={<SmallIconStyled className="fas fa-trash"></SmallIconStyled>}
        title={<SmallTitleStyled>Gỡ thông báo</SmallTitleStyled>}
        onClick={() => {
          dispatch(deleteNotificationSaga(_id))
        }}
      />
    </Menu>
  );

  const handleOnclick = () => {
    //đánh dấu là đã đọc thông báo này
    dispatch(readNotificationSaga(_id));

    history.push(url)
  }

  return (
    <ListTile
      type="Notify"
      avatar={<OnlineAvatar size={48} avatar={avatar ? avatar.files[0].fileUrl : null} />}
      title={<MediumContentStyled>{htmlParse(content)}</MediumContentStyled>}
      subTitle={<SmallContentStyled><Moment date={updatedAt} fromNow/>   {read===false && " - Mới"}</SmallContentStyled>}
      menu={notifyMenu}
      onClick={handleOnclick}
      dropDownZIndex= "100010"
    />
  );
};
export default NotifyWindowItem;
