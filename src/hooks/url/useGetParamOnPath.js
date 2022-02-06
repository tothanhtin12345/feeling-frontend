import {useLocation} from 'react-router-dom';
//code của mình
import { getParamsOnPathName } from '../../utils/url';
//hook lấy params trên path theo vị trí xác định
const useGetParamOnPath = ({index}) => {
  const location = useLocation();
  const {pathname} = location;
  const paramOnPath = getParamsOnPathName(index,pathname);
  return paramOnPath;
}
export default useGetParamOnPath;