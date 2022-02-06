import Loadable from "react-loadable";

import CenterSpin from "../../components/UI/CenterSpin";




//load component theo kiểu lazy
const GroupsDashboard = Loadable({
  loader: () => import("../../pages/GroupsDashboard"),
  //thực hiện loading nếu có
  loading: () => <CenterSpin />,
});
const Groups = Loadable({
  loader: () => import("../../pages/Groups"),
  //thực hiện loading nếu có
  loading: () => <CenterSpin />,
});

//trang chủ - timeline chung
const GroupsRoute = [
  {
    path: [
      "/groups/dashboard/joining",
      "/groups/dashboard/managing",
      "/groups/dashboard/sent",
      "/groups/dashboard",
    ],

    exact: true,
    requiredAuth: true,
    component: GroupsDashboard,
  },
  {
    path: [
      "/groups/:id/","/groups/:id/members","/groups/:id/members/requested",
      ["/groups/:id/members", "/groups/:id/members/requested"],
    ],

    exact: true,
    requiredAuth: true,
    component: Groups,
  },
];

export default GroupsRoute;
