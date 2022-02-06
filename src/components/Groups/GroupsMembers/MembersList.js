import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
//code của mình
import UserCards from "../../UI/UserCards";

import {
  fetchGroupMembersSaga,
  reset,
} from "../../../store/modules/GroupMembers/slice";
import {
  getGroupMembersCanLoad,
  getGroupMembersLoading,
  getMembers,
} from "../../../store/modules/GroupMembers/selectors";
import {
  getIsManager,
  getGroupId,
  getIsInspector,
} from "../../../store/modules/Groups/selectors";

const MembersList = ({}) => {
  const [displayName, setDisplayName] = useState("");
  const [hasSearch, setHasSearch] = useState(false);

  const dispatch = useDispatch();

  const members = useSelector(getMembers);
  const canLoad = useSelector(getGroupMembersCanLoad);
  const groupId = useSelector(getGroupId);
  //lấy ra quyền hiện tại của người dùng đối với group
  const isManager = useSelector(getIsManager);
  const isInSpector = useSelector(getIsInspector);
  const loading = useSelector(getGroupMembersLoading);



 
  //hàm xử lý để lấy thêm dữ liệu
  //sau này giá trị hasMore hay việc fetch thêm dữ liệu sẽ được lưu trong store và thực hiện qua redux-saga
  const handleGetMore = () => {
    if(loading===true) return;

    
    dispatch(fetchGroupMembersSaga({ groupId, displayName }));
  };

  const currentUserInformation = {
    isManager,
    isInSpector,
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
      dispatch(fetchGroupMembersSaga({ displayName: value, groupId }));
    },
    [300]
  );

  useEffect(() => {
    return () => {
      if (hasSearch === true) {
        dispatch(reset());
        dispatch(fetchGroupMembersSaga({ displayName: "", groupId }));
      }
    };
  }, [hasSearch]);

  

  return (
   <Fragment>
      <UserCards
      itemsList={members}
      currentUserInformation={currentUserInformation}
      type="groups-members"
      handleSearch={handleInputSearch}
      path="/wall"
      handleGetMore={handleGetMore}
      hasMore={canLoad}
      loading={loading}
    />
  
   </Fragment>
  );
};
export default MembersList;
