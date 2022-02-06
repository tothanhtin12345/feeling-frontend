


import Loadable from 'react-loadable';

import CenterSpin from '../../components/UI/CenterSpin';

//định nghĩa các thuộc tính route cho các Route liên quan đến chat

//load component theo kiểu lazy
const Notifications = Loadable({
  loader:()=> import("../../pages/Notifications"),
  //thực hiện loading nếu có
  loading: () => <CenterSpin/>,
})


//trang chủ - timeline chung
const NotifyRoute = [
  {
    path:"/notifications",
    exact:true,
    requiredAuth:true,
    component: Notifications,
  },
  
]

export default NotifyRoute;