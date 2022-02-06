import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFetchGroupsSentCanLoad,
  getFetchGroupsSentLoading,
  getGroupsSent,
} from "../../store/modules/GroupsDashboardSent/selectors";

import { fetchGroupsSentSaga, reset } from "../../store/modules/GroupsDashboardSent/slice";

import { debounce } from "lodash";
//code của mình
import UserCards from "../UI/UserCards";
const GroupsDashboardSent = () => {
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("");
  const [hasSearch, setHasSearch] = useState(false);

  const loading = useSelector(getFetchGroupsSentLoading);
  const groupsSent = useSelector(getGroupsSent);
  const canLoad = useSelector(getFetchGroupsSentCanLoad);

  //hàm xử lý để lấy thêm dữ liệu
  //sau này giá trị hasMore hay việc fetch thêm dữ liệu sẽ được lưu trong store và thực hiện qua redux-saga
  const handleGetMore = () => {
    if (loading) return;
    dispatch(fetchGroupsSentSaga({displayName}))

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
      dispatch(fetchGroupsSentSaga({ displayName: value}));
    },
    [300]
  );

  useEffect(() => {
    return () => {
      if (hasSearch === true) {
        dispatch(reset());
        dispatch(fetchGroupsSentSaga({ displayName: "" }));
      }
    };
  }, [hasSearch]);

  return (
    <UserCards
      type="groups-sent"
      itemsList={groupsSent}
      handleSearch={handleInputSearch}
      path="/groups"
      handleGetMore={handleGetMore}
      hasMore={canLoad}
      loading={loading}
    />
  );
};
export default GroupsDashboardSent;
