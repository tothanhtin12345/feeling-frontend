


import Loadable from 'react-loadable';

import CenterSpin from '../../components/UI/CenterSpin';

//định nghĩa các thuộc tính route cho các Route liên quan đến chat

//load component theo kiểu lazy
const PostDetailsPage = Loadable({
  loader:()=> import("../../pages/PostDetails"),
  //thực hiện loading nếu có
  loading: () => <CenterSpin/>,
})


//trang hiển thị từng file của bài post
const PostPageRoute = [
  {
    path:"/post/details",
    exact:true,
    requiredAuth:true,
    component: PostDetailsPage,
  },
  
]

export default PostPageRoute;