import { Redirect, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
//code của mình
import GroupsManager from "../components/Manager/GroupsManager";
import PostsManager from "../components/Manager/PostsManager";
import UsersManager from "../components/Manager/UsersManager";
import PrivateRoutes from "../routes/PrivateRoutes";
import ManagerNavigation from "../components/Manager/ManagerNavigation";
const Manager = () => {

  const location = useLocation();

  if(location.pathname === "/manager"){
    return <Redirect to={"/manager/users"}/>
  }

  return (
    <div style={{ padding: "20px" }}>
      <ManagerNavigation pathname="/manager" />
      <div style={{marginTop:"10px"}}>
        <Switch>
          <PrivateRoutes
            path="/manager/users"
            exact={true}
            component={UsersManager}
          />
          <PrivateRoutes
            path="/manager/groups"
            exact={true}
            component={GroupsManager}
          />
          <PrivateRoutes
            path="/manager/posts"
            exact={true}
            component={PostsManager}
          />
          
        </Switch>
      </div>
    </div>
  );
};

export default Manager;
