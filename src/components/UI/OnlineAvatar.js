import styled from "styled-components";
import { Avatar } from "antd";

//code của mình
import defaultAvatar from "../../imagesSource/default_avatar.jpg";

const AvatarOnlineStyled = styled.div`
  position: relative;
  width: fit-content;

  ${({ newmess }) => {
    if (newmess === "true") {
      return `border: 3px solid #615dfa;
              border-radius: 100%;`;
    }
  }}

  ${({ online, onlineSize }) => {
    if (online) {
      return `
          &:after{
            position: absolute;
            content:"";
            width: ${onlineSize}px;
            height: ${onlineSize}px;
            background-color: #31A24C;
            border: 1px solid #FFFFFF;
            border-radius: 100%;
            right:1%;
            bottom:10%;
          }
          `;
    }
  }}
`;
//onlineSize là giá trị của cái dấu chấm online - mặc định là 12 (px)
//newmess: dùng cho chức năng danh sách conversations - chỉ ra xem liệu có tin nhắn mới không để hiện một border cho avatar
//xem như là conversation đó có tin nhắn mới
const OnlineAvatar = ({ avatar, size, online = false, onlineSize = 12, newmess, onClick=()=>{} }) => {
  return (
    <AvatarOnlineStyled online={online} onlineSize={onlineSize} newmess={newmess}>
      <Avatar onClick={onClick} size={size} src={avatar || defaultAvatar} />
    </AvatarOnlineStyled>
  );
};

export default OnlineAvatar;
