//code của mình
import LineGraph from "./LineGraph";
import PostsTable  from "./Table/PostsTable";
const PostsManager = () => {
  return (
    <div>
      <LineGraph type={"posts"} />
      <PostsTable/>
    </div>
  );
};

export default PostsManager;
