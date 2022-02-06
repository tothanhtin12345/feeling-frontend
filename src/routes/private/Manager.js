

import Loadable from 'react-loadable';
import CenterSpin from "../../components/UI/CenterSpin";

//định nghĩa các thuộc tính route cho các Route liên quan đến chat

//load component theo kiểu lazy
const Manager = Loadable({
  loader:()=> import("../../pages/Manager"),
  //thực hiện loading nếu có
  loading: () => <CenterSpin/>,
})



//trang chủ - timeline chung
const ManagerRoute = [
  {
    path: [
      "/manager",
      "/manager/users",
      "/manager/groups",
      "/manager/posts",
    ],
    exact:true,
    requiredAuth:true,
    checkAdmin:true,
    component: Manager,
  },
]

export default ManagerRoute;