import { notification } from "antd";
import moment from "moment";
import styled from "styled-components";
import htmlParse from "html-react-parser";
//code của mình
import ListTile from "../../components/UI/ListTile";
import OnlineAvatar from "../../components/UI/OnlineAvatar";
import history from '../../utils/history';
import { MediumContentStyled, SmallContentStyled } from "../../components/Styled/Text";

const NotificationListTileStyled = styled.div`
  &&& {
    .list-tile:hover {
      background-color: transparent;
    }
  }
`;

const showNotification = ({ onClick, notificationValue }) => {
  const { _id, content, avatar, createdAt, url } = notificationValue;
  const notificationKey = `${_id}`;
  notification.open({
    key: notificationKey,
    onClick: () => {
        //thực hiện một hàm gì đó từ bên ngoài gửi vào
      onClick();
      //chuyên trang
      history.push(url);
      //đóng modal thông qua key
      notification.close(notificationKey);
      
    },
    description: (
      <NotificationListTileStyled>
        <ListTile
          type="Notify"
          avatar={
            <OnlineAvatar
              size={48}
              avatar={avatar ? avatar.files[0].fileUrl : null}
            />
          }
          showAction={false}
          title={<MediumContentStyled>{htmlParse(content)}</MediumContentStyled>}
          subTitle={<SmallContentStyled>{moment(createdAt).format("LT")}</SmallContentStyled>}
        />
      </NotificationListTileStyled>
    ),
    placement: "bottomLeft",
    duration: 4,
    style: {
      padding: "0px",
    },
  });
};

export default showNotification;
