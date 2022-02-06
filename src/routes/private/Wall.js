import Loadable from 'react-loadable';

//code của mình
import CenterSpin from '../../components/UI/CenterSpin';






const Wall = Loadable({
  loader:()=> import("../../pages/Wall"),
  //thực hiện loading nếu có
  loading: () => <CenterSpin/>,
})

//trang chủ - timeline chung
const WallRoute = [
  
  
  {
    path: [
      "/wall/:id/",
      "/wall/:id/photos",
      [
        "/wall/:id/friends",
        "/wall/:id/friends/requested",
        "/wall/:id/friends/sent",
      ],
    ],
    // routes: parseModules(childRoutes).routes,
    //option exact
    exact: true,
    //yêu cầu xác thực
    requiredAuth: true,
    //bị hạn chế
    restricted: false,
    component: Wall,
  },
]

// console.log(WallRoute)

export default WallRoute;