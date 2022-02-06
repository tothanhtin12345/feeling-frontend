


import Loadable from 'react-loadable';

import CenterSpin from '../../components/UI/CenterSpin';

//định nghĩa các thuộc tính route cho các Route liên quan đến chat

//load component theo kiểu lazy
const PostPage = Loadable({
  loader:()=> import("../../pages/PostPage"),
  //thực hiện loading nếu có
  loading: () => <CenterSpin/>,
})


//trang hiển thị từng file của bài post
const PostPageRoute = [
  {
    path:"/post-page",
    exact:true,
    requiredAuth:true,
    component: PostPage,
  },
  
]

export default PostPageRoute;