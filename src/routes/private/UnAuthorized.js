import Loadable from "react-loadable";

import CenterSpin from "../../components/UI/CenterSpin";

const UnAuthorizedPage = Loadable({
  loader: () => import("../../pages/Error/UnAuthorizedPage"),
  //thực hiện loading nếu có
  loading: () => <CenterSpin />,
});

//trang chủ - timeline chung
const UnAuthorizedRoute = [
  {
    path: "/error/unAuthorized",

    exact: true,
    requiredAuth: true,
    component: UnAuthorizedPage,
  },
];

export default UnAuthorizedRoute;
