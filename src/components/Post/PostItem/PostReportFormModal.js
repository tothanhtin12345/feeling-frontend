import { useEffect } from "react";
import { Form, Spin, notification } from "antd";
import axios from "axios";
//code của mình
import { ModalStyled } from "../../Styled/Modal";
import { MediumTitleStyled, SmallTitleStyled } from "../../Styled/Text";
import { RectangleButtonStyled } from "../../Styled/Button";
import { TextAreaStyled } from "../../Styled/Input";

import useHttpRequest from "../../../hooks/useHttpRequest";



const { Item } = Form;

const PostReportFormModal = ({ postId, onClose }) => {
  const [form] = Form.useForm();

  const { sendRequest, loading } = useHttpRequest();

  const handleReportSuccess = ({ resData }) => {
    console.log(resData);
    const {code} = resData;
    notification.success({
      title: "Thông báo báo cáo bài viết",
      description: code === "SUCCESS_POST_REPORT" ? "Báo cáo về bài viết của bạn đã được lưu lại" : "Không có phản hồi",
      placement: "bottomLeft",
    });

    //đóng form
    onClose();
  };

  const handleReportFailed = (message) => {
    console.log(message);
  };

  const handleSubmitForm = (values) => {


    console.log(postId)

    const { reportContent: content } = values;
    sendRequest({
      axiosConfig: {
        method: "PUT",
        url: "/post/report",
        data: {
          content,
          postId,
        },
        
      },
      successCallback: handleReportSuccess,
      failedCallback: handleReportFailed,
    });
  };

  useEffect(()=>{
    return () => {
      //dùng cancel axios khiến axios bị hủy hoàn toàn, không thể gọi lại trong những lần request khác ?
        // source.cancel();
    }
  },[])

  return (
    <ModalStyled
      zIndex={100006}
      onCancel={loading ? () => {} : onClose}
      footer={null}
      title={<MediumTitleStyled>Báo cáo bài viết</MediumTitleStyled>}
      visible={true}
    >
      <div>
        <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
          <Item
            name="reportContent"
            key="reportContent"
            label={
              <SmallTitleStyled>
                Nội dung bạn muốn báo cáo về bài viết
              </SmallTitleStyled>
            }
            validateTrigger={["onBlur"]}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập nội dung muốn báo cáo",
              },
              {
                min: 12,
                message: "Nội dung báo cáo quá ngắn, ít nhất phải 12 kí tự",
              },
            ]}
          >
            <TextAreaStyled></TextAreaStyled>
          </Item>
          <Spin spinning={loading}>
            <RectangleButtonStyled
              width="100%"
              textcolor="#FFFFFF"
              disabled={loading}
            >
              <SmallTitleStyled>
                {loading ? "Đang trong quá trình xử lý" : "Xác nhận"}
              </SmallTitleStyled>
            </RectangleButtonStyled>
          </Spin>
        </Form>
      </div>
    </ModalStyled>
  );
};

export default PostReportFormModal;
