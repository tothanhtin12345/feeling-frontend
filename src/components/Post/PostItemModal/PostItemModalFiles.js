import { useState, Fragment } from "react";
import { BigIconStyled } from "../../Styled/Icon";
import { Image } from "antd";

//code của mình
import { PostItemModalFileStyled } from "../../Styled/PostItemModal";

const commonKey = "post-item-modal";

const PostItemModalFiles = ({ files, fileIndex = 0 }) => {
  //file hiển thị ban đầu
  const [fileIndexSelected, setFileIndexSelected] = useState(fileIndex || 0);
  //hàm next file
  const handleNextFile = () => {
    //nếu đã đến file cuối thì set lại = 0
    if (fileIndexSelected === files.length - 1) {
      setFileIndexSelected(0);
      return;
    }
    //ngược lại thì + 1
    setFileIndexSelected(fileIndexSelected + 1);
  };
  //hàm previous file
  const handlePreviousFile = () => {
    //nếu đã đến file đầu thì set thành file cuối
    if (fileIndexSelected === 0) {
      setFileIndexSelected(files.length - 1);
      return;
    }
    //ngược lại thì - 1
    setFileIndexSelected(fileIndexSelected - 1);
  };

  return (
    <div className="post-item-modal-files">
      {files.map((file, index) => (
        <PostItemModalFileStyled
          key={`${commonKey}-file-${file.fileUrl}-${index}`}
          className={index === fileIndexSelected ? "active" : ""}
        >
          {file.fileType === "image" && (
            <Image src={file.fileUrl} preview={false} />
          )}
          {file.fileType === "video" && (
            <video controls>
              <source src={file.fileUrl} />
            </video>
          )}
        </PostItemModalFileStyled>
      ))}
      {files.length > 1 && (
        <Fragment>
          <div className="arrow arrow-previous" onClick={handlePreviousFile}>
            <BigIconStyled
              color="#3E3F5E"
              className="fas fa-chevron-left"
            ></BigIconStyled>
          </div>
          <div className="arrow arrow-next" onClick={handleNextFile}>
            <BigIconStyled
              color="#3E3F5E"
              className="fas fa-chevron-right"
            ></BigIconStyled>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default PostItemModalFiles;
