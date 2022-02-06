import { useState, useEffect } from "react";
import { Upload, Modal, Spin } from "antd";
import { useDispatch } from "react-redux";
//code của mình
import { IconButtonStyled } from "../../Styled/Button";
import { MediumIconStyled } from "../../Styled/Icon";

import {
  uploadFilesSaga,
  appendFiles,
  appendFilesToShow,
} from "../../../store/modules/PostForm/slice";

//phần chứa chức năng upload của bài viết

const PostUploadFile = ({ loading }) => {
  const [filesList, setFilesList] = useState([]);

  const dispatch = useDispatch();

  const handleCustomUpload = () => {
    // if (filesList.length <= 0) {
    //   return;
    // }
    // const formData = new FormData();
    // //tạo form Data với một mảng files
    // filesList.forEach((file) => {
    //   formData.append("files", file);
    // });
    // //set lại rỗng cho filesList
    // setFilesList([]);
    // dispatch(uploadFilesSaga(formData));
  };

  //nếu up load một lúc nhiều file thì hàm này sẽ chạy nhiều lần
  //chạy hết số lượng file thì mới chạy hàm upload
  const onFileChange = (values) => {
    

    //lấy ra file vừa được upload
    const {
      file: { originFileObj },
    } = values;

    //kiểm tra điều kiện ngay từ đầu

    //nếu file là hình ảnh mà lớn hơn 10mb => không upload
    if (
      originFileObj.type.includes("image/") &&
      originFileObj.size > 10485760
    ) {
      // message.error({
      //   content: "Image has to be smaller than 10mbs",
      //   style:{top:100, zIndex:999999999999999}
      // })
      Modal.error({
        content: "Image has to be smaller than 10mbs",
        zIndex: 10010,
      });
      return;
    }
    if (
      originFileObj.type.includes("video/") &&
      originFileObj.size > 52428800
    ) {
      // message.error({
      //   content: "Video has to be smaller than 50mbs",
      //   style:{top:100, zIndex:999999999999999}
      // })
      Modal.error({
        content: "Video has to be smaller than 50mbs",
        zIndex: 10010,
      });
      return;
    }

    //thêm vào mảng để dành upload
    dispatch(appendFiles(originFileObj));

    //thêm vào mảng để hiển thị
    const fileUrl = URL.createObjectURL(originFileObj);
    const fileType = originFileObj.type.includes("video/") ? "video" : "image";
    const uid = originFileObj.uid;
    dispatch(
      appendFilesToShow({
        fileUrl,
        fileType,
        uid,
      })
    );
  };

  return (
    <Upload
      fileList={filesList}
      multiple={true}
      accept="image/*,video/*"
      customRequest={handleCustomUpload}
      onChange={onFileChange}
      showUploadList={false}
      disabled={loading}
    >
      <Spin spinning={loading}>
        <IconButtonStyled
          icon={
            <MediumIconStyled
              style={{ color: "#FF4D4F" }}
              className="fas fa-images"
            ></MediumIconStyled>
          }
        />
      </Spin>
    </Upload>
  );
};

export default PostUploadFile;
