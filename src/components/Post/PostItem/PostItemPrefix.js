import { useMemo, useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Tooltip, Menu } from "antd";
import { useDispatch } from "react-redux";
import Moment from "react-moment";
import OnlineAvatar from "../../UI/OnlineAvatar";

//code của mình
import ListTile from "../../UI/ListTile";
import {
  SmallTitleStyled,
  SmallContentStyled,
  MediumContentStyled,
} from "../../Styled/Text";
import { SmallIconStyled } from "../../Styled/Icon";
import AddedTagsModal from "./AddedTagsModal";
import DropdownMenuItem from "../../UI/DropdownMenuItem";
import PostReportFormModal from "./PostReportFormModal";
import PostReportContentModal from "./PostReportContentModal";
import {
  unSetPostSelected,
  
} from "../../../store/modules/Post/slice";
//phần đầu của một bài post
const PostItemPrefix = ({
  _id,
  showMenu = true,
  owner,
  tags = [],
  createdAt,
  privacy,
  //kiểu của bài viết - dùng để hiển thị thêm thông tin trên title
  type,
  
  //thông tin group mà một bài post thuộc về
  group,
  title,
  //có thể chuyển hướng khi nhấn vào một số thông tin như người dùng, nhóm không ?
  //sẽ false nếu prefix này dùng cho modal share post
  canRedirect = true,
  //hàm xử lý khi vào nút edit bài viết
  onEditClick,
  //hàm xử lý khi nhấn xóa bài viết
  onDeleteClick,
  //có phải người dùng hiện tại là chủ nhân của bài viết không
  isOwner,
  //có phải người dùng hiện tại là admin không
  isAdmin,
  //có phải là quản trị viên của nhóm không (dành cho bài viết thuộc nhóm)
  isManager,
}) => {
  const dispatch = useDispatch();

  //mảng các tags còn dư lại để hiển thị ở dạng modal
  const [tagsToShow, setTagsToShow] = useState([]);
  //hiển thị modal của các tags còn dư lại
  const [addedTagsModalVisible, setAddedTagsModalVisible] = useState(false);

  //hiển thị modal báo cáo bài viết
  const [postReportFormVisible, setPostReportFormVisible] = useState(false);

  //hiên thị modal về nội dung báo cáo bài viết
  const [portReportContentModalVisible, setPortReportContentModalVisible] = useState(false);

  //component này nhận vào một component và quyết định xem có trả về một NavLink wrap component này không ?
  //nếu không thì đơn giản là trả về component
  //dựa theo biến canClickUser
  const SetNavLink = ({ children, to }) => {
    if (!canRedirect) {
      return <Fragment>{children}</Fragment>;
    }
    return <NavLink onClick={() => dispatch(unSetPostSelected(null))} to={to}>{children}</NavLink>;
  };

  //hàm toggle cái modal addedTagsModal (hiển thị những người đã gắn thẻ còn dư lại - ví dụ như 2 người khác)
  const toggleAddedTagsModal = (tagsToShow) => {
    //gắn vào tags còn dư để hiển thị
    if (tagsToShow && tagsToShow.length > 0) {
      setTagsToShow(tagsToShow);
    }

    //hiển thị modal
    setAddedTagsModalVisible(!addedTagsModalVisible);
  };

  //hàm tạo tags thành title (nếu có)
  //ta không dùng lại hàm cũ như bên PostForm
  //bên đây các chữ tags sẽ có một hành động riêng
  const convertTagsToTitle = useMemo(() => {
    let tagStringCommonKey = "tag-string-" + type + _id;
    if (tags.length <= 0) {
      return;
    }
    let tagsText = [];
    let countLeftTags = 0;
    let tagsToShow = [];
    tagsText.push(
      <MediumContentStyled key={tagStringCommonKey}>
        {" "}
        cùng với{" "}
      </MediumContentStyled>
    );
    //mỗi tag là một friend
    tags.forEach((friend, index) => {
      //example: cùng với Thanh Tín
      if (index === 0) {
        tagsText.push(
          <SetNavLink
            key={tagStringCommonKey + index}
            to={`/wall/${friend._id}`}
          >
            <SmallTitleStyled>
              {friend.informations.displayName}
            </SmallTitleStyled>
          </SetNavLink>
        );
      }
      //nếu index = 1 và tags có dộ lớn chỉ = 2 thì cộng thêm và "tên người còn lại"
      //example: và Thanh Toàn
      else if (index === 1 && tags.length <= 2) {
        tagsText.push(
          <MediumContentStyled key={`${tagStringCommonKey}-va`}>
            {" "}
            và
          </MediumContentStyled>
        );
        tagsText.push(
          <SetNavLink
            key={tagStringCommonKey + index}
            to={`/wall/${friend._id}`}
          >
            <SmallTitleStyled>
              {" "}
              {friend.informations.displayName}
            </SmallTitleStyled>
          </SetNavLink>
        );
      }
      //ngược lại nếu độ dài lớn hơn 2 thì cộng dồn số người còn lại để hiển thị
      //và thêm những người còn dư vào một mảng để hiển thị ở dạng modal
      else {
        countLeftTags += 1;
        tagsToShow.push(friend);
      }
    });

    if (countLeftTags > 0) {
      tagsText.push(
        <MediumContentStyled key={`${tagStringCommonKey}-va`}>
          {" "}
          và
        </MediumContentStyled>
      );
      tagsText.push(
        <SmallTitleStyled
          key={`${tagStringCommonKey}-nguoikhac`}
          style={{ cursor: "pointer" }}
          //gọi hàm để hiển thị một modal chứa các tags còn dư
          //nếu không cho phép Redirect thì hàm này nhấn sẽ không hiện gì cả
          onClick={
            canRedirect ? toggleAddedTagsModal.bind(null, tagsToShow) : () => {}
          }
        >
          {" "}
          {countLeftTags} người khác{" "}
        </SmallTitleStyled>
      );
    }

    return tagsText;
  }, [tags, _id]);

  //tạo ra một menu cho nút menu của post
  const postMenu = useMemo(() => {
    let menuCommonKey = "menu-post-" + type;

    let itemsContent = [];
    
    //nếu là chủ bài viết hoặc là admin hoặc là quản trị viên của nhóm thì mới cho phép thực hiện chức năng chỉnh sửa bài viết
    if (isAdmin || isOwner || isManager) {
      itemsContent.push({
        itemKey: `${menuCommonKey}-${_id}-edit`,
        key: `${menuCommonKey}-${_id}-edit`,
        title: "Chỉnh sửa bài viết",
        icon: "fas fa-edit",
        onClick: onEditClick,
      });

      //và thêm tính năng xem những báo cáo của bài viết
      itemsContent.push({
        itemKey: `${menuCommonKey}-${_id}-report-content`,
        key: `${menuCommonKey}-${_id}-report-content`,
        title: "Nội dung báo cáo",
        icon: "fas fa-exclamation-triangle",
        onClick: ()=>setPortReportContentModalVisible(true),
      });
    }

    //bài viết của hệ thống thì không thể xóa được hay báo cáo được nên ta phải kiểm tra

    if (type !== "system" && type !== "groups-system") {
      //chủ nhân của bài viết không phép báo cáo bài viết
      if (!isOwner) {
        itemsContent.push({
          itemKey: `${menuCommonKey}-${_id}-report`,
          key: `${menuCommonKey}-${_id}-report`,
          title: "Báo cáo bài viết",
          icon: "fas fa-user-secret",
          onClick: () => setPostReportFormVisible(true),
        });
      }

      //nếu là chủ bài viết hoặc là admin hoặc là quản trị viên của nhóm thì mới cho phép thực hiện chức năng xóa bài viết
      if (isOwner || isAdmin || isManager) {
        itemsContent.push({
          itemKey: `${menuCommonKey}-${_id}-remove`,
          key: `${menuCommonKey}-${_id}-remove`,
          title: "Xóa bài viết",
          icon: "fas fa-trash",
          onClick: onDeleteClick,
        });
      }
    }

    return (
      <Menu>
        {itemsContent.map((item, index) => (
          <DropdownMenuItem
            itemKey={item.itemKey}
            key={item.key+index}
            title={<SmallTitleStyled>{item.title}</SmallTitleStyled>}
            icon={
              <SmallIconStyled className={`${item.icon}`}></SmallIconStyled>
            }
            onClick={item.onClick}
          />
        ))}
      </Menu>
    );
  }, [_id, type, onEditClick]);

  return (
    <Fragment>
      <ListTile
        type="Post"
        title={
          <span>
            <SetNavLink to={`/wall/${owner._id}`}>
              <SmallTitleStyled>
                {owner.informations.displayName}
              </SmallTitleStyled>
            </SetNavLink>
            {type === "share" && (
              <MediumContentStyled>
                {" "}
                đã chia sẻ một bài viết{" "}
              </MediumContentStyled>
            )}

            {type !== "system" && type !== "groups" && type !== "groups-system"  && convertTagsToTitle}
            {title && <MediumContentStyled>{" " + title}</MediumContentStyled>}

            {type === "groups" && group && (
              <MediumContentStyled>
                {" "}
                với nhóm{" "}
                <SetNavLink
                  key={`groups-to-1`}
                  to={`/groups/${group._id}`}
                >
                  <SmallTitleStyled>
                    {group.informations.displayName}
                  </SmallTitleStyled>
                </SetNavLink>
              </MediumContentStyled>
            )}
          </span>
        }
        subTitle={
          <SmallContentStyled>
            <Tooltip title={<Moment format="LLLL" date={createdAt} />}>
              <Moment fromNow ago date={createdAt} />
            </Tooltip>

            {privacy === "public" ? " · Công khai" : " · Nhóm"}
          </SmallContentStyled>
        }
        avatar={
          <SetNavLink to={`/wall/${owner._id}`}>
            <OnlineAvatar
              avatar={owner.avatar ? owner.avatar.files[0].fileUrl : null}
              online={false}
              size={40}
            />
          </SetNavLink>
        }
        showAction={showMenu ? true : false}
        menu={postMenu}
      />
      <AddedTagsModal
        visible={addedTagsModalVisible}
        tagsToShow={tagsToShow}
        onClose={toggleAddedTagsModal}
      />
      {postReportFormVisible && (
        <PostReportFormModal
          postId={_id}
          onClose={() => setPostReportFormVisible(false)}
        />
      )}
      {portReportContentModalVisible && (
        <PostReportContentModal
          postId={_id}
          onClose={()=>setPortReportContentModalVisible(false)}
        />
      )}
    </Fragment>
  );
};
export default PostItemPrefix;
