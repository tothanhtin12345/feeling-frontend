import styled from "styled-components";

import InfiniteScroll from "react-infinite-scroll-component";
import {Spin} from "antd";

//code của mình
import { breakpoint } from "../../Styled/mixin";
import {
 
  MediumTitleStyled,
  MediumActionStyled,
} from "../../Styled/Text";



import ImageGridCardItem from "./ImageGridCardItem";
import useClickPhoto from "../../../hooks/wall/useClickPhoto";
import NoDataTitle from "../../UI/NoDataTitle";

const ImageGridCardStyled = styled.div`
  margin-bottom: 16px;
  padding: 10px 15px;
  background-color: #ffffff;
  border: 1px solid transparent;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  & {
    .card-title {
      display: flex;
      justify-content: ${({ type }) =>
        type === "mini" ? "space-between" : "flex-start"};

      a {
        color: #615dfa;
      }
      a:hover {
        color: #615dfa;
      }
    }
    .card-wrapper {
      margin-top: 16px;
      display: flex;
      flex-wrap: wrap;
      justify-content: stretch;
      column-gap: ${({ type }) => (type === "mini" ? "1px" : "5px")};
      row-gap: ${({ type }) => (type === "mini" ? "1px" : "5px")};
    }
    .card-item {
      cursor: pointer;
      width: ${({ type }) => (type === "mini" ? "33%" : "100%")};
      height: ${({ type }) => (type === "mini" ? "100px" : "500px")};
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .ant-image {
        width: 100%;
        height: 100%;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .remove-button-wrapper {
        position: absolute;
        top: 1%;
        right: 1%;

        button {
          background-color: rgba(62, 63, 94, 0.7);
        }
        i {
          color: #ffffff;
        }
      }
      ${breakpoint.md`
        width: ${({ type }) => (type === "mini" ? "49%" : "49%")};
        height: ${({ type }) => (type === "mini" ? "100px" : "200px")};
        ${({ type }) =>
          type === "mini" && "flex-grow:1; /* tự lấp đầy khoảng trống */"}
        
      `}
      ${breakpoint.lg`
        width: ${({ type }) => (type === "mini" ? "33%" : "19.5%")};
        height: ${({ type }) => (type === "mini" ? "100px" : "200px")};
        ${({ type }) =>
          type === "mini" && "flex-grow:0; /* tự lấp đầy khoảng trống */"}
      `}
    }
  }
`;

const commonKey = "card-grid-image";

//một loại card chứa hình ảnh ở dạng grid
//type: mini (dành cho timeline) hoặc big (dành cho photos)
//files: các file hình ảnh
//onRemoveImage: hàm thực hiện xóa file - sẽ có khi type = big

const ImageGridCard = ({
  isCurrentUser,
  wallUserId,
  files = [],
  type,
 
  hasMore,
  handleGetMore,
  loading,
}) => {
 

 const {getPostLoading,handlePhotoClick} = useClickPhoto();

 

  

  return (
    <ImageGridCardStyled type={type}>
      <div className="card-title">
        <MediumTitleStyled>Hình ảnh</MediumTitleStyled>
        {type === "mini" && (
          <MediumActionStyled to={`/wall/${wallUserId}/photos`}>
            Xem thêm
          </MediumActionStyled>
        )}
      </div>
      <InfiniteScroll
        style={{ overflowX: "hidden" }}
        dataLength={files.length}
        next={handleGetMore}
        hasMore={hasMore}
        loader={
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        }
      >
        <div className="card-wrapper">
          {loading===false && files.length <= 0 && <NoDataTitle message={"Không có hình ảnh để hiển thị"}/>}

          {files.length > 0 &&
            files.map((file, index) => {
              if (file.fileType === "video") return;
              return (
                <ImageGridCardItem
                  file={file}
                  type={type}
                  onClick={handlePhotoClick.bind(null,file._id)}
                  isCurrentUser={isCurrentUser}
                  key={`${commonKey}-${type}-${
                    file._id
                  }-${index}`}
                />
              );
            })}
        </div>
      </InfiniteScroll>
    </ImageGridCardStyled>
  );
};
export default ImageGridCard;
