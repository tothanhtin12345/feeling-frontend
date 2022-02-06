


import Loadable from 'react-loadable';

import CenterSpin from '../../../components/UI/CenterSpin';

//định nghĩa các thuộc tính route cho các Route liên quan đến chat

//load component theo kiểu lazy
const Test = Loadable({
  loader:()=> import("../../../pages/Test"),
  //thực hiện loading nếu có
  loading: () => <CenterSpin/>,
})



//trang chủ - timeline chung
const TestRoute = [
  {
    path:"/test",
    exact:true,
    requiredAuth:true,
    component: Test,
  },
  
]

export default TestRoute;