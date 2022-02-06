import { useState } from "react";
import { Upload, Modal, Spin } from "antd";

//code của mình
import { IconUploadButtonStyled } from "../Styled/Button";
import { SmallIconStyled } from "../Styled/Icon";
import useHttpRequest from "../../hooks/useHttpRequest";
import { showError } from "../../utils/error/showError";

//onStartUploadFile: hàm xử lý khi mới bắt đầu up load file hình để gửi tin nhắn
//onFinishUploadFile: hàm xử lý khi đã upload xong file hình lên server

const ChatUploadImage = ({ onStartUploadFile, onFinishUploadFile, onFailedUploadFile }) => {
  // const [uid, setUid] = useState();

  const { loading, sendRequest } = useHttpRequest();

  const handleRequest = () => {
    // console.log(file)
  };



 

  //xảy ra khi upload một file lên - xảy ra trước hàm request
  const handleUpload = (values) => {
    //lấy ra file vừa được upload
    const {
      file: { originFileObj, uid },
    } = values;

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

    //lấy ra một url tạm thời để tạo fakeImage
    const fileUrl = URL.createObjectURL(originFileObj);

    //gọi hàm để tạo một fake message và hiển thị lên view người dùng
    //truyền uid của file để làm giá trị fakeId
    onStartUploadFile(fileUrl, uid);

    //thực hiện upload lên server
    //chuẩn bị form data chứa file
    const formData = new FormData();
    formData.append("files", originFileObj);
   

    //gừi lên server
    sendRequest({
      axiosConfig: {
        url: "/file//media-upload",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
      successCallback: ({ resData }) => {
        const { files } = resData;
        //lấy được ra thông tin vừa upload ở dạng csdl
        const file = files[0];
        //tiến hành gọi hàm upload xong để gửi tin nhắn
        onFinishUploadFile(file.fileUrl, uid);
      },
      //tiến hành update lỗi cho fake message
      failedCallback: (message) => {
        onFailedUploadFile({err:message, fakeId:uid, loading: false});
      },
    });
  };

  return (
    <Upload
      showUploadList={false}
      maxCount={1}
      accept="image/*"
      customRequest={handleRequest}
      onChange={handleUpload}
      disabled={loading}
    >
      <Spin spinning={loading}>
        <IconUploadButtonStyled
          icon={<SmallIconStyled className="fas fa-image"></SmallIconStyled>}
        />
      </Spin>
    </Upload>
  );
};

export default ChatUploadImage;
