import Loadable from 'react-loadable';

//code của mình
import CenterSpin from "../../components/UI/CenterSpin";





//load component theo kiểu lazy
const Friends = Loadable({
  loader:()=> import("../../pages/Friends"),
  //thực hiện loading nếu có
  loading: () => <CenterSpin/>,
})


//trang chủ - timeline chung
const FriendsRoute = [
  {
    path:["/friends","/friends/requested","/friends/sent"],
   
    exact:true,
    requiredAuth:true,
    component: Friends,
  },
  
]

export default FriendsRoute;