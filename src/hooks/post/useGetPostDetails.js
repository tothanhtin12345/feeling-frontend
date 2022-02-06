import { useState, useEffect } from "react";
//code của mình
import useHttpRequest from "../useHttpRequest";

const useGetPostDetails = ({ postId, commentId = "", fileId="" }) => {
  const { sendRequest, loading } = useHttpRequest();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const handleGetPostDetailsSuccess = ({ resData }) => {
    const { post: postValue } = resData;
    setPost(postValue);
  };

  const handleGetPostDetailsFailed = (message) => {
    setError(message);
  };

  useEffect(() => {
    const params = {};
    params._id = postId;
    if (commentId.trim().length > 0) {
      params.commentId = commentId;
    }
    if(fileId.trim().length > 0){
      params.fileId = fileId;
    }
    sendRequest({
      axiosConfig: {
        url: "/post/details",
        method: "GET",
        params,
      },
      successCallback: handleGetPostDetailsSuccess,
      failedCallback: handleGetPostDetailsFailed,
    });
  }, [postId, commentId]);

  return { post, error, getPostLoading: loading };
};

export default useGetPostDetails;
