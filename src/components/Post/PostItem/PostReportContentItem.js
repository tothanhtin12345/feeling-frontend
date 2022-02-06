import { useEffect } from "react";
import { Menu, Spin } from "antd";
//code của mình
import { SmallTitleStyled, MediumContentStyled } from "../../Styled/Text";
import ListTile from "../../UI/ListTile";
import { DividerStyled } from "../../Styled/Divider";
import DropdownMenuItem from "../../UI/DropdownMenuItem";
import { SmallIconStyled } from "../../Styled/Icon";
import useHttpRequest from "../../../hooks/useHttpRequest";

const PostReportContentItem = ({
  _id,
  index,
  content,
  showAction,
  className,
  postId,
  //hàm xử khi thành công một bài post - (cụ thể sẽ để xóa bài post report ra khỏi giao diện)
  onDeletePostReport,
}) => {
  const {
    sendRequest: sendDeletePostReportContent,
    loading: deletePostReportLoading,
  } = useHttpRequest();

  const handleDeletePostReportSuccess = ({ resData }) => {
    const { code } = resData;
    if (code === "SUCCESS_DELETE_POST_REPORT") {
      //gọi hàm xóa thành công
      onDeletePostReport(_id);
    }
  };

  const handleDeletePostReportFailed = (message) => {
    console.log(message);
  };

  //xử lý xóa một báo cáo về bài post - chỉ dành cho admin thực hiện
  const handleDeletePostReport = () => {
    sendDeletePostReportContent({
      axiosConfig: {
        method: "DELETE",
        url: "/post/report",
        params: {
          reportId: _id,
          postId,
        },
      },
      successCallback: handleDeletePostReportSuccess,
      failedCallback: handleDeletePostReportFailed,
    });
  };

  useEffect(() => {


    return () => {};
  }, []);

  //phần menu cho một báo cáo - chỉ hiển thị cho admin để xóa
  const postReportMenu = (
    <Menu>
      <DropdownMenuItem
        itemKey={`${_id}-port-report-item-menu-delete`}
        key={`${_id}-port-report-item-menu-delete`}
        title={<SmallTitleStyled>Xóa báo cáo này</SmallTitleStyled>}
        icon={<SmallIconStyled className={`fas fa-trash`}></SmallIconStyled>}
        onClick={handleDeletePostReport}
      />
    </Menu>
  );

  return (
    <div className={className}>
      <Spin spinning={deletePostReportLoading}>
        <ListTile
          title={<SmallTitleStyled>{index + 1}</SmallTitleStyled>}
          subTitle={<MediumContentStyled>{content}</MediumContentStyled>}
          showAction={showAction}
          menu={postReportMenu}
          dropDownZIndex="100011"
        />
      </Spin>
      <DividerStyled style={{ margin: "5px 0px 12px 0px" }} />
    </div>
  );
};

export default PostReportContentItem;
