


import Loadable from 'react-loadable';

import CenterSpin from "../../components/UI/CenterSpin";

//định nghĩa các thuộc tính route cho các Route liên quan đến chat

//load component theo kiểu lazy
const Messages = Loadable({
  loader:()=> import("../../pages/Messages"),
  //thực hiện loading nếu có
  loading: () => <CenterSpin/>,
})


//trang chủ - timeline chung
const MessagesRoute = [
  {
    path:["/messages","/messages/:conversationId"],
    exact:true,
    requiredAuth:true,
    component: Messages,
  },
  
]

export default MessagesRoute;