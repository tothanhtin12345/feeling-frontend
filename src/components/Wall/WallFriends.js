import { useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
//code của mình

import FriendsDashboard from "../Friends/FriendsDashboard";
import {
  getIsCurrentUser,
  getWallUserId,
} from "../../store/modules/Wall/selectors";
import FriendsList from "../Friends/FriendsList";
import FriendsRequested from "../Friends/FriendsRequested";
import FriendsSent from "../Friends/FriendsSent";
import PrivateRoutes from "../../routes/PrivateRoutes";
import {
  fetchWallFriendsSaga,
  fetchWallFriendsRequestedSaga,
  fetchWallFriendsSentSaga,
  resetWallFriends,
  resetWallFriendsRequested,
  resetWallFriendsSent,
} from "../../store/modules/WallFriends/slice";

import {
  getWallFriends,
  getWallFriendsCanLoad,
  getWallFriendsRequested,
  getWallFriendsRequestedCanLoad,
  getWallFriendsSent,
  getWallFriendsSentCanLoad,
} from "../../store/modules/WallFriends/selectors";
const WallFriendsStyled = styled.div`
  margin-top: 16px;
`;

//chức năng bạn bè ở tường nhà
const WallFriends = ({ children }) => {
  const dispatch = useDispatch();

  const isCurrentUser = useSelector(getIsCurrentUser);
  const wallUserId = useSelector(getWallUserId);

  const friends = useSelector(getWallFriends);
  const friendsRequested = useSelector(getWallFriendsRequested);
  const friendsSent = useSelector(getWallFriendsSent);

  const friendsCanLoad = useSelector(getWallFriendsCanLoad);
  const friendsRequestedCanLoad = useSelector(getWallFriendsRequestedCanLoad);
  const friendsSentCanLoad = useSelector(getWallFriendsSentCanLoad);

  const originialPathname = `/wall/${wallUserId}/friends`;

  

  

  return (
    <WallFriendsStyled>
      <div>
        {/* Chuyển cho  FriendsDashboard pathname để nó có thể điều hướng chức năng bạn bè theo tường nhà*/}
        <FriendsDashboard
          pathname={originialPathname}
          isCurrentUser={isCurrentUser}
          showRequested={isCurrentUser}
          showSent={isCurrentUser}
        />
      </div>
      <div>
        <Switch>
          <Route path="/wall/:id/friends" exact={true}>
            <FriendsList wallUserId={wallUserId} />
          </Route>
          <Route path="/wall/:id/friends/requested" exact={true}>
            <FriendsRequested wallUserId={wallUserId} />
          </Route>
          <Route path="/wall/:id/friends/sent" exact={true}>
            <FriendsSent wallUserId={wallUserId} />
          </Route>
        </Switch>
      </div>
    </WallFriendsStyled>
  );
};
export default WallFriends;
