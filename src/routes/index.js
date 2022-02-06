
import MainLayout from "../components/Layout/Main/MainLayout";
import GuestLayout from "../components/Layout/Guest/GuestLayout";
import NotFoundPage from "../pages/Error/NotFoundPage";
import { parseModules } from "../utils/file";
//nơi đọc các file route khác và thêm vào trong mảng routes và path




/*truy cập vào thư mục chứa các public routes và trỏ vào các file có đuôi js 
tham số thứ hai nếu true là xét sâu luôn các thư mục bên trong 
false thì chỉ xét trong thư mục được chỉ định mà không tiến thêm vào các thư mục con*/
const publicRoutes = require.context("./public", false, /\.js$/);
/*truy cập vào thư mục chứa các privates routes và trỏ vào các file có đuôi js - xét sâu luôn các thư mục bên trong*/
const privateRoutes = require.context("./private", false, /\.js$/);



const routes = [
  //route chung cho guest => không yêu cầu đăng nhập như landing page - login -resiger,...
  {
    //một mảng các path con
    path: parseModules(publicRoutes).paths,
    //một mảng các routes
    routes: parseModules(publicRoutes).routes,
    //option exact
    exact: true,
    //yêu cầu xác thực
    requiredAuth: false,
    //bị hạn chế
    restricted: true,
    //components để render
    component: GuestLayout,
    
  },
  //route chung cho user => yêu cầu đăng nhập như wall,...
  {
    //một mảng các path con
    path: parseModules(privateRoutes).paths,
    //một mảng các routes
    routes: parseModules(privateRoutes).routes,
    //option exact
    exact: true,
    //yêu cầu xác thực
    requiredAuth: true,
    //bị hạn chế
    restricted: false,
    //components để render
    component: MainLayout,
  },
  //Các routes còn lại => rơi vào 404
  {
    path:"*",
    component:NotFoundPage,
  }

]

export default routes;