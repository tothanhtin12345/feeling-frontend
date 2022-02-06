


import Loadable from 'react-loadable';

import CenterSpin from "../../components/UI/CenterSpin";

//định nghĩa các thuộc tính route cho các Route liên quan đến chat

//load component theo kiểu lazy
const Account = Loadable({
  loader:()=> import("../../pages/Account"),
  //thực hiện loading nếu có
  loading: () => <CenterSpin/>,
})


//trang chủ - timeline chung
const AccountRoute = [
  {
    path:"/account",
    exact:true,
    requiredAuth:true,
    component: Account,
  },
  
]

export default AccountRoute;