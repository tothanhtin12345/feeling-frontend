import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
//code của mình
import {
  fetchfriendsSentSaga,
  reset,
} from "../../store/modules/FriendSentList/slice";
import {
  getFriendListSent,
  getFriendListSentCanLoad,
  getFriendListSentLoading,
} from "../../store/modules/FriendSentList/selectors";

import UserCards from "../UI/UserCards";

const FriendsSent = ({ wallUserId }) => {
  const dispatch = useDispatch();
  const loading = useSelector(getFriendListSentLoading);
  const canLoad = useSelector(getFriendListSentCanLoad);
  const friendsSent = useSelector(getFriendListSent);

  const [valueSearch, setValueSearch] = useState("");
  const [hasSearch, setHasSearch] = useState(false);

  const handleGetMore = () => {
    if (loading) return;
    dispatch(
      fetchfriendsSentSaga({ displayName: valueSearch, userId: wallUserId })
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
      dispatch(fetchfriendsSentSaga({ displayName: value, userId: wallUserId }));
    },
    [300]
  );



  useEffect(() => {
    return () => {
      if (hasSearch === true) {
        dispatch(reset());
        dispatch(fetchfriendsSentSaga({ displayName: "", userId: wallUserId }));
      }
    };
  }, [hasSearch]);

  return (
    <UserCards
      itemsList={friendsSent}
      type="friends-sent"
      handleSearch={handleInputSearch}
      path="/wall"
      handleGetMore={handleGetMore}
      hasMore={canLoad}
      loading={loading}
    />
  );
};
export default FriendsSent;
