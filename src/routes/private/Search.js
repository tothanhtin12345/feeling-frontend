


import Loadable from 'react-loadable';

import CenterSpin from '../../components/UI/CenterSpin';

//định nghĩa các thuộc tính route cho các Route liên quan đến chat

//load component theo kiểu lazy
const SearchPage = Loadable({
  loader:()=> import("../../pages/Search"),
  //thực hiện loading nếu có
  loading: () => <CenterSpin/>,
})


//trang hiển thị từng file của bài post
const SearchPageRoute = [
  {
    path:"/search",
    exact:true,
    requiredAuth:true,
    component: SearchPage,
  },
  
]

export default SearchPageRoute;