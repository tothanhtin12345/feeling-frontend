import React from "react";
import styled from "styled-components";
import { Image } from "antd";

//code của mình
import { BigTitleStyled } from "../../Styled/Text";

//style cho từng file
const PostFileItemStyled = styled.div`
  width: ${({ width }) => width};
  height: ${({ width }) => width === "100%" ? "100%" : "300px"};
  position: relative;
 
  & {
    .video-item {
      
      width: 100%;
      height: 100%;
      

      //nếu có dropImageCount thì có nghĩa file hiện tại là file thứ 4 (index =3)
      //và vẫn còn file nữa nên ta sẽ làm mờ file hiện tại để hiện một cái drop
      ${({ dropImageCount }) => dropImageCount > 0 && `opacity:0.3;`}
    }
    .ant-image{
      height: 100%;
      width:100%;
      img{
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    }
    .image-item {
      width: 100%;
      height: 100%;
      ${({ dropImageCount }) => dropImageCount > 0 && `opacity:0.3;`}
      cursor: pointer;
    }
    .file-overlay {
      width: 100%;
      height: 100%;

      position: absolute;
      left: 0;
      top: 0;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const PostFilesStyled = styled.div`
  display: flex;

  flex-wrap: wrap;
  //giới hạn khung chứa files
  /* max-height: 500px; */
`;

let commonKey = "post-file";

//hiển thị files của post
const PostFiles = React.memo(({ files, onFileClick }) => {
  
  let widthFiles = "100%";
  if (files.length === 2) {
    widthFiles = "50%";
  }
  //tạo thành 1 file bự và 2 file nhỏ ở dưới
  let biggerWidthFile;
  if (files.length === 3) {
    biggerWidthFile = "100%";
    widthFiles = "50%";
  }

  //tạo thành 4 file
  if (files.length === 4) {
    widthFiles = "50%";
  }
  //lớn hơn 5 files thì cũng tạo thành 4 file - đồng thời co thêm 1 cái drop lên hình thứ tư
  let dropImageCount;
  if (files.length >= 5) {
    widthFiles = "50%";
    // -4 ta được số file chưa hiển thị
    dropImageCount = files.length - 4;
  }

  return (
    <PostFilesStyled>
      {files.map((file, index) => {
        //index tính từ 0 - nếu lớn hơn 3 => hơn 4 hình => ta dừng việc hiển thị các file còn lại ở đây
        if (index > 3) {
          return;
        }
        return (
          <PostFileItemStyled
            onClick={onFileClick ? onFileClick.bind(null, index) : () => {}}
            key={`${commonKey}-${file.fileUrl}-${index}`}
            width={
              index === 0 && biggerWidthFile ? biggerWidthFile : widthFiles
            }
            dropImageCount={index === 3 && dropImageCount > 0 && dropImageCount}
          >
            {file.fileType === "video" && (
              <video className="video-item" controls>
                <source src={file.fileUrl} />
              </video>
              // <iframe allowFullScreen className="video-item" src={file.fileUrl}></iframe>
            )}
            {file.fileType === "image" && (
              <Image
                preview={false}
                className="image-item"
                src={file.fileUrl}
              />
            )}
            {index === 3 && dropImageCount > 0 && (
              <div className="file-overlay">
                <BigTitleStyled color="#3e3f5e">
                  +{dropImageCount}
                </BigTitleStyled>
              </div>
            )}
          </PostFileItemStyled>
        );
      })}
    </PostFilesStyled>
  );
});

export default PostFiles;
