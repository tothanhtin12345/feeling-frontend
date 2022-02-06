import { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar, Modal, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
//code của mình
import WallCoverImage from "./WallCoverImage";
import WallAvatar from "./WallAvatar";
import { BigTitleStyled, MediumContentStyled } from "../../Styled/Text";
import { DividerStyled } from "../../Styled/Divider";
import OnlineAvatar from "../../UI/OnlineAvatar";
import { breakpoint } from "../../Styled/mixin";

import HorizontalMenu from "../../UI/HorizontalMenu";
import WallConfirmSaveImage from "./WallConfirmSaveImage";
import { getWallPrefixLoading } from "../../../store/modules/WallPrefix/selectors";

const WallPrefixStyled = styled.div`
  background-color: #ffffff;
  padding: 0px 20px;
  padding-bottom: 20px;
  .wall-image-wrapper {
    position: relative;
  }
  .wall-menu-wrapper {
    margin-top: 48px;
  }
  .display-name {
    display: flex;
    width: 100%;

    span {
      color: #3e3f5e;
    }
  }
  .display-name.center {
    margin-top: 40px;
    justify-content: center;
  }
  .display-name.left {
    margin-top: 20px;
    justify-content: flex-start;
    padding: 0px 20px;
  }

  .groups-information {
    padding: 0px 20px;
    .groups-avatar {
      margin-top: 8px;
    }
  }

  .wall-menu-main {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    .wall-navigation {
      width: 100%;
    }
    .wall-setting {
      width: 100%;
      padding: 0px 20px;
    }

    ${breakpoint.md`
      .wall-navigation, .wall-setting{
        width: 50%;
      }
      .wall-setting{
        width: 50%;
        text-align:end;
      }
    `}
  }
`;

//phần đầu của một trang cá nhân hoặc một group cụ thể
//các thông tin nên được truyền từ page Wall - vì các thông tin này sẽ luôn được hiển thị
//khi người dùng vào trong wall

//groupsInformation thông tin về group (sẽ có nếu vào wall của 1 group) - nếu có thông tin này thì sẽ ẩn ảnh đại diện đi
//navigationItems: danh sách thông tin các item cho phần navigation của wall
//wallSetting: một component cho phần wall setting - vì phần này tương đối phức tạp - nó đòi hỏi kiểm tra điều kiện để hiển thị các thành phần
//isCurrentUser: có phải wall của người dùng đang đăng nhập không ? hoặc có phải là người quản lý của group hay không
//onUploadImage hàm dùng để upload hình đại diện hoặc cover sau khi đã upload tạm thời lên view
const WallPrefix = ({
  avatar,
  cover,
  displayName,
  groupsInformation,
  navigationItems,
  type = "individual",
  wallSetting,
  isCurrentUser,
  isManager,
  onUploadImage,
}) => {
  const [fakeImage, setFakeImage] = useState(null);

  const dispatch = useDispatch();

  const loading = useSelector(getWallPrefixLoading);

  //hàm xử lý khi hình được upload ở avatar hoặc cover
  //type: avatar hoặc cover
  //originFileObj: giá trị file nguyên bản
  const handleImageFileOk = ({ type, originFileObj }) => {
    //kiểm tra điều kiện ngay từ đầu

    //nếu file là hình ảnh mà lớn hơn 10mb => không upload
    if (
      originFileObj.type.includes("image/") &&
      originFileObj.size > 10485760
    ) {
      Modal.error({
        content: "Image has to be smaller than 10mbs",
        zIndex: 10010,
      });
      return;
    }
    const fileUpload = originFileObj;
    const fileUrl = URL.createObjectURL(originFileObj);
    const fileType = originFileObj.type.includes("video/") ? "video" : "image";

    setFakeImage({
      fileUpload,
      files: [{ fileUrl: fileUrl }],
      fileType,
      type,
    });
  };

  //hàm thực hiện setFakeImage thành null sau khi upload xong
  useEffect(() => {
    if (!loading) {
      setFakeImage(null);
    }
  }, [loading]);

  return (
    <WallPrefixStyled>
      {/* phần ảnh bìa và ảnh đại diện */}
      <div className="wall-image-wrapper">
        {/* Nếu có giá trị groupsInformation - nghĩa là groups thì dùng giá trị isManager để kiểm tra - ngược lại thì dùng giá trị isCurrentUser */}
        <WallCoverImage
          showUpdate={type === "groups" ? isManager : isCurrentUser}
          cover={fakeImage && fakeImage.type === "cover" ? fakeImage : cover}
          onFileOk={handleImageFileOk}
        />
        {type === "individual" && (
          <WallAvatar
            displayName={displayName}
            isCurrentUser={isCurrentUser}
            avatar={
              fakeImage && fakeImage.type === "avatar" ? fakeImage : avatar
            }
            onFileOk={handleImageFileOk}
          />
        )}
      </div>
      <div className={`display-name ${type === "groups" ? "left" : "center"}`}>
        <BigTitleStyled>{displayName}</BigTitleStyled>
      </div>
      {groupsInformation && (
        <div className="groups-information">
          <div>
            <MediumContentStyled>
              {groupsInformation.privacy === "private"
                ? "Riêng tư"
                : "Công khai"}{" "}
              - {groupsInformation.memberCount} thành viên
            </MediumContentStyled>
          </div>
          <div className="groups-avatar">
            <Avatar.Group>
              {groupsInformation.members.map((member, index) => (
                <NavLink key={`${member._id}-member-mini-${index}`} to={`/wall/${member._id}`}>
                  <OnlineAvatar
                    online={false}
                    size={32}
                    avatar={
                      member.avatar ? member.avatar.files[0].fileUrl : null
                    }
                  />
                </NavLink>
              ))}
            </Avatar.Group>
          </div>
        </div>
      )}

      {/* Phần navigation và settings */}
      <div className="wall-menu-wrapper">
        <DividerStyled />
        <div className="wall-menu-main">
          <HorizontalMenu
            className="wall-navigation"
            itemList={navigationItems}
          />
          <div className="wall-setting">{wallSetting}</div>
        </div>
      </div>

      {/* Thanh xác nhận lưu hình */}
      <WallConfirmSaveImage
        loading={loading}
        onCancel={() => setFakeImage(null)}
        onConfirm={onUploadImage.bind(null, fakeImage)}
        visible={fakeImage ? true : false}
      />
    </WallPrefixStyled>
  );
};
export default WallPrefix;
