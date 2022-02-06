import { useEffect, useState } from "react";
import { Spin } from "antd";
import styled from "styled-components";
//code của mình
import { ModalStyled } from "../../Styled/Modal";
import { MediumTitleStyled } from "../../Styled/Text";

import useHttpRequest from "../../../hooks/useHttpRequest";

import PostReportContentItem from "./PostReportContentItem";

const PostReportContentWrapper = styled.div`
  padding: 5px 5px;
  max-height: 400px;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  //kích thước của toàn bộ thanh scrollbar (thanh chứa cục scroll và cả cục scroll)
  ::-webkit-scrollbar {
    width: 10px;
  }
  //màu của thanh scrollbar (nằm dưới cục scroll)
  ::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 8px;
  }
  //cái cục scroll
  ::-webkit-scrollbar-thumb {
    background: #ffffff;
  }
  //đổi màu cục scroll khi scroll vào
  :hover::-webkit-scrollbar-thumb {
    background: #ccced2;
  }

  & {
  }
`;

const PostReportContentModal = ({ postId, onClose }) => {
  const {
    sendRequest: sendFetchReportContentRequest,
    loading: fetchReportContentLoading,
  } = useHttpRequest();

  const [isAdmin, setIsAdmin] = useState(false);
  const [reports, setReports] = useState([]);

  const handleFetchPostReportSuccess = ({ resData }) => {
    const { reports, isAdmin: isAdminValue } = resData;
    setReports(reports);
    setIsAdmin(isAdminValue);
  };
  const handleFetchPostReportFailed = (message) => {
    console.log(message);
  };

  useEffect(() => {
    sendFetchReportContentRequest({
      axiosConfig: {
        url: "/post/report",
        method: "GET",
        params: {
          postId,
        },
      },
      successCallback: handleFetchPostReportSuccess,
      failedCallback: handleFetchPostReportFailed,
    });

    return () => {
      setIsAdmin(false);
      setReports([]);
    };
  }, []);

  const handleDeletePostReport = () => {};

  //xử lý khi xóa một post report thành công
  const handleAfterDeletePostReport = (reportId) => {
    setReports((currentReports) => {
      const newReports = currentReports.filter((item) => item._id !== reportId);
      return [...newReports];
    });
  };

  return (
    <ModalStyled
      zIndex={100006}
      onCancel={fetchReportContentLoading ? () => {} : onClose}
      footer={null}
      title={<MediumTitleStyled>Những báo cáo về bài viết</MediumTitleStyled>}
      visible={true}
    >
      <PostReportContentWrapper>
        {fetchReportContentLoading === false && reports.length <= 0 && (
          <div style={{ textAlign: "center" }}>
            Không có báo cáo nào cho bài viết này
          </div>
        )}
        {fetchReportContentLoading === true && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {reports.length > 0 &&
          reports.map((item, index) => (
            <PostReportContentItem
              key={`post-report-item-${item._id}-${index}`}
              className="report-content-item"
              {...item}
              index={index}
              showAction={isAdmin === true}
              postId={postId}
              onDeletePostReport={handleAfterDeletePostReport}
            />
          ))}
      </PostReportContentWrapper>
    </ModalStyled>
  );
};

export default PostReportContentModal;
