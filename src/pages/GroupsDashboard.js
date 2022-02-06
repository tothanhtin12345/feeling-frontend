import {Switch} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
//code của mình
import PrivateRoutes from '../routes/PrivateRoutes';
import GroupDashboardNavigation from "../components/GroupsDashboard/GroupDashboardNavigation";

import GroupsDashboardJoining from '../components/GroupsDashboard/GroupsDashboardJoining';
import GroupsDashboardManaging from '../components/GroupsDashboard//GroupsDashboardManaging/GroupsDashboardManaging';
import GroupsDashboardSent from '../components/GroupsDashboard/GroupsDashboardSent';
import GroupsDashboardTimeline from '../components/GroupsDashboard/GroupsDashboardTimeline';


import { fetchGroupsSentSaga, reset as resetGroupSent } from '../store/modules/GroupsDashboardSent/slice';
import { fetchGroupsJoiningSaga, reset as resetGroupJoining } from '../store/modules/GroupDashboardJoining/slice';
import { fetchGroupsMangingSaga, reset as resetGroupManaging } from '../store/modules/GroupDashboardManaging/slice';

const GroupsDashboard = ({children}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroupsSentSaga({ displayName: ""}));
    dispatch(fetchGroupsJoiningSaga({ displayName: ""}));
    dispatch(fetchGroupsMangingSaga({ displayName: ""}));
    return () => {
      dispatch(resetGroupSent())
      dispatch(resetGroupJoining())
      dispatch(resetGroupManaging())
    }
  },[])



  return <div style={{padding:"20px"}}>
    <GroupDashboardNavigation pathname="/groups/dashboard"/>
    <div>
      <Switch>
        <PrivateRoutes path="/groups/dashboard/joining" exact={true} component={GroupsDashboardJoining}/>
        <PrivateRoutes path="/groups/dashboard/managing" exact={true} component={GroupsDashboardManaging}/>
        <PrivateRoutes path="/groups/dashboard/sent" exact={true} component={GroupsDashboardSent}/>
        <PrivateRoutes path="/groups/dashboard" exact={true} component={GroupsDashboardTimeline}/>
      </Switch>
    </div>
  </div>
}

export default GroupsDashboard;