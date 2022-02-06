import { useMemo, useState } from "react";
import styled from "styled-components";
import { Tooltip, Menu } from "antd";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";
//code của mình
import { breakpoint } from "../Styled/mixin";
import ListTile from "../UI/ListTile";
import OnlineAvatar from "../UI/OnlineAvatar";
import {
  SmallContentStyled,
  SmallTitleStyled,
  MediumContentStyled,
  MediumTitleStyled,
} from "../Styled/Text";
import { SmallIconStyled } from "../Styled/Icon";
import { DropDownButtonStyled } from "../Styled/Button";
import DropdownMenuItem from "../UI/DropdownMenuItem";
import { getPathByIndex } from "../../utils/url";
import socket from "../../utils/socket/socket";
import ConfirmModal from "../UI/ConfirmModal";
import EditCommentModal from "./EditCommentModal";

const CommentItemStyled = styled.div`
  & {
    .list-tile {
      padding: 0px;
    }
    .comment-content-wrapper {
      display: flex;
      align-items: center;
      column-gap: 5px;
    }
    .comment-content {
      display: flex;
      flex-direction: column;
      background-color: #f0f2f5;
      padding: 5px 10px;
      border-radius: 15px;

      .comment-content-text,
      .comment-content-owner {
        word-break: break-all;
      }
    }
    .comment-item-time {
      padding: 0px 10px;
    }

    //xảy ra ẩn khi ở chế độ lg
    ${breakpoint.lg`
      .comment-content-menu{
          visibility: hidden;
        }
        
    `}
    &:hover .comment-content-menu {
      visibility: visible;
    }
  }
`;

const menuCommentCommonKey = "menu-comment";

const CommentItem = ({
  _id,
  owner,
  text,
  createdAt,
  tags,
  isOwner,
  isAdmin,
}) => {
  const [deleteConfirmModalVisible, setDeleteConfirmModalVisible] =
    useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [editCommentModalVisible, setEditCommentModalVisible] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  let currentPath = getPathByIndex(1);
  if (currentPath === "groups") {
    if (getPathByIndex(2) === "dashboard") {
      currentPath += "/dashboard";
    }
  }
  if (currentPath === "post") {
    if (getPathByIndex(2) === "details") {
      currentPath += "/details";
    }
  }

  //khi nhấn vào nút xóa một comment
  const handleOnDeleteClick = () => {
    //hiện cái modal confirm lên
    setDeleteConfirmModalVisible(true);
  };

  const deleteCommentError = () => {
    //ẩn cái modal đi
    setDeleteConfirmModalVisible(false);
    //tắt loading
    setDeleteLoading(false);
  };

  //xác nhận xóa comment
  const handleCommentDeleteConfirm = () => {
    setDeleteLoading(true);
    socket.emit(
      "delete-comment-post",
      {
        commentId: _id,
        fromWhere: currentPath,
      },
      //nếu bị lỗi thì thực hiện những việc sau đây
      // ta phải thêm tham số hàm như thế này, không được bỏ trong object
      deleteCommentError
    );
  };

  //hàm xử lý khi có lỗi
  const editCommentError = () => {
    //ẩn cái modal đi
    setEditCommentModalVisible(false);
    //tắt loading
    setEditLoading(false);
  };

  //hàm xử lý khi thành công
  const editCommentSuccess = () => {
    //ẩn cái modal đi
    setEditCommentModalVisible(false);
    //tắt loading
    setEditLoading(false);
  };

  //khi tiến hành edit comment
  const handleEditComment = (newText) => {
    if (newText.trim().length <= 0) return;
    setEditLoading(true);
    socket.emit(
      "edit-comment-post",
      { text: newText, commentId: _id, fromWhere: currentPath },
      editCommentError,
      editCommentSuccess
    );
  };

  const commentMenu = useMemo(() => {
    return (
      <Menu>
        <DropdownMenuItem
          key={`${menuCommentCommonKey}-${_id}-edit`}
          icon={<SmallIconStyled className="fas fa-edit"></SmallIconStyled>}
          title={<SmallTitleStyled>Sửa bình luận</SmallTitleStyled>}
          onClick={() => setEditCommentModalVisible(true)}
        />
        {isOwner && (
          <DropdownMenuItem
            key={`${menuCommentCommonKey}-${_id}-remove`}
            icon={<SmallIconStyled className="fas fa-trash"></SmallIconStyled>}
            title={<SmallTitleStyled>Xóa bình luận</SmallTitleStyled>}
            onClick={handleOnDeleteClick}
          />
        )}
      </Menu>
    );
  }, [isAdmin]);

  return (
    <CommentItemStyled>
      <ListTile
        showAction={false}
        avatar={
          <NavLink to={`/wall/${owner._id}`}>
            <OnlineAvatar
              online={false}
              size={32}
              avatar={owner.avatar ? owner.avatar.files[0].fileUrl : null}
            />
          </NavLink>
        }
        title={
          <div className="comment-content-wrapper">
            <div className="comment-content">
              <div className="comment-content-owner">
                <NavLink to={`/wall/${owner._id}`}>
                  <SmallTitleStyled>
                    {owner.informations.displayName}
                  </SmallTitleStyled>
                </NavLink>
              </div>
              <div className="comment-content-text">
                <MediumContentStyled>{text}</MediumContentStyled>
              </div>
            </div>
            {(isOwner || isAdmin) && (
              <div className="comment-content-menu">
                <DropDownButtonStyled
                  trigger={["click"]}
                  overlayStyle={{ zIndex: "100010" }}
                  overlay={commentMenu}
                  icon={
                    <SmallIconStyled className="fas fa-ellipsis-h"></SmallIconStyled>
                  }
                />
              </div>
            )}
          </div>
        }
        subTitle={
          <Tooltip title={<Moment date={createdAt} format="LLLL" />}>
            <div className="comment-item-time">
              <SmallContentStyled>
                <Moment date={createdAt} fromNow ago />
              </SmallContentStyled>
            </div>
          </Tooltip>
        }
      />
      {deleteConfirmModalVisible && (
        <ConfirmModal
          onCancel={() => setDeleteConfirmModalVisible(false)}
          onConfirm={handleCommentDeleteConfirm}
          title="Bạn chắc chắn muốn xóa bình luận này chứ ?"
          content="Khi bạn xóa bình luận này thì những nội dung liên quan sẽ bị xóa"
          loading={deleteLoading}
        />
      )}
      {editCommentModalVisible && (
        <EditCommentModal
          visible={editCommentModalVisible}
          onCancel={() => setEditCommentModalVisible(false)}
          onEdit={handleEditComment}
          textDefaultValue={text}
          loading={editLoading}
        />
      )}
    </CommentItemStyled>
  );
};
export default CommentItem;
