import {configureStore, getDefaultMiddleware, combineReducers} from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

//code của mình
import rootSaga from "./root-saga";
import headerReducer from './modules/Header/slice';
import homeReducer from './modules/Home/slice';
import postReducer from './modules/Post/slice';
import wallReducer from './modules/Wall/slice';
import groupsDashboardReducer from './modules/GroupsDashboard/slice';
import groupsReducer from './modules/Groups/slice';
import userReducer from './modules/User/slice'; 
import chatReducer from './modules/Chat/slice';
import registerReducer from './modules/Register/slice';
import loginReducer from './modules/Login/slice';
import forgotPasswordReducer from './modules/ForgotPassword/slice';
import postFormReducer from './modules/PostForm/slice';
import wallPrefixReducer from './modules/WallPrefix/slice';
import informationFormReducer from './modules/InformationForm/slice';
import changePasswordFormReducer from './modules/ChangePasswordForm/slice';
import wallSettingFormReducer from './modules/WallSettingForm/slice';
import individualSettingReducer from './modules/IndividualSetting/slice';
import notifyWindowListReducer from './modules/NotifyWindowList/slice';
import wallFriendsReducer from './modules/WallFriends/slice';
import addTagModalReducer from './modules/AddTagModal/slice';
import onlineListReducer from "./modules/OnlineList/slice";
import messagesWindowReducer from "./modules/MessagesWindow/slice";
import chatTabReducer from "./modules/ChatTab/slice";
import photosReducer from "./modules/Photos/slice";
import postDetailsReducer from "./modules/PostDetails/slice";
import groupDashboardManagingReducer from "./modules/GroupDashboardManaging/slice";
import groupWallSettingReducer from "./modules/GroupWallSetting/slice";
import joinGroupRequestListReducer from "./modules/JoinGroupRequestList/slice";
import groupMembersReducer from "./modules/GroupMembers/slice";
import inviteUserToGroupFormReducer from "./modules/InviteUserToGroupForm/slice";
import groupDashboardJoiningReducer from "./modules/GroupDashboardJoining/slice";
import groupsDashboardSentReducer from "./modules/GroupsDashboardSent/slice";
import emailVerificationReducer from "./modules/EmailVerification/slice";
import headerSearchReducer from "./modules/HeaderSearch/slice";
import searchPagehReducer from "./modules/SearchPage/slice";
import graphLineReducer from "./modules/LineGraph/slice";
import managerTableReducer from "./modules/ManagerTable/slice";
import friendListReducer from "./modules/FriendList/slice";
import friendListRequestedReducer from "./modules/FriendRequestedList/slice";
import friendListSentReducer from "./modules/FriendSentList/slice";
const sagaMiddleware = createSagaMiddleware();

const combineReducer = combineReducers({
  header: headerReducer,
  home: homeReducer,
  post: postReducer,
  wall: wallReducer,
  groupsDashboard: groupsDashboardReducer,
  groups: groupsReducer,
  user: userReducer,
  chat: chatReducer,
  register: registerReducer,
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
  postForm: postFormReducer,
  wallPrefix: wallPrefixReducer,
  informationForm: informationFormReducer,
  changePasswordForm: changePasswordFormReducer,
  wallSettingForm: wallSettingFormReducer,
  individualSetting: individualSettingReducer,
  notifyWindowList: notifyWindowListReducer,
  wallFriends: wallFriendsReducer,
  addTagModal: addTagModalReducer,
  onlineList: onlineListReducer,
  messagesWindow: messagesWindowReducer,
  chatTab: chatTabReducer,
  photos: photosReducer,
  postDetails: postDetailsReducer,
  groupDashboardManaging: groupDashboardManagingReducer,
  groupWallSetting: groupWallSettingReducer,
  joinGroupRequestList: joinGroupRequestListReducer,
  groupMembers: groupMembersReducer,
  inviteUserToGroupForm: inviteUserToGroupFormReducer,
  groupDashboardJoining: groupDashboardJoiningReducer,
  groupsDashboardSent: groupsDashboardSentReducer,
  emailVerification :emailVerificationReducer,
  headerSearch: headerSearchReducer,
  searchPage: searchPagehReducer,
  graphLine: graphLineReducer,
  managerTable: managerTableReducer,
  friendList: friendListReducer,
  friendListRequested:friendListRequestedReducer,
  friendListSent: friendListSentReducer,
});

const rootReducer = (state, action) => {
  
  //nếu action mà người thực hiện là logout thì ta gắn state = undefined để reset state lại
  if (action.type === 'login/logoutSaga') {
    state = undefined;
  }
  return combineReducer(state, action);
};

const store = configureStore({
  reducer:rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);



export default store;