import styled from "styled-components";
import { Image, Upload } from "antd";
import DefaultCover from '../../../imagesSource/default_cover.jpg';

//code của mình
import { RectangleButtonStyled } from "../../Styled/Button";
import useClickPhoto from "../../../hooks/wall/useClickPhoto";
import { MediumIconStyled } from "../../Styled/Icon";

const WallCoverImageStyled = styled.div`
  max-height: 350px;
  border: 1px solid transparent;
  border-radius: 0px 0px 30px 30px;
  position: relative;

  & {
    img {
      cursor: pointer;
    }
    .update-cover-button {
      position: absolute;
      padding: 5px 20px;
      right: 2%;
      bottom: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

//ảnh bìa - có chứa kèm ảnh đại diện của người dùng
//isCurrentUser: (bool) - có phải trang hiện tại của người dùng hay không ?
//onFileOk: hàm truyền hình ảnh qua WallPrefix
const WallCoverImage = ({ showUpdate, cover, onFileOk }) => {
  const {getPostLoading,handlePhotoClick} = useClickPhoto();
  const handleCustomUpload = () => {};
  const onFileChange = (values) => {
    //lấy ra file vừa được upload
    const {
      file: { originFileObj },
    } = values;

    onFileOk({
      //đang upload hình cho avatar hay cover (ảnh bìa)
      type: "cover",
      //giá trị file nguyên bản
      originFileObj,
    });
  };
  const handleCoverClick = () => {
    if(cover && cover.files[0]._id){
      handlePhotoClick(cover.files[0]._id);
    }
  }
  return (
    <WallCoverImageStyled className="fill-container-image">
      <Image
        onClick={handleCoverClick}
        preview={false}
        src={cover ? cover.files[0].fileUrl : DefaultCover}
      />
      {/* Chủ của trang hoặc là admin thì thì mới hiện nút cập nhật */}
      {showUpdate && (
        <Upload
          showUploadList={false}
          multiple={false}
          accept="image/*"
          customRequest={handleCustomUpload}
          onChange={onFileChange}
        >
          <RectangleButtonStyled
            color="#F0F2F5"
            className="update-cover-button"
          >
            <MediumIconStyled className="fas fa-camera-retro"></MediumIconStyled>
          </RectangleButtonStyled>
        </Upload>
      )}
    </WallCoverImageStyled>
  );
};
export default WallCoverImage;
