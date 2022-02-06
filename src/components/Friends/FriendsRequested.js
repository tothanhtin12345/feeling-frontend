import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
//code của mình

import UserCards from "../UI/UserCards";
import {
  fetchFriendsRequestedSaga,
  reset,
} from "../../store/modules/FriendRequestedList/slice";
import {
  getFriendListRequested,
  getFriendListRequestedCanLoad,
  getFriendListRequestedLoading,
} from "../../store/modules/FriendRequestedList/selectors";

const FriendsRequested = ({ wallUserId }) => {
  const dispatch = useDispatch();
  const loading = useSelector(getFriendListRequestedLoading);
  const canLoad = useSelector(getFriendListRequestedCanLoad);
  const friendsRequested = useSelector(getFriendListRequested);



  const [valueSearch, setValueSearch] = useState("");
  const [hasSearch, setHasSearch] = useState(false);
  //hàm xử lý để lấy thêm dữ liệu
  //sau này giá trị hasMore hay việc fetch thêm dữ liệu sẽ được lưu trong store và thực hiện qua redux-saga
  const handleGetMore = () => {
    if (loading) return;
    dispatch(
      fetchFriendsRequestedSaga({
        userId: wallUserId,
        displayName: valueSearch,
      })
    );
  };

  //hàm xử lý khi search
  const handleInputSearch = debounce(
    (event) => {
      const value = event.target.value;
      setValueSearch((currentValue) => {
        return value;
      });
      setHasSearch(true);
      dispatch(reset());
      dispatch(fetchFriendsRequestedSaga({ displayName: value, userId: wallUserId }));
    },
    [300]
  );

 

  useEffect(() => {
    return () => {
      if (hasSearch === true) {
        dispatch(reset());
        dispatch(fetchFriendsRequestedSaga({ displayName: "", userId: wallUserId }));
      }
    };
  }, [hasSearch]);

  return (
    <UserCards
      itemsList={friendsRequested}
      type="friends-requested"
      handleSearch={handleInputSearch}
      path="/wall"
      handleGetMore={handleGetMore}
      hasMore={canLoad}
      loading={loading}
    />
  );
};
export default FriendsRequested;
