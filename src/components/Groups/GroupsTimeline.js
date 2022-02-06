import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

//code của mình
import { SmallIconStyled } from "../Styled/Icon";
import { toggleAddPostModalVisible, fetchGroupPostSaga, setGroupPostFirstLoad} from "../../store/modules/Groups/slice";
import {
  getAddPostModalVisible,
  getGroupIsMember,
  getGroupsPosts,
} from "../../store/modules/Groups/selectors";
import TimelineLayout from "../UI/TimelineLayout";
import {
  getGroupId,
  getGroupCreatedAt,
  getGroupDescription,
  getGroupsPostsCanLoad,
  getGroupsPostsLoading,
  getGroupsPostFirstLoad,
} from "../../store/modules/Groups/selectors";
import { setGroupPostId } from "../../store/modules/PostForm/slice";
const GroupsTimelineStyled = styled.div``;





//dòng thời gian của 1 group
const GroupsTimeline = () => {
  const dispatch = useDispatch();
  const groupId = useSelector(getGroupId);
  const groupCreatedAt = useSelector(getGroupCreatedAt);
  const groupDescription = useSelector(getGroupDescription);
  const addPostModalVisible = useSelector(getAddPostModalVisible);
  const isMember = useSelector(getGroupIsMember);
  const groupsPosts = useSelector(getGroupsPosts);
  const canLoad = useSelector(getGroupsPostsCanLoad);
  const loading = useSelector(getGroupsPostsLoading);
  const firstLoad = useSelector(getGroupsPostFirstLoad);
  //sau này giá trị này sẽ được lưu trong store thay vì lưu ở đây


  //hàm xử lý để lấy thêm dữ liệu
  //sau này giá trị hasMore hay việc fetch thêm dữ liệu sẽ được lưu trong store và thực hiện qua redux-saga
  const handleGetMore = () => {
    if(loading === true) return;
    dispatch(fetchGroupPostSaga({groupId}));
  };



  //hàm mở add modal cho groups
  const handleOpenGroupsAddPostModal = () => {
    dispatch(toggleAddPostModalVisible(true));
  };
  //hàm đóng add modal cho groups
  const handleCloseGroupsAddPostModal = () => {
    dispatch(toggleAddPostModalVisible(false));
  };

  //các thông tin liên quan đến phân giới thiệu của nhóm

  const introduceInformations = [
    {
      key: `created-date-${groupId}`,
      icon: <SmallIconStyled className="fas fa-clock"></SmallIconStyled>,
      title: "Ngày thành lập",
      content: moment(groupCreatedAt).format("DD/MM/YYYY"),
    },
  ];

  //nếu có thông tin về phần mô tả thì mới hiển thị lên
  if (groupDescription && groupDescription.trim().length > 0) {
    introduceInformations.push({
      key: `description-${groupId}`,
      icon: <SmallIconStyled className="fas fa-book-reader"></SmallIconStyled>,
      title: "Mô tả",
      content: groupDescription,
    });
  }

  const informations_list = [
    {
      title: "Giới thiệu",
      informations: introduceInformations,
    },
  ];

 

  return (
    <GroupsTimelineStyled>
      <TimelineLayout
        informationsList={informations_list}
        type="groups"
        currentGroupId={groupId}
        isMember={isMember}
        onAddPostInputClick={handleOpenGroupsAddPostModal}
        posts={groupsPosts}
        handleGetMore={handleGetMore}
        hasMore={canLoad}
        loading={loading}
      />
    </GroupsTimelineStyled>
  );
};

export default GroupsTimeline;
