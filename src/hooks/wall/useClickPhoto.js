import { useDispatch } from "react-redux";
//code của mình
import useHttpRequest from "../useHttpRequest";
import { setPostSelected } from "../../store/modules/Post/slice";
const useClickPhoto = () => {
  const dispatch = useDispatch();

  const { loading: getPostLoading, sendRequest: sendGetPostFromPhotoRequest } =
    useHttpRequest();

  const handleGetPostFormPhotoSuccess = ({ resData }) => {
    const { post } = resData;

    // console.log(post)
    dispatch(setPostSelected({ postId: post._id, fileIndex: 0, fileId: post.fileId }));
  };
  const handleGetPostFormPhotoFailed = (message) => {
    console.log(message);
  };

  // tải bài post tương ứng với hình đucợ nhấn
  const handleGetPostFormPhoto = ({ fileId }) => {
    sendGetPostFromPhotoRequest({
      axiosConfig: {
        url: "/post/from-photo",
        method: "GET",
        params: {
          fileId,
        },
      },
      successCallback: handleGetPostFormPhotoSuccess,
      failedCallback: handleGetPostFormPhotoFailed,
    });
  };

  //khi click vào một photo
  const handlePhotoClick = (_id) => {
    //load bài viết từ server
    // sau đó set selected post để hiển thị lên ở dạng modal
    handleGetPostFormPhoto({ fileId: _id });
  };

  return { getPostLoading, handlePhotoClick };
};

export default useClickPhoto;
