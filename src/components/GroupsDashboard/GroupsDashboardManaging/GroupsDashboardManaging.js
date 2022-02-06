import { Fragment, useEffect, useState } from "react";
import { debounce } from "lodash";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
//code của mình
import UserCards from "../../UI/UserCards";
import { RectangleButtonStyled } from "../../Styled/Button";
import { SmallIconStyled } from "../../Styled/Icon";
import { SmallTitleStyled } from "../../Styled/Text";
import NewGroupModal from "./NewGroupModal";

import {
  toggleNewGroupModal,

  fetchGroupsMangingSaga,
  addNewGroupSaga,
  reset,
} from "../../../store/modules/GroupDashboardManaging/slice";
import {
  getNewGroupModalVisible,
  getGroupsManagingCanLoad,
  getGroupsManagingList,
  getGroupsManagingLoading,
} from "../../../store/modules/GroupDashboardManaging/selectors";

const NewGroupButtonStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  .button {
    display: flex;
    flex-direction: row;
    column-gap: 5px;
    align-items: center;
    margin-bottom: 10px;
  }
`;

const GroupDashboardManaging = () => {
  const dispatch = useDispatch();
  //có thể load thêm dữ liệu về groups managing không ?
  const groupsManagingCanLoad = useSelector(getGroupsManagingCanLoad);

  //hiển thị new group modal ?
  const newGroupModalVisible = useSelector(getNewGroupModalVisible);

  //danh sách groups managing
  const groupsManaging = useSelector(getGroupsManagingList);

  const loading = useSelector(getGroupsManagingLoading);

  //giá trị để search
  // cụ thể là tên nhóm
  const [displayName, setDisplayName] = useState("");
  const [hasSearch, setHasSearch] = useState(false);

  //hàm xử lý để lấy thêm dữ liệu
  //sau này giá trị hasMore hay việc fetch thêm dữ liệu sẽ được lưu trong store và thực hiện qua redux-saga
  const handleGetMore = () => {
    if(loading===true) return;
    dispatch(fetchGroupsMangingSaga({ displayName }));
  };
 
  //hàm xử lý khi search
  const handleInputSearch = debounce(
    (event) => {
      const value = event.target.value;
      setDisplayName((currentValue) => {
        return value;
      });
      setHasSearch(true);
      dispatch(reset());
      dispatch(fetchGroupsMangingSaga({ displayName: value }));
    },
    [300]
  );

  //khi nộp form
  const handleSubmitNewGroupForm = (values) => {
    dispatch(addNewGroupSaga(values));
  };

  //hủy modal
  const handleCancelNewGroupModal = () => {
    dispatch(toggleNewGroupModal(false));
  };

  

  useEffect(() => {
    return () => {
      if (hasSearch === true) {
        dispatch(reset());
        dispatch(fetchGroupsMangingSaga({ displayName: ""}));
      }
    };
  }, [hasSearch]);

  const addtionalComponent = (
    <NewGroupButtonStyled>
      <RectangleButtonStyled
        className="button"
        type="button"
        onClick={() => dispatch(toggleNewGroupModal(true))}
      >
        <SmallIconStyled
          color="#FFFFFF"
          className="fas fa-plus-square"
        ></SmallIconStyled>
        <SmallTitleStyled color="#FFFFFF">Tạo nhóm mới</SmallTitleStyled>
      </RectangleButtonStyled>
    </NewGroupButtonStyled>
  );

  return (
    <Fragment>
      <UserCards
        type="groups-managing"
        itemsList={groupsManaging}
        handleSearch={handleInputSearch}
        path="/groups"
        handleGetMore={handleGetMore}
        hasMore={groupsManagingCanLoad}
        addtionalComponent={displayName.length <= 0 && addtionalComponent}
        loading={loading}
      />
      {newGroupModalVisible && (
        <NewGroupModal
          title="Tạo nhóm mới"
          visible={newGroupModalVisible}
          onCancel={handleCancelNewGroupModal}
          onSubmit={handleSubmitNewGroupForm}
        />
      )}
    </Fragment>
  );
};
export default GroupDashboardManaging;
