import { Redirect } from "react-router-dom";


import Loadable from 'react-loadable';
import CenterSpin from "../../components/UI/CenterSpin";

//định nghĩa các thuộc tính route cho các Route liên quan đến chat

//load component theo kiểu lazy
const Home = Loadable({
  loader:()=> import("../../pages/Home"),
  //thực hiện loading nếu có
  loading: () => <CenterSpin/>,
})



//trang chủ - timeline chung
const HomeRoute = [
  {
    path:"/",
    exact:true,
    requiredAuth:true,
    component: Home,
  },
]

export default HomeRoute;