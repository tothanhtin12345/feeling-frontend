import { Route, Switch } from "react-router";
import { useSelector } from "react-redux";
//code của mình
import Private from "./PrivateRoutes";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";


//ta có thể hiểu hàm này như sau
//nó nhận vào một mảng routes - mỗi route trong mảng thì bao gồm:
//path: có thể là một chuỗi path đơn hoặc một mảng path
//routes: các routes phân cấp nhỏ hơn
//component
//requiredAuth: xác định route private
//restricted: xác định route public

//mỗi lần chạy mảng nó sẽ sinh ra một Route cho Switch
//Nó sinh ra một Route - bao gồm (chỉ liệt kê những gì quan trọng)
//path là một mảng path: khi người dùng truy cập thì Route sẽ tự động tìm Path phù hợp trong mảng
/*component: là một Layout (có thể là Main hoặc Guest Layout), và ta truyền cho cho nó một children lại chính
                  là AppRoute - với thuộc tính routes={route.routes} - để xét duyệt tiếp các routes nhỏ hơn cho Layout*/

//Sau lần thứ hai lặp lại AppRoute thì câu điều kiện route.routes sẽ không còn phù hợp, vì vậy sẽ không sinh ra layout
//như lần 1 mà nó xét tiếp các điều kiện bên dưới để định nghĩa ra các routes cho các Layout (hay component tương đương)
// hoặc đơn giản là sinh là một route path="*" để xét NotFound (Cái return cuối cùng)

//Vậy sau các lần AppRoute được lặp lại, ta sẽ có cấu trúc như sau
/*
  <Switch>

    <Route
      path=[...] sẽ phù hợp với các path có trong mảng
      exact,
      ...
    >
      <MainLayout>
        <Route></Route> 
        <Route></Route> 
        ...
      </MainLayout>
    </Route>

    <Route
      path=[...] sẽ phù hợp với các path có trong mảng
      exact,
      ...
    >
      <GuestLayout>
        <Route></Route> 
        <Route></Route> 
        ...
      </GuestLayout>
    </Route>

    //Route cuối thường dùng cho notFound 
    <Route path, exact, component/>

  </Switch>
*/

const AppRoute = ({ routes, user }) => {
  // console.log(routes)
  return (
    <Switch>
      {routes.map((route, index) => {
        // console.log(route.path);
        if (route.routes) {
          //Tiếp tục chạy AppRoute để xét duyệt sinh ra Route trong các
          return (
            <Route
              key={`${route.path.join()},${index}`}
              path={route.path}
              exact={route.exact}
             
            >
              <route.component>
                <AppRoute routes={route.routes} user={user} />
              </route.component>
            </Route>
          );
        }
        
        if (route.requiredAuth) {
          // console.log(route)
          return (
            //PrivateRoutes sẽ kiểm tra điều kiện trả về một Route tương ứng => Route
            <PrivateRoutes
              key={route.path}
              component={route.component}
              exact={route.exact}
              path={route.path}
              permissions={route.permissions}
              user={user}
              checkAdmin={route.checkAdmin}
            />
          );
        }
        if (route.restricted) {
      
          
          return (
            //PublicRoutes sẽ kiểm tra điều kiện trả về một Route tương ứng => Route
            <PublicRoutes
              key={route.path}
              component={route.component}
              exact={route.exact}
              path={route.path}
              user={user}
            />
          );
        }
       
        return (
          <Route
            key={route.path}
            component={route.component}
            exact={route.exact}
            path={route.path}
          />
        );
      })}
    </Switch>
  );
};

export default AppRoute;
