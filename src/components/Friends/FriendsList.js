import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
//code của mình

import UserCards from "../UI/UserCards";
import { fetchFriendsSaga, reset } from "../../store/modules/FriendList/slice";
import {
  getFriendListCanLoad,
  getFriendListLoading,
  getFriendList,
} from "../../store/modules/FriendList/selectors";

const FriendsList = React.memo(({ wallUserId }) => {
  const dispatch = useDispatch();
  const canLoad = useSelector(getFriendListCanLoad);
  const friends = useSelector(getFriendList);
  const loading = useSelector(getFriendListLoading);

  const [valueSearch, setValueSearch] = useState("");
  const [hasSearch, setHasSearch] = useState(false);

  const handleGetMore = () => {
    if (loading) return true;
    dispatch(
      fetchFriendsSaga({ displayName: valueSearch, userId: wallUserId })
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
      dispatch(fetchFriendsSaga({ displayName: value, userId: wallUserId }));
    },
    [300]
  );



  useEffect(() => {
    return () => {
      if (hasSearch === true) {
        dispatch(reset());
        dispatch(fetchFriendsSaga({ displayName: "", userId: wallUserId }));
      }
    };
  }, [hasSearch]);

  return (
    <UserCards
      itemsList={friends}
      type="friends-list"
      handleSearch={handleInputSearch}
      path="/wall"
      handleGetMore={handleGetMore}
      hasMore={canLoad}
      loading={loading}
    />
  );
});
export default FriendsList;
