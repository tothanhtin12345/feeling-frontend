import { useState, useEffect } from "react";
import Moment from "react-moment";
import { Tooltip, Menu, Image, Spin } from "antd";
import "moment/locale/vi";
import htmlParse from "html-react-parser";
import styled from "styled-components";
//code của mình
import { MediumContentStyled } from "../Styled/Text";
import { DropDownButtonStyled } from "../Styled/Button";
import { SmallIconStyled } from "../Styled/Icon";
import DropdownMenuItem from "../UI/DropdownMenuItem";
import { calendarStrings } from "../../contants/moment";
import ErrorOverlay from "../UI/ErrorOverlay";
import ConfirmModal from "../UI/ConfirmModal";
import useHttpRequest from "../../hooks/useHttpRequest";


const ImageMessageStyled = styled(Image)`
  &&&{
    .ant-image-preview-wrap{
      z-index:99999999 !important;
    }
  }
`


const MessageText = ({
  _id,
  text,
  createdAt,
  type,
  loading = false,
  error,
  //hàm xử lý sau khi xóa một tin nhắn thành công từ server 
  onAfterDeleteMessage,
}) => {
  const [deleteMessageConfirm, setDeleteMessageConfirm] = useState(false);
  const {
    loading: deleteMessageLoading,
    sendRequest: sendDeleteMessageRequest,
  } = useHttpRequest();


  //dùng để clear
  useEffect(()=>{
    return ()=>{
      setDeleteMessageConfirm(false);
    }
  },[])

  const menu = (
    <Menu>
      <DropdownMenuItem
        title="Xóa tin nhắn"
        icon={<SmallIconStyled className="fas fa-trash"></SmallIconStyled>}
        onClick={() => setDeleteMessageConfirm(true)}
      />
    </Menu>
  );

  //nội dung tin nhắn để hiển thị

  const mainContent =
    type === "text" ? (
      <MediumContentStyled className={`message-text ${type}`}>
        {/* Kiểm tra text hay image url để hiển thị tương ứng*/}
        {type === "text" && htmlParse(text)}
      </MediumContentStyled>
    ) : (
      <MediumContentStyled
        className={`message-text ${type}`}
        style={{ backgroundColor: "transparent" }}
      >
        <ImageMessageStyled width={200} height={200} className="image" src={text} />
      </MediumContentStyled>
    );


    const handleDeleteMessageSuccess = ({resData}) => {
      //gọi hàm thực hiện xóa message trên view của người dùng
      onAfterDeleteMessage(_id);
    }

    const handleDeleteMessageFailed = (message) => {

    }

    const handleDeleteMessage = () => {
      
      //việc xóa thực chất là thêm _id người dùng vào mảng unDisplay của message để khi fetch tin nhắn nó sẽ
      //không được hiển thị với người dùng đã xóa nó nữa
      // chứ dữ liệu tin nhắn không hề bị xóa ra khỏi csdl
      sendDeleteMessageRequest({
        axiosConfig:{
          url:"/message/delete",
          //dùng put bởi vì ta thay đổi mảng dữ liệu của message chứ không thực hiện  xóa nó ra khỏi csdl
          method: "PUT",
          data:{
            messageId: _id,
          }
        },
        successCallback:handleDeleteMessageSuccess,
        failedCallback: handleDeleteMessageFailed,

      })
    }


   

  return (
    <div className="message">
      {error && !loading && (
        <ErrorOverlay error={error}>{mainContent}</ErrorOverlay>
      )}

      {!error && loading && <Spin spinning={loading}>{mainContent}</Spin>}

      {!error && !loading && (
        <Tooltip
          zIndex={100010}
          placement="left"
          title={
            <Moment locale="vi" date={createdAt} calendar={calendarStrings} />
          }
        >
          {mainContent}
        </Tooltip>
      )}

      <div>
        {!loading && !error && (
          <DropDownButtonStyled
            trigger={["click"]}
            overlay={menu}
            icon={
              <SmallIconStyled className="fas fa-ellipsis-h"></SmallIconStyled>
            }
            overlayStyle={{ zIndex: 100010 }}
          />
        )}
      </div>

      {deleteMessageConfirm && (
        <ConfirmModal
          title="Xác nhận xóa tin nhắn"
          content="Tin nhắn bạn xóa sẽ không được hiển thị lại với bạn nhưng nó vẫn được hiển thị với các người dùng khác"
          loading={deleteMessageLoading}
          onCancel={()=>setDeleteMessageConfirm(false)}
          onConfirm={handleDeleteMessage}
        />
      )}
    </div>
  );
};

export default MessageText;
