import Loadable from 'react-loadable';
import { Spin } from 'antd';
import CenterSpin from '../../components/UI/CenterSpin';

//định nghĩa các thuộc tính route cho các Route liên quan đến authentication như login register

const Login = Loadable({
  loader: () => import("../../pages/Login"),
  loading: () => <CenterSpin/>,
})

const Register = Loadable({
  loader:()=>import("../../pages/Register"),
  loading:() => <CenterSpin/>,
})

const ForgotPassword = Loadable({
  loader:()=>import("../../pages/ForgotPassword"),
  loading:() => <CenterSpin/>,
})

const NewPassword = Loadable({
  loader:()=>import("../../pages/NewPassword"),
  loading:() => <CenterSpin/>,
})

const VerificationCode = Loadable({
  loader:()=>import("../../pages/VerificationCode"),
  loading:() => <CenterSpin/>,
})

const EmailVerification = Loadable({
  loader:() => import("../../pages/EmailVerification"),
  loading:() => <CenterSpin/>
})

const authRoutes = [
  {
    path:"/login",
    exact: true,
    restricted: true,
    component: Login,
  },
  {
    path:"/register",
    exact: true,
    restricted: true,
    component: Register,
    
  },
  {
    path:"/forgot-password",
    exact: true,
    restricted: true,
    component: ForgotPassword,
  },
  {
    path:"/new-password",
    exact: true,
    restricted: true,
    component: NewPassword,
  },
  {
    path:"/verification-code",
    exact: true,
    restricted: true,
    component: VerificationCode,
  },
  {
    path:"/verify-email",
    exact: true,
    restricted: true,
    component: EmailVerification,
  }
]

export default authRoutes;