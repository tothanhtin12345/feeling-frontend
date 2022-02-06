import { useSelector } from 'react-redux';


//code của mình

import routes from './routes/index';
import AppRoute from './routes/AppRoute';
import {getUser} from './store/modules/User/selectors';
import {getVerifyLoading} from './store/modules/Login/selectors';
import useVerify from './hooks/auth/useVerify';
import CenterSpin from './components/UI/CenterSpin';

function App() {

  const user = useSelector(getUser);
  const verifyLoading = useSelector(getVerifyLoading);


  //verify access token - nếu còn hạn thì vẫn tiếp tục dùng token này
  useVerify();

  

  if(verifyLoading){
    return <CenterSpin/>
  }


  

  return (
    <AppRoute routes={routes}/>
  );
}

export default App;
