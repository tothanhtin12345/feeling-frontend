import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Redirect } from "react-router";
//code của mình
import { getPostSelected } from "../store/modules/Post/selectors";
import { unSetPostSelected } from "../store/modules/Post/slice";
import PostItemModal from "../components/Post/PostItemModal/PostItemModal";
import useGetPostDetails from "../hooks/post/useGetPostDetails";
import CenterSpin from "../components/UI/CenterSpin";
//một trang hiển thị từng file của bài post
//không dùng component này nữa
const PostPage = ({ postSelected, ...props }) => {
  const dispatch = useDispatch();

  const { postId, fileIndex, fileId } = postSelected;

  const { post, error, getPostLoading } = useGetPostDetails({ postId,fileId: fileId ? fileId : "" });

  

  if ((!post && !error) || getPostLoading) {
    return <CenterSpin size="large" />;
  }
  if((!post && error)){
    dispatch(unSetPostSelected());
    return <div></div>
  }

  return <PostItemModal post={{...post,fileIndex}} error={error} />;
};
export default PostPage;
