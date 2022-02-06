import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
//code của mình
import PostItem from "./PostItem/PostItem";

const PostsStyled = styled.div`
  margin-bottom: 24px;
`;

//dữ liệu được gửi từ bên ngoài
//có thể là từ HomeTimeline, Group Timeline,...
const Posts = React.memo(({ posts = [] }) => {
  const location = useLocation();

  

  return (
    <PostsStyled>
      {!posts && posts.length <= 0 && <div>Chưa có dữ liệu bài viết</div>}
      {posts.map((post, index) => (
        <PostItem
          post={post}
          key={post._id + location.pathname + index}
        />
      ))}
    </PostsStyled>
  );
});
export default Posts;
