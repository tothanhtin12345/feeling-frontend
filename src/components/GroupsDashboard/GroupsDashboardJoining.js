import { useState ,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

//code của mình

import UserCards from "../UI/UserCards";
import { fetchGroupsJoiningSaga, reset } from "../../store/modules/GroupDashboardJoining/slice";

import {
  getGroupsJoining,
  getGroupsJoiningLoading,
  getGroupsJoiningCanLoad,
  
} from "../../store/modules/GroupDashboardJoining/selectors";



const GroupDashboardJoining = () => {

  const [displayName, setDisplayName] = useState("");
  const [hasSearch, setHasSearch] = useState(false);

  const dispatch = useDispatch();

  const groups = useSelector(getGroupsJoining);
  const loading = useSelector(getGroupsJoiningLoading);
  const canLoad = useSelector(getGroupsJoiningCanLoad);

  //hàm xử lý để lấy thêm dữ liệu
  //sau này giá trị hasMore hay việc fetch thêm dữ liệu sẽ được lưu trong store và thực hiện qua redux-saga
  const handleGetMore = () => {
    if(loading===true) return;
    dispatch(fetchGroupsJoiningSaga({displayName}));
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
      dispatch(fetchGroupsJoiningSaga({ displayName: value}));
    },
    [300]
  );

  useEffect(() => {
    return () => {
      if (hasSearch === true) {
        dispatch(reset());
        dispatch(fetchGroupsJoiningSaga({ displayName: "" }));
      }
    };
  }, [hasSearch]);

 

  return (
    
    <UserCards
      type="groups-joining"
      itemsList={groups}
      handleSearch={handleInputSearch}
      path="/groups"
      handleGetMore={handleGetMore}
      hasMore={canLoad}
      loading={loading}
    />
  );
};
export default GroupDashboardJoining;
