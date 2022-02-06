import { Switch,Route } from "react-router-dom";
//code của mình
import FriendsDashboard from "../components/Friends/FriendsDashboard";
import FriendsList from "../components/Friends/FriendsList";
import FriendsRequested from "../components/Friends/FriendsRequested";
import FriendsSent from "../components/Friends/FriendsSent";
import PrivateRoutes from "../routes/PrivateRoutes";
//children - một switch gồm các route để chuyển đổi giữa các chức năng về friends
const Friends = ({ children }) => {
  return (
    <div style={{ padding: "20px" }}>
      <FriendsDashboard
        pathname="/friends"
        showRequested={true}
        showSent={true}
      />
      <div>
        <Switch>
          <Route path="/friends/sent" exact={true}>
            <FriendsSent/>
          </Route>
          <Route path="/friends/requested" exact={true}>
            <FriendsRequested/>
          </Route>
          <Route path="/friends" exact={true}>
            <FriendsList/>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Friends;
