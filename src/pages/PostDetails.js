import {useEffect} from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import {useDispatch, useSelector} from "react-redux";
//code của mình
import PostItem from "../components/Post/PostItem/PostItem";
import {getPostDetails,getPostDetailsLoading} from "../store/modules/PostDetails/selectors";
import {fetchPostDetailsSaga} from "../store/modules/PostDetails/slice";
import ErrorPage from "./Error/ErrorPage";
import InsideCenterSpin from "../components/UI/InsideCenterSpin";
const PostDetailsStyled = styled.div`
  margin-top: 15px;
`;

const PostDetails = () => {

  const dispatch = useDispatch();

  const post = useSelector(getPostDetails);
  const loading = useSelector(getPostDetailsLoading);

  const urlParams = new URLSearchParams(window.location.search);

  //post id
  const _id = urlParams.get("_id");
  //comment id
  const commentId = urlParams.get("commentId");
  
  useEffect(()=>{
    dispatch(fetchPostDetailsSaga({_id, commentId}));
  },[_id,commentId])

 
  if(loading){
    return <InsideCenterSpin/>
  }
  if(!post){
    return <ErrorPage errorTitle={"Không tìm thấy bài viết"} urlTo={"/"}/>
  }

  return (
    <PostDetailsStyled>
      <Row justify="center">
        <Col xs={24} sm={20} md={18} xl={12}>
          <PostItem post={post} showCommentArea={post.comments.length > 0}/>
        </Col>
      </Row>
    </PostDetailsStyled>
  );
};

export default PostDetails;
