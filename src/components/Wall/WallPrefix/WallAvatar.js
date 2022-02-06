import styled from "styled-components";
import { Upload } from "antd";


//code của mình
import useClickPhoto from "../../../hooks/wall/useClickPhoto";
import { IconButtonStyled } from "../../Styled/Button";
import { MediumIconStyled } from "../../Styled/Icon";
import OnlineAvatar from '../../UI/OnlineAvatar';
const WallAvatarStyled = styled.div`
  position: absolute;
  bottom: -10%;
  left: 25%;
  right: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  //style cho cái img
  & {
    img {
      border: 5px solid #eaeafd;
      border-radius: 100%;
      cursor: pointer;
    }
    .avatar {
      position: relative;
    }
    .upload-avatar-button {
      position: absolute;
      top: 60%;
      right: -3%;
      button {
        background-color: #ccced2;
      }
    }
  }
`;

//onFileOk: hàm xử truyền hình ảnh qua WallPrefix
const WallAvatar = ({ avatar, isCurrentUser, onFileOk }) => {
  const {getPostLoading,handlePhotoClick} = useClickPhoto();
  const handleCustomUpload = () => {};
  const onFileChange = (values) => {
    //lấy ra file vừa được upload
    const {
      file: { originFileObj },
    } = values;

    
    onFileOk({
      //đang upload hình cho avatar hay cover (ảnh bìa)
      type:"avatar",
      //giá trị file nguyên bản
      originFileObj,
    })
  };

  const handleOnAvatarClick = () => {
   
    if(avatar && avatar.files[0]._id){
      handlePhotoClick( avatar.files[0]._id);
    }
  }

  return (
    <WallAvatarStyled>
      <div className="avatar">
        <OnlineAvatar
          onClick={handleOnAvatarClick}
          avatar={avatar ? avatar.files[0].fileUrl : null}
          size={168}
        />

        {isCurrentUser && (
          <div className="upload-avatar-button">
            <Upload
              showUploadList={false}
              multiple={false}
              accept="image/*"
              customRequest={handleCustomUpload}
              onChange={onFileChange}
            >
              <IconButtonStyled
                icon={
                  <MediumIconStyled className="fas fa-camera"></MediumIconStyled>
                }
              />
            </Upload>
          </div>
        )}
      </div>
    </WallAvatarStyled>
  );
};

export default WallAvatar;
