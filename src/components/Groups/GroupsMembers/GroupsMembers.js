import styled from "styled-components";
import { Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//code của mình
import MembersDashboard from "./MembersDashboard";
import useGetParamOnPath from "../../../hooks/url/useGetParamOnPath";
import PrivateRoutes from "../../../routes/PrivateRoutes";
import MembersList from "./MembersList";
import MembersRequested from "./MembersRequested";
import {
  getGroupId,
  getIsManager,
  getIsInspector,
  getGroupIsMember,
} from "../../../store/modules/Groups/selectors";
const GroupsMembersStyled = styled.div`
  margin-top: 16px;
`;

const GroupsMembers = ({ children }) => {
  
  const groupId = useSelector(getGroupId);
  const isManager = useSelector(getIsManager);
  const isInspector = useSelector(getIsInspector);
  const isMember = useSelector(getGroupIsMember);
  const originialPath = `/groups/${groupId}`;
  



  return (
    <GroupsMembersStyled>
      <MembersDashboard
        pathname={originialPath}
        showRequested={isManager || isInspector}
      />
      <div>
        {isMember && (
          <Switch>
            <PrivateRoutes
              path="/groups/:id/members/requested"
              exact={true}
              component={MembersRequested}
              permission={isManager || isInspector}
            />

            <PrivateRoutes
              path="/groups/:id/members"
              exact={true}
              component={MembersList}
            />
          </Switch>
        )}
      </div>
    </GroupsMembersStyled>
  );
};
export default GroupsMembers;
