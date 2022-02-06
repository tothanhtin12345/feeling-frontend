import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//code của mình
import UserCards from "../../UI/UserCards";
import {
  getJoinGroupRequestList,
  getJoinGroupRequestListCanLoad,
  getJoinGroupRequestListLoading,
} from "../../../store/modules/JoinGroupRequestList/selectors";
import {
  fetchJoinGroupRequestListSaga,
  reset,
} from "../../../store/modules/JoinGroupRequestList/slice";
import { getGroupId } from "../../../store/modules/Groups/selectors";
import { debounce } from "lodash";

const MembersRequested = ({}) => {
  const dispatch = useDispatch();

  //giá trị dùng để search theo tên user
  const [displayName, setDisplayName] = useState("");
  const [hasSearch, setHasSearch] = useState(false);

  const joinGroupRequestList = useSelector(getJoinGroupRequestList);
  const canLoad = useSelector(getJoinGroupRequestListCanLoad);
  const loading = useSelector(getJoinGroupRequestListLoading);
  const groupId = useSelector(getGroupId);


  //hàm xử lý để lấy thêm dữ liệu
  //sau này giá trị hasMore hay việc fetch thêm dữ liệu sẽ được lưu trong store và thực hiện qua redux-saga
  const handleGetMore = () => {
    if(loading === true) return;
    dispatch(
      fetchJoinGroupRequestListSaga({
        groupId,
        displayName,
      })
    );
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
      dispatch(fetchJoinGroupRequestListSaga({ displayName: value, groupId }));
    },
    [300]
  );

  useEffect(() => {
    return () => {
      if (hasSearch === true) {
        dispatch(reset());
        dispatch(fetchJoinGroupRequestListSaga({ displayName: "", groupId }));
      }
    };
  }, [hasSearch]);

 

  return (
    <UserCards
      itemsList={joinGroupRequestList}
      type="groups-requested"
      handleSearch={handleInputSearch}
      path="/wall"
      handleGetMore={handleGetMore}
      hasMore={canLoad}
      loading={loading}
    />
  );
};
export default MembersRequested;
