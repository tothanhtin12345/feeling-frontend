import { Tooltip, Tag, Spin } from "antd";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//code của mình
import { AddTagModalStyled } from "../../Styled/Post";
import { MediumTitleStyled, SmallTitleStyled } from "../../Styled/Text";
import { SmallIconStyled } from "../../Styled/Icon";
import { MediumSearchInputStyled } from "../../Styled/Input";
import ListTile from "../../UI/ListTile";
import OnlineAvatar from "../../UI/OnlineAvatar";
import {
  fetchTagFriends,
  fetchTagFriendsSaga,
  removeTagFriend,
  resetTagFriendsState,
} from "../../../store/modules/AddTagModal/slice";
import {
  getTagFriends,
  getTagFriendsLoading,
} from "../../../store/modules/AddTagModal/selectors";
import InsideCenterSpin from "../../UI/InsideCenterSpin";

//tags: những thẻ đã gắn
//onFinish: khi nhấn vào nút hoàn thành
const AddTagModal = ({ visible, onFinish, tags, onAddTag, onRemoveTag }) => {
  const dispatch = useDispatch();

  const friends = useSelector(getTagFriends);
  const loading = useSelector(getTagFriendsLoading);

  //hàm thực hiện tìm kiếm bạn
  //value - giá trị nhập từ ô input
  const handleOnFriendsSearch = (event) => {
    const value = event.target.value;

    //tiến hành fetch dữ liệu trên server - search theo value và loại trừ những người đã có trong mảng tags (mảng _id)
    dispatch(fetchTagFriendsSaga({ displayName: value, tags }));

    //thực hiện tìm kiếm trên server - nên loại bỏ những friend đã được chọn trong tag
  };

  //hàm xóa friend ra khỏi danh sách friends
  const handleRemoveFriend = ({ _id }) => {
    dispatch(removeTagFriend(_id));
  };

  //hàm xử lý khi nhấn vào một người bạn tìm kiếm được => thực hiện add tag
  const handleOnFriendClick = (friend) => {
    onAddTag({ friend });
    //xóa friend là khỏi danh sách friends tìm được
    handleRemoveFriend({ _id: friend._id });
  };
  //hàm xử lý khi nhấn vào nút xóa trên một tag
  const handleRemoveTagClick = (_id) => {
    onRemoveTag({ _id });
    //ta không cần phải thêm bạn lại trong danh sách friends
    //bởi vì nếu ta đang trong quá trình search theo chữ cái mà ta thêm lại vào
    //thì có thể không đúng chữ cái mà ta đang tìm
  };

  //clear
  useEffect(() => {
    dispatch(fetchTagFriendsSaga({ displayName: "", tags }));
    return () => {
      dispatch(resetTagFriendsState());
    };
  }, []);

  return (
    <AddTagModalStyled
      zIndex={10004}
      onCancel={onFinish}
      visible={visible}
      footer={null}
      title={<MediumTitleStyled>Gắn thẻ bạn bè</MediumTitleStyled>}
      closeIcon={
        <Tooltip title="Xong">
          <SmallIconStyled
            color="#615dfa"
            className="fas fa-check"
          ></SmallIconStyled>
        </Tooltip>
      }
    >
      <div>
        {tags.length > 0 && (
          <div className="tags-added">
            <SmallTitleStyled>Đã gắn thẻ</SmallTitleStyled>
            <div className="tags-list">
              {tags.map((friend) => (
                <Tag
                  color="#615DFA"
                  closable
                  onClose={handleRemoveTagClick.bind(null, friend._id)}
                  key={friend._id + "tags"}
                >
                  {friend.informations.displayName}
                </Tag>
              ))}
            </div>
          </div>
        )}
        <div>
          <MediumSearchInputStyled
            prefix={
              <SmallIconStyled className="fas fa-search"></SmallIconStyled>
            }
            placeholder="Tìm kiếm bạn bè"
            onChange={handleOnFriendsSearch}
          />
        </div>
        <div className="search-area">
          <div className="search-result">
            {loading === true && <InsideCenterSpin />}
            {loading === false && friends.length <= 0 && (
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <SmallTitleStyled>Không tìm thấy kết quả</SmallTitleStyled>
              </div>
            )}
            {!loading &&
              friends.map((friend) => (
                <ListTile
                  id={friend._id}
                  key={friend._id}
                  title={friend.informations.displayName}
                  avatar={
                    <OnlineAvatar
                      avatar={
                        friend.avatar ? friend.avatar.files[0].fileUrl : null
                      }
                    />
                  }
                  showAction={false}
                  onClick={handleOnFriendClick.bind(null, friend)}
                />
              ))}
          </div>
        </div>
      </div>
    </AddTagModalStyled>
  );
};

export default AddTagModal;
