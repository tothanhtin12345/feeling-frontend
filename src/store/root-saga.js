import {all} from 'redux-saga/effects';
import { registerSaga } from './modules/Register/saga';
import { loginSaga } from './modules/Login/saga';
import {userSaga} from './modules/User/saga';
import { forgotPasswordSaga } from './modules/ForgotPassword/saga';
import { postFormSaga } from './modules/PostForm/saga';
import { wallPrefixSaga } from './modules/WallPrefix/saga';
import { wallSaga } from './modules/Wall/saga';
import {informationFormSaga} from './modules/InformationForm/saga'
import {changePasswordFormSaga} from './modules/ChangePasswordForm/saga';
import {wallSettingFormSaga} from './modules/WallSettingForm/saga';
import { individualSettingSaga } from './modules/IndividualSetting/saga';
import {notifyWindowListSaga} from './modules/NotifyWindowList/saga';
import { wallFriendsSaga } from './modules/WallFriends/saga';
import { addTagModalSaga } from './modules/AddTagModal/saga';
import { onlineListSaga } from './modules/OnlineList/saga';
import {messagesWindowSaga} from "./modules/MessagesWindow/saga";
import { photosSaga } from './modules/Photos/saga';
import {postDetailsSaga} from "./modules/PostDetails/saga";
import { groupDashboardManagingSaga } from './modules/GroupDashboardManaging/saga';
import {groupSaga} from "./modules/Groups/saga";
import {groupWallSettingSaga} from "./modules/GroupWallSetting/saga";
import {joinGroupRequestListSaga} from "./modules/JoinGroupRequestList/saga";
import {groupMembersSaga} from "./modules/GroupMembers/saga";
import {inviteUserToGroupFormSaga} from "./modules/InviteUserToGroupForm/saga";
import { groupDashboardJoiningSaga } from './modules/GroupDashboardJoining/saga';
import { groupsDashboardSentSaga } from './modules/GroupsDashboardSent/saga';
import {groupDashboardSaga} from "./modules/GroupsDashboard/saga";
import { homeSaga } from './modules/Home/saga';
import { emailVerificationSaga } from './modules/EmailVerification/saga';
import { headerSearchSaga } from './modules/HeaderSearch/saga';
import {searchPageSaga} from "./modules/SearchPage/saga";
import { graphLineSaga } from './modules/LineGraph/saga';
import { managerTableSaga } from './modules/ManagerTable/saga';
import { friendListSaga } from './modules/FriendList/saga';
import { friendListRequestedSaga } from './modules/FriendRequestedList/saga';
import { friendListSentSaga } from './modules/FriendSentList/saga';
export default function* rootSaga(){
    yield all([
      registerSaga(),
      loginSaga(),
      userSaga(),
      forgotPasswordSaga(),
      postFormSaga(),
      wallPrefixSaga(),
      wallSaga(),
      informationFormSaga(),
      changePasswordFormSaga(),
      wallSettingFormSaga(),
      individualSettingSaga(),
      notifyWindowListSaga(),
      wallFriendsSaga(),
      addTagModalSaga(),
      onlineListSaga(),
      messagesWindowSaga(),
      photosSaga(),
      postDetailsSaga(),
      groupDashboardManagingSaga(),
      groupSaga(),
      groupWallSettingSaga(),
      joinGroupRequestListSaga(),
      groupMembersSaga(),
      inviteUserToGroupFormSaga(),
      groupDashboardSaga(),
      groupDashboardJoiningSaga(),
      groupsDashboardSentSaga(),
      homeSaga(),
      emailVerificationSaga(),
      headerSearchSaga(),
      searchPageSaga(),
      graphLineSaga(),
      managerTableSaga(),
      friendListSaga(),
      friendListRequestedSaga(),
      friendListSentSaga(),
    ])
}